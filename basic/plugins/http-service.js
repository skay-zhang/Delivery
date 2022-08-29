import { app } from 'electron'
import pkg from '../../package.json'
import archiver from 'archiver'
import express from 'express'
import multer from 'multer'
import util from './util'
import http from 'http'
import path from 'path'
import os from 'os'
import fs from 'fs'

let Server
let upload;
let conf = {};
let Sockets = [];
let Callback;
let configPath = path.join(app.getPath('userData'), 'config.conf');
let sharePath = path.join(app.getPath('userData'), 'Share List');

function getConfig() {
  let data = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(data);
}

function getShare() {
  if (!fs.existsSync(sharePath)) return [];
  let data = fs.readFileSync(sharePath, 'utf-8');
  if (data) return util.getIcons(JSON.parse(data));
  else return [];
}

const httpService = {
  port: 38950,
  state: false,
  start: (callback) => {
    if (!fs.existsSync(configPath)) {
      setTimeout(() => {
        httpService.start();
      }, 500);
      return;
    }
    conf = getConfig();
    Callback = callback;
    httpService.port = conf.network.http.port
    console.log('Service Init On Port ' + httpService.port)
    initUpload();
    Server = http.createServer(initService()).listen(httpService.port, () => {
      console.log('Service Running')
      httpService.state = true
    })
    Server.on("connection", function (socket) {
      Sockets.push(socket);
      socket.once("close", function () {
        Sockets.splice(Sockets.indexOf(socket), 1);
      });
    });
  },
  stop: () => {
    console.log('Service Shutdown In Progress')
    console.log('End ' + Sockets.length + ' Connections')
    Sockets.forEach(function (socket) {
      socket.destroy();
    });
    Server.close(() => {
      console.log('Service Stop')
      httpService.state = true
      Sockets = []
      Server = {}
    });
  },
  getInfo() {
    let list = []
    Sockets.forEach(function (socket) {
      list.push(getIp(socket.remoteAddress))
    });

    let interfaces = []
    let interfacesMap = os.networkInterfaces()
    for (let key in interfacesMap) {
      interfacesMap[key].forEach(function (network) {
        if (!network.internal && network.family === 'IPv4') interfaces.push(network.address)
      });
    }

    return {
      state: httpService.state,
      socket: Array.from(new Set(list)),
      interfaces
    };
  }
}

function getIp(txt) {
  if (txt === '::1') return "127.0.0.1"
  else return txt.indexOf("::ffff:") === -1 ? txt : txt.replace("::ffff:", "")
}

function downFile(file, res) {
  let err = true
  let state = fs.statSync(file.path, { throwIfNoEntry: false })
  if (state === undefined) return err;
  if (file.type === 'folder') {
    state = fs.statSync(file.path + '.zip', { throwIfNoEntry: false });
    if (state === undefined) {
      let output = fs.createWriteStream(file.path + '.zip');
      let archive = archiver('zip', {
        zlib: { level: 9 }
      });
      archive.pipe(output);
      archive.directory(file.path, false);
      archive.finalize();
      archive.on("finish", function () {
        state = fs.statSync(file.path + '.zip', { throwIfNoEntry: false })
        if (state === undefined) {
          res.setHeader("Content-Type", "application/json;charset=UTF-8")
          res.send({ state: false, message: '文件夹打包出错' })
        }
        else res.download(file.path + '.zip')
      });
    } else res.download(file.path + '.zip')
  } else {
    console.log('Download File ' + file.path)
    res.download(file.path)
  }
  return err;
}

function initUpload() {
  upload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, callback) => {
        let downPath = path.join(app.getPath('downloads'), 'delivery/');
        if (!fs.existsSync(downPath)) fs.mkdirSync(downPath);
        callback(null, downPath);
      },
      filename: (_req, file, callback) => {
        callback(null, decodeURIComponent(file.originalname))
      }
    }),
    limits: {
      fileSize: conf.service.receive.maxSize * 1024 * 1024
    }
  });
}

function initService() {
  let serve = express()
  // 添加跨域
  serve.all("*", (req, res, next) => {
    // 开发调试时开启
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    if (req.method.toLowerCase() == 'options') res.send(200);
    else next();
  })
  // 获取服务状态
  serve.get('/api/init', (_req, res) => {
    conf = getConfig();
    let state = {
      auth: conf.security.auth.enable,
      share: conf.service.share.enable,
      receive: conf.service.receive.enable
    }
    res.setHeader("Content-Type", "application/json;charset=UTF-8")
    res.send({
      state: true, data: {
        version: pkg.version,
        state
      }
    })
  });
  // 获取文件列表
  serve.get('/api/list', (_req, res) => {
    let list = getShare();
    for (let i in list) {
      delete list[i].path;
    }
    res.setHeader("Content-Type", "application/json;charset=UTF-8")
    res.send({ state: true, data: list })
  });
  // 下载文件
  serve.get('/api/down/*', (req, res) => {
    let code = req.path.substring(10).split('/');
    if (!conf.service.share.enable) return returnError('share service unavailable', res)
    if (code.length !== 1 || code[0].length != 32) return returnError('invalid file code', res)
    else {
      let exist = false;
      let list = getShare();
      for (let i in list) {
        let item = list[i];
        if (item.code === code[0]) {
          exist = downFile(item, res);
          break;
        }
      }
      if (!exist) return returnError('file does not exist', res)
    }
  });
  // 上传文件
  serve.use('/api/upload', function (req, res, next) {
    if (conf.service && conf.service.receive && conf.service.receive.enable) {
      let fileSize = req.headers['content-length'];
      let maxSize = conf.service.receive.maxSize;
      if (maxSize * 1024 * 1024 > fileSize) next();
      else returnError('File cannot be greater than ' + maxSize + 'MB', res);
    }
    else returnError('Upload service is not enabled', res);
  })
  serve.post('/api/upload', upload.single('file'), (req, res) => {
    if (req.file) {
      let data = {
        name: decodeURIComponent(req.file.originalname),
        size: util.buildSize(req.file.size),
        date: new Date()
      };

      data.type = 'folder';
      let index = data.name.lastIndexOf(".");
      if (index !== -1) data.type = data.name.substring(index + 1).toLowerCase()

      util.getIcon(data);

      Callback(data)
      res.setHeader('Content-Type', 'application/json;charset=UTF-8')
      res.send({
        state: true, data
      })
    } else returnError('not file', res)
  });
  serve.use(express.static(path.join(__dirname, app.isPackaged ? '../client' : '../../public/client')))
  return serve
}

function returnError(msg, res) {
  res.setHeader("Content-Type", "application/json;charset=UTF-8")
  res.send({ state: false, message: msg })
  return false
}

export default httpService