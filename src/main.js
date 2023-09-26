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

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。