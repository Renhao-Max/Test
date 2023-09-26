const { app,BrowserWindow } =require("electron")


const createWindow=()=>{
    const win_rhm=new BrowserWindow({
        height:600,
        window:600
    })

    win_rhm.loadURL('https://renhao-max.github.io')
}

app.whenReady().then(()=>{
    createWindow()
})

