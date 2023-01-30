const { app, BrowserWindow, ipcMain, Menu, Tray }=require('electron');
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
  ipcMain.on('zoomIn',()=>{
    var now=win.webContents.getZoomFactor();
    win.webContents.setZoomFactor(now+0.1);
  })
  ipcMain.on('zoomOut',()=>{
    var now=win.webContents.getZoomFactor();
    win.webContents.setZoomFactor(now-0.1);
  })
  ipcMain.on('zoomReset',()=>{
    win.webContents.setZoomFactor(1);
  })
  win.loadFile('assets/index.html');
  //globalShortcut.register('F5', () => {win.webContents.reload();})
  win.webContents.setWindowOpenHandler(({url})=>{
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        fullscreenable: false,
        transparent: true,
        width: 500,
        height: 400,
        webPreferences:{
          preload: path.join(__dirname,'preload.js')
        }
      },
    }
  })
}

app.whenReady().then(() => {
  const trayico=path.join(__dirname,'assets');
  const apptray=new Tray(path.join(trayico,'app_icon.png'));
  const traymenu=Menu.buildFromTemplate([
    {label:"显示宠物",click:function(){app.focus();}},
    {label:"退出软件",click:function(){app.quit();}}
  ]);
  apptray.setToolTip('OPet');
  apptray.setContextMenu(traymenu);
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){app.quit();}
})

