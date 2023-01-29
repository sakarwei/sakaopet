const { app, BrowserWindow, ipcMain }=require('electron');
const process=require('process');
const path=require('path');
const createWindow = () => {
  const win=new BrowserWindow({
    width: 220,
    height: 220,
    frame: false,
    transparent: true,
    webPreferences: false,
    useContentSize: true,
    resizable: false,
    webPreferences:{
      preload: path.join(__dirname,'preload.js'),
      nodeIntegration: true,
      defaultFontFamily: {
        standard:"HarmonyOS Sans SC",
        serif:"Noto Serif CJK SC",
        sansSerif:"HarmonyOS Sans SC",
        monospace:"Monospace",
        cursive:"HarmonyOS Sans SC",
        fantasy:"HarmonyOS Sans SC",
      }
    }
  })
  ipcMain.on('max',()=>{
    if(win.isMaximized()){win.restore();}
    else{win.maximize();}
  });
  ipcMain.on('min',()=>{win.minimize();});
  ipcMain.on('resize',(stat)=>{win.setResizable(stat);})
  ipcMain.on('devtool',()=>{win.webContents.toggleDevTools({mode:"detach"});});
  win.loadFile('assets/index.html');
  //globalShortcut.register('F5', () => {win.webContents.reload();})
  win.webContents.setWindowOpenHandler(({url})=>{
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        fullscreenable: false,
        transparent: true,
        width: 600,
        height: 500,
        webPreferences:{
          preload: path.join(__dirname,'preload.js')
        }
      },
    }
  })
}

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){app.quit();}
})

