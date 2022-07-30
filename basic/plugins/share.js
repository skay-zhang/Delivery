import { ipcRenderer } from 'electron'
import { join } from 'path'
import mime from './mime'
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
        if (data) return share.getIcon(JSON.parse(data));
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
            list.push(buildFile(file))
        }
        saveData(list);
        return share.getIcon(list);
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
    getIcon(list){
        for(let a in list){
            let file = list[a];
            console.log(file.type)
            for(let key in mime){
                for(let b in mime[key]){
                    if(mime[key][b] == file.type) {
                        file.icon = key;
                        break;
                    }
                }
            }
            if(list[a].icon == undefined) list[a].icon =  'other';
        }
        return list;
    }
}

function buildFile(file) {
    let type = 'folder';
    let index = file.name.lastIndexOf(".");
    if (index !== -1) type = file.name.substring(index + 1).toLowerCase()

    return {
        path: file.path,
        name: file.name,
        size: buildSize(file.size),
        type
    };
}

function buildSize(number) {
    if (number >= 1073741824) return parseFloat(number / 1073741824).toFixed(2) + ' GB'
    else if (number >= 1048576) return parseFloat(number / 1048576).toFixed(2) + ' MB'
    else if (number >= 1024) return parseFloat(number / 1024).toFixed(2) + ' KB'
    else return parseFloat(number / 1024).toFixed(2) + ' B'

}

export default share