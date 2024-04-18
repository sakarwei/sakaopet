const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('eAPI',{
	maximize:()=>{ipcRenderer.send('max');},
	minimize:()=>{ipcRenderer.send('min');},
	resize:(stat)=>{ipcRenderer.send('resize',stat);},
	zoomIn:(stat)=>{ipcRenderer.send('zoomIn',stat);},
	zoomOut:(stat)=>{ipcRenderer.send('zoomOut',stat);},
	zoomReset:(stat)=>{ipcRenderer.send('zoomReset',stat);},
	startDrag: (fileName) => {}
})

