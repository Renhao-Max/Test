const { default: _default } = require('concurrently')
const { app, Tray, Menu } = require('electron')
const path = require('path')


const iconPath = path.resolve(__dirname, '../public/m.ico')
let tray

function initTray() {
    tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        // { label: 'Open', click: () => { getWindow().show() } },
        { label: 'checkbox', type: 'checkbox', checked: true },
        { label: 'radio', type: 'radio' },
        { type: 'separator' },
        { label: 'Exit', click: () => { app.quit() } },
    ])

    tray.setToolTip('This is my application.')
    tray.setTitle('My title')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {  })
}


function getTray() {
    return tray
}

module.exports = { initTray, getTray }