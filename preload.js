const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('eAPI',{
    //setTitle: (title) => ipcRenderer.send('set-title', title)
    maximize:()=>{ipcRenderer.send('max');},
    minimize:()=>{ipcRenderer.send('min');},
    resize:(stat)=>{ipcRenderer.send('resize',stat);}
})