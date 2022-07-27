// import { app, BrowserWindow } from 'electron';
// import { join } from 'path';
const { app, BrowserWindow } = require('electron');
const { join } = require('path');

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

// 创建应用窗口
function createWindow() {
    // 创建窗口
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 800,
        frame: false,
        center: true,
        resizable: false,
        transparent: true,
        maximizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: join(__dirname, 'preload.js'),
        },
    });

    // 加载主页面
    mainWindow.loadURL(isDev ? 'http://localhost:5671' : join(__dirname, '../index.html'));

    // 开启调试工具
    if (isDev) mainWindow.webContents.openDevTools();
}

// 应用就绪
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // 无可见窗口时创建新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// 退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});