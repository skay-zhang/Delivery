import { ipcRenderer } from 'electron'
import os from 'os';

export const win = {
    fold(){
        ipcRenderer.send('win-fold');
    },
    open(){
        ipcRenderer.send('win-open');
    },
    min(){
        ipcRenderer.send('win-min');
    },
    close(){
        ipcRenderer.send('win-close');
    }
}

export const sys = {
    getType() {
        let type = os.type();
        console.log(type)
        if (type === 'Darwin') return 'macos';
        else if (type === 'Windows_NT') return 'windows';
        else if (type === 'Linux') return 'linux';
        return 'other'
    }
}