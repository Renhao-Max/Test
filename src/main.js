const { app, BrowserWindow, Menu,globalShortcut } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: 'public/m.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    mainWindow.loadURL(
        // 'https://renhao-max.github.io'
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
    if (isDev) {
        // mainWindow.webContents.openDevTools()
    }

    creatMenu()

    globalShortcut.register('CommandOrControl+Shift+i',()=>{
        mainWindow.webContents.isDevToolsOpened()
        ?mainWindow.webContents.closeDevTools()
        :mainWindow.webContents.openDevTools()
    })
}

const creatMenu = () => {
    if (process.platform === 'darwin') {
        const template = [
            {
                label: 'Demo',
                submenu: [{ role: 'about' }, { role: 'quie' }]
            }
        ]
        let menu=Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }else{
        Menu.setApplicationMenu(null)
    }
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

require('./ipcMain/readDir')