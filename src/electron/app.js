const { app, BrowserWindow } = require('electron');
const { join } = require('path');

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

// Create application window
function createWindow() {
    // Create window
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

    // Loading the main page
    mainWindow.loadURL(isDev ? 'http://localhost:5671' : join(__dirname, '../index.html'));

    // Open debug tool
    if (isDev) mainWindow.webContents.openDevTools();
}

// Application Ready
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // Create new window when no window is activate
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// Exit the application
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});