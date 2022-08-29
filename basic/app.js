import { app, BrowserWindow, Tray, Menu, ipcMain, nativeTheme } from 'electron'
import httpService from "./plugins/http-service"
import { release } from 'os'
import { join } from 'path'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

export const ROOT_PATH = {
  dist: join(__dirname, '..'),
  public: join(__dirname, app.isPackaged ? '..' : '../../public'),
}

let win = null;
let tray = null;
const preload = join(__dirname, './preload/index.js')
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  let isDark = nativeTheme.shouldUseDarkColors;
  win = new BrowserWindow({
    title: 'Delivery',
    width: 350,
    height: 700,
    frame: false,
    center: true,
    resizable: false,
    transparent: true,
    maximizable: false,
    fullscreenable: false,
    icon: join(ROOT_PATH.public, 'logo/tray-' + (isDark ? 'light' : 'dark') + '.png'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged) win.loadFile(indexHtml)
  else {
    win.loadURL(url)
    win.webContents.openDevTools()
  }
}

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// 应用就绪
app.on('ready', async () => {
  initMenu();
  createWindow();
  setTimeout(()=> httpService.start(receiveCallback),1000);
})

// 监控主题变化
nativeTheme.on('updated', () => {
  let isDark = nativeTheme.shouldUseDarkColors;
  let iconPath = join(ROOT_PATH.public, 'logo/tray-' + (isDark ? 'light' : 'dark') + '.png');
  win.setIcon(iconPath);
  tray.setImage(iconPath);
})

// 折叠窗口
ipcMain.on('win-fold', (_event, _arg) => {
  win.setSize(350, 103);
})

// 展开窗口
ipcMain.on('win-open', (_event, _arg) => {
  win.setSize(350, 700);
})

// 隐藏窗口
ipcMain.on('win-min', function () {
  win.minimize();
})

// 关闭窗口
ipcMain.on('win-close', function () {
  win.hide();
})

// 获取用户数据文件夹
ipcMain.on('get-user-data', (event, _arg) => {
  event.returnValue = app.getPath('userData');
})

// 获取用户下载文件夹
ipcMain.on('get-download', (event, _arg) => {
  event.returnValue = app.getPath('downloads');
})

// 获取HTTP信息
ipcMain.on('http-info', (event, _arg) => {
  event.returnValue = httpService.getInfo();
})

// 重启Http服务
ipcMain.on('http-restart', (_event, _arg) => {
  httpService.stop();
  setTimeout(()=> httpService.start(receiveCallback),1000);
})

// new window example arg: new windows url
ipcMain.handle('open-win', (_event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})

function initMenu() {
  let isDark = nativeTheme.shouldUseDarkColors;
  tray = new Tray(join(ROOT_PATH.public, 'logo/tray-' + (isDark ? 'light' : 'dark') + '.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click: () => {
        win.show()
      }
    },
    { type: 'separator' },
    {
      label: '访问地址',
      submenu: [
        { label: '点击地址即可复制', enabled: false },
        { label: '192.168.1.160:56565' },
      ]
    },
    { type: 'separator' },
    { label: '共享服务', type: 'checkbox', checked: true },
    { label: '接收服务', type: 'checkbox' },
    { type: 'separator' },
    { label: '关于 Delivery', role: 'about' },
    { label: '检查更新' },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    },
  ])
  tray.setToolTip('Delivery');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    tray.popUpContextMenu();
  })
}

function receiveCallback(file){
  win.webContents.send('receive-callback', file)
}