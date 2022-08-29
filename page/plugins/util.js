import { ipcRenderer, clipboard } from 'electron'
import os from 'os';

export const win = {
    fold() {
        ipcRenderer.send('win-fold');
    },
    open() {
        ipcRenderer.send('win-open');
    },
    min() {
        ipcRenderer.send('win-min');
    },
    close() {
        ipcRenderer.send('win-close');
    }
}

export const date = {
    formatTime(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
        let date = new Date();
        if (timestamp) date = new Date(timestamp)
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    },
    distance(timestamp) {
        if (timestamp === undefined || timestamp == null)
            return "无数据";
        // 补全为13位
        let arrTimestamp = (timestamp + '').split('');
        for (let start = 0; start < 13; start++) {
            if (!arrTimestamp[start]) {
                arrTimestamp[start] = '0';
            }
        }
        timestamp = arrTimestamp.join('') * 1;

        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let now = new Date().getTime();
        let diffValue = now - timestamp;

        // 如果本地时间反而小于变量时间
        if (diffValue < 0) {
            return '不久前';
        }

        // 计算差异时间的量级
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;

        // 数值补0方法
        let zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };
        if (dayC > 14) {
            return (function () {
                let date = new Date(timestamp);
                return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
            })();
        } else if (dayC >= 1) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return parseInt(minC) + "分钟前";
        }
        return '刚刚';
    }
}

export const sys = {
    getType() {
        let type = os.type();
        if (type === 'Darwin') return 'macos';
        else if (type === 'Windows_NT') return 'windows';
        else if (type === 'Linux') return 'linux';
        return 'other'
    },
    setCopy(txt) {
        clipboard.writeText(txt);
    }
}

export const http = {
    getInfo() {
        return ipcRenderer.sendSync('http-info');
    }
}