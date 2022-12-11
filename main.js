const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('fullscreen', () => win.setFullScreen(true));
    ipcMain.handle('unfullscreen', () => win.setFullScreen(false));

    win.loadFile('game/index.html');
    win.toggleDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});