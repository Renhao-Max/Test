const { app, BrowserWindow, Menu, Tray, nativeImage, globalShortcut } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const { initTray } = require('./tray')
let mainWindow = null

const createWindow = () => {
    mainWindow = new BrowserWindow({
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

    globalShortcut.register('CommandOrControl+Shift+i', () => {
        mainWindow.webContents.isDevToolsOpened()
            ? mainWindow.webContents.closeDevTools()
            : mainWindow.webContents.openDevTools()
    })
}


function getWindow() {
    return mainWindow
}

function mainWindowIsExist() {
    return mainWindow && !mainWindow.isDestroyed()
}

const creatMenu = () => {
    Menu.setApplicationMenu(null)
}


app.whenReady().then(() => {
    createWindow()
    initTray()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


module.exports = { getWindow, createWindow, mainWindowIsExist }

require('./ipcMain/readDir')
require('./ipcMain/version')