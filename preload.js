const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        enviarAnime: (args) => ipcRenderer.send('enviarAnime', args),
        consultarAnime: (args) => ipcRenderer.send('consultarAnime', args),
        eliminarAnimeBD: (args) => ipcRenderer.send('eliminarAnime', args),
        receiveMessage: (channel, callback) => ipcRenderer.on(channel, callback)
    }
)