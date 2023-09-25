// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: 'public/favicon.ico'
    })

    // 加载项目页面
    // mainWindow.loadURL('http://localhost:3000')

    // 打开DevTools
    // mainWindow.webContents.openDevTools()
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
    if (isDev) {
        // 只有开发环境才打开开发者工具
        // mainWindow.webContents.openDevTools()
    }

    creatMenu()
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

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。