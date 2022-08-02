import { ipcRenderer } from 'electron'
import { join } from 'path'
import fs from 'fs'

let configPath = join(ipcRenderer.sendSync('get-user-data'), 'config.conf');

// 初始化配置
function initConfig() {
    let defaultData = {
        service: {
            share: {
                enable: false
            },
            receive: {
                enable: false,
                maxSize: 10000000
            }
        },
        network: {
            port: 56565,
            http: {},
            webrtc: {}
        },
        security: {},
        logs: {},
        advanced: {}
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
    fs.writeFileSync(configPath, JSON.stringify(data), 'utf8');
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
    update(moduleKey,value) {
        let data = getData();
        data[moduleKey] = value;
        saveData(data);
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