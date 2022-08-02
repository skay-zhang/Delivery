import { ipcRenderer } from 'electron'
import { join } from 'path'
import util from './util'
import fs from 'fs'

let sharePath = join(ipcRenderer.sendSync('get-user-data'), 'Share List');

// 初始化分享数据
function initShare() {
    let defaultData = [];
    fs.writeFileSync(sharePath, JSON.stringify(defaultData), 'utf8');
    return defaultData;
}

// 保存分享数据
function saveData(data) {
    fs.writeFileSync(sharePath, JSON.stringify(data), 'utf8');
}

const share = {
    getPath() {
        return sharePath
    },
    // 获取分享列表
    getList() {
        if (!fs.existsSync(sharePath)) return initShare();
        let data = fs.readFileSync(sharePath, 'utf-8');
        if (data) return util.getIcon(JSON.parse(data));
        else return initShare();
    },
    checkItem(list, path) {
        for (let i in list) {
            if (list[i].path == path) return true;
        }
        return false;
    },
    // 添加分享
    addItem(files) {
        let list = share.getList();
        for (let i = 0; i !== files.length; i++) {
            let file = files[i];
            if (share.checkItem(list, file.path)) continue;
            list.push(util.buildFile(file))
        }
        saveData(list);
        return util.getIcon(list);
    },
    // 更新分享
    updateItem(index, info) {
        let list = share.getList();
        if (list.length === 0) return '资源不存在';
        if (JSON.stringify(info) === JSON.stringify(list[index])) return '没有发现变动';
        saveData(list);
        return '';
    },
    // 删除分享
    removeItem(path) {
        let list = share.getList();
        if (list.length === 0) return '资源不存在';
        let delIndex = -1
        for (let i = 0; i < list.length; i++) {
            let res = list[i]
            if (res.path === path) {
                delIndex = i
                break
            }
        }
        if (delIndex < 0) return "资源不存在"
        list.splice(delIndex, 1)
        saveData(list);
        return '';
    },
    removeList(paths) {
        let list = share.getList();
        if (list.length === 0) return '资源不存在';
        let copyList = [];
        for (let i in list) {
            let exist = false;
            for (let x in paths) {
                if (paths[x] === list[i].path) {
                    exist = true;
                    break;
                }
            }
            if (!exist) copyList.push(list[i]);
        }
        saveData(copyList);
        return '';
    }
}

export default share