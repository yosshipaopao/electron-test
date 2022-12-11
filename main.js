const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const templateMenu = [/*
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
            },
            {
                role: 'redo',
            },
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                },
            },
            {
                type: 'separator',
            },
            {
                role: 'resetzoom',
            },
            {
                role: 'zoomin',
            },
            {
                role: 'zoomout',
            },
            {
                type: 'separator',
            },
            {
                role: 'togglefullscreen',
            }
        ]
    }*/
];



const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    //const menu = Menu.buildFromTemplate(templateMenu);
    //Menu.setApplicationMenu(menu);
    //win.maximize()
    win.toggleDevTools();

    win.loadFile('game/index.html');


    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('fullscreen', () => win.setFullScreen(true));
    ipcMain.handle('unfullscreen', () => win.setFullScreen(false));
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