const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        sendMessage: (mensaje) => ipcRenderer.send('enviarMain', mensaje)
        , 
        receiveMessage: (channel, callback) => ipcRenderer.on(channel, callback)

    }
)