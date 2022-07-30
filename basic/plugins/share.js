import { ipcRenderer } from 'electron'
import { join } from 'path'
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
        if (data) return JSON.parse(data);
        else return initShare();
    },
    // 添加分享
    addItem(files){
        let list = share.getList();
        for (let i = 0; i !== files.length; i++) {
            let file = files[i]
            list.push({
                "path": file.path,
                "name": file.name,
                "size": buildSize(file.size),
                "type": buildType(file.name),
                "alias": ""
            })
            logs.add(`Add Resources '${file.name}' From ${file.path}`)
        }
        saveData(list);
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
    }
}

function buildSize(number) {
    if (number >= 1073741824) return parseFloat(number / 1073741824).toFixed(2) + ' GB'
    else if (number >= 1048576) return parseFloat(number / 1048576).toFixed(2) + ' MB'
    else if (number >= 1024) return parseFloat(number / 1024).toFixed(2) + ' KB'
    else return parseFloat(number / 1024).toFixed(2) + ' B'

}

function buildType(name) {
    if (name.lastIndexOf(".") === -1) return 'folder'
    return name.substring(name.lastIndexOf(".") + 1)
}

export default share