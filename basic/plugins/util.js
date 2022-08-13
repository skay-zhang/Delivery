import hash from 'object-hash'
import mime from './mime'

function getOtherIcon(item) {
    let name = item.name.toLowerCase();
    if (name === 'dockerfile') {
        item.icon = 'docker';
        item.type = 'docker';
    }
    return item;
}

const util = {
    buildFile(file) {
        let type = 'folder';
        let index = file.name.lastIndexOf(".");
        if (index !== -1) type = file.name.substring(index + 1).toLowerCase()

        return {
            path: file.path,
            name: file.name,
            code: hash.MD5(file.path),
            size: util.buildSize(file.size),
            type
        };
    },
    buildSize(number) {
        if (number >= 1073741824) return parseFloat(number / 1073741824).toFixed(2) + ' GB'
        else if (number >= 1048576) return parseFloat(number / 1048576).toFixed(2) + ' MB'
        else if (number >= 1024) return parseFloat(number / 1024).toFixed(2) + ' KB'
        else return parseFloat(number / 1024).toFixed(2) + ' B'
    },
    getIcons(list) {
        for (let a in list) {
            util.getIcon(list[a])
        }
        return list;
    },
    getIcon(file) {
        for (let key in mime) {
            for (let b in mime[key]) {
                if (mime[key][b] == file.type) {
                    file.icon = key;
                    break;
                }
            }
        }
        if (file.icon == undefined) {
            file = getOtherIcon(file);
            if (file.icon == undefined) file.icon = 'other';
        } else if (file.icon == 'folder') getOtherIcon(file);
    },
    formatDate(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
        let date = new Date();
        if (timestamp) date = new Date(timestamp)
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substring(('' + o[k]).length)))
            }
        }
        return fmt
    }
}

export default util