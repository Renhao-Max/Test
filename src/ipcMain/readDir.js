
const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

ipcMain.on('readDir', (event, arg) => {
    console.log('接收渲染进程传参：', arg)
    dialog
        .showOpenDialog({
            properties: ['openDirectory'],
        })
        .then((result) => {
            if (!result.canceled) {
                result.fileList = loadFilesInDir(result.filePaths[0])
            }
            // 将处理结果返回给渲染进程
            event.reply('readDir-reply', result)
        })
})

// 递归遍历文件
function loadFilesInDir(dir) {
    let fileList = []
    // 读取目录下全部文件及子目录
    let files = fs.readdirSync(dir)
    for (var i = 0; i < files.length; i++) {
        let filePath = path.join(dir, files[i])
        // 获取信息
        let fileData = fs.statSync(filePath)
        // 判断是文件还是目录
        fileData.isFile()
            ? fileList.push(filePath)
            : fileList = fileList.concat(loadFilesInDir(filePath))
    }
    return fileList
}