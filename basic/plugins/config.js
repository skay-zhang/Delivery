import { ipcRenderer } from 'electron'
import { join } from 'path'
import fs from 'fs'

let timeout;
let configPath = join(ipcRenderer.sendSync('get-user-data'), 'config.conf');

// 初始化配置
function initConfig() {
  let defaultData = {
    service: {
      share: {
        enable: false,
        speed: 1024,
        qps: 3
      },
      receive: {
        enable: false,
        maxSize: 100
      }
    },
    network: {
      http: {
        port: 38950,
      },
      webrtc: {
        port: 38900,
      }
    },
    security: {
      auth: {
        enable: false,
        list: []
      },
      black: {
        enable: false,
        list: []
      },
      white: {
        enable: false,
        list: []
      }
    },
    logs: {
      enable: false,
      level: 'info'
    },
    advanced: {
      api: {
        enable: false,
        token: ''
      }
    }
  };
  fs.writeFileSync(configPath, JSON.stringify(defaultData), 'utf8');
  return defaultData;
}

// 获取配置数据(是否强制初始化)
function getData(init) {
  if (init || !fs.existsSync(configPath)) return initConfig();
  let data = fs.readFileSync(configPath, 'utf-8');
  if (data) return JSON.parse(data);
  else return initConfig();
}

// 保存配置数据
function saveData(data) {
  let json = JSON.stringify(data);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    fs.writeFileSync(configPath, json, 'utf8');
    console.log('Save Config...')
  }, 1000);
}

const config = {
  getPath() {
    return configPath
  },
  getAll() {
    return getData();
  },
  // 获取配置单元
  getModule(key) {
    let data = getData();
    let module = data[key];
    if (module) return module;
    return {};
  },
  // 获取配置项目
  getItem(moduleKey, itemKey) {
    let module = config.getModule(moduleKey);
    let item = module[itemKey];
    if (item) return item;
    return '';
  },
  // 更新配置项目
  update(moduleKey, value) {
    let data = getData();
    data[moduleKey] = value;
    saveData(data);
    ipcRenderer.send('config-update', {});
  },
  updateItem(moduleKey, itemKey, value) {
    let data = getData();
    let module = data[moduleKey];
    if (!module) module = {};
    module[itemKey] = value;
    saveData(data);
  },
  // 删除配置项目
  removeItem(moduleKey, itemKey) {
    let data = getData();
    let module = data[moduleKey];
    if (module && module[itemKey] != undefined) {
      delete module[itemKey];
      saveData(data);
    }
  }
}

export default config