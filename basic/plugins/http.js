import { app } from 'electron'
import archiver from 'archiver'
import express from 'express'
import http from 'http'
import path from 'path'
import os from 'os'
import fs from 'fs'

let Server
let conf = {};
let Sockets = [];
let configPath = path.join(app.getPath('userData'), 'config.conf');

function getConfig(){
    let data = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(data);
}

const httpService = {
    port: 56565,
    state: false,
    start: () => {
        if(!fs.existsSync(configPath)){
            setTimeout(()=>{
                httpService.start();
            },500);
            return;
        }
        conf = getConfig();
        httpService.port = conf.network.port
        console.log('Service Init On Port ' + httpService.port)

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
    getInfo(){
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

function downFile(type, path, res) {
    let err = true
    let state = fs.statSync(path, { throwIfNoEntry: false })
    if (state === undefined) return err;
    if (type === 'folder') {
        let state = fs.statSync(path + '.zip', { throwIfNoEntry: false })
        if (state === undefined) {
            outLog(`Folder '${path}' Compression...`)
            let output = fs.createWriteStream(path + '.zip');
            let archive = archiver('zip', {
                zlib: { level: 9 }
            });
            archive.pipe(output);
            archive.directory(path, false);
            archive.finalize();
            archive.on("finish", function () {
                state = fs.statSync(path + '.zip', { throwIfNoEntry: false })
                if (state === undefined) {
                    res.setHeader("Content-Type", "application/json")
                    res.send({ state: false, message: '文件夹打包出错' })
                }
                else res.download(path + '.zip')
            });
        } else res.download(path + '.zip')
        outLog('Download Folder ' + path)
        err = false
    } else {
        outLog('Download File ' + path)
        res.download(path)
        err = false
    }
    return err;
}

function initService() {
    let serve = express()
    serve.get('/api/state', (req, res) => {
        let state = {
            share: conf.service.share.enable,
            receive: conf.service.receive.enable
        }
        res.setHeader("Content-Type", "application/json")
        res.send({ state: true, data: state })
    })
    serve.use(express.static(path.join(__dirname, app.isPackaged ? '../client' : '../../public/client')))
    return serve
}

function returnError(msg, res) {
    res.setHeader("Content-Type", "application/json")
    res.send({ state: false, message: msg })
    return false
}

export default httpService