import { ipcRenderer } from 'electron'
import { join, resolve } from 'path'
import util from './util'
import fs from 'fs'

let receivePath = join(ipcRenderer.sendSync('get-download'), 'delivery/');

function initReceive() {
  if (!fs.existsSync(receivePath)) 
  fs.mkdirSync(receivePath)
}

const receive = {
  getList(list) {
    initReceive();
    const dirs = fs.readdirSync(receivePath);
    for (let i in dirs) {
      let name = dirs[i];

      let type = 'folder';
      let index = name.lastIndexOf(".");
      if (index !== -1) type = name.substring(index + 1).toLowerCase()

      let data = {
        size: '',
        name,
        type
      }

      util.getIcon(data);
      list.push(data)
    }
    receive.getSize(list);
  },
  getSize(list) {
    for (let i in list) {
      fs.stat(resolve(receivePath, list[i].name), (err, stats) => {
        list[i].size = util.buildSize(stats.size);
        list[i].date = stats.mtime;
      });
    }
  }
}

export default receive