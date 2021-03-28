const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { Sequelize, DataTypes, Op } = require('sequelize')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
        preload: path.join(app.getAppPath(),'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })


// database.consultarFavoritos(1)
//     .then(res=>{
//         console.log(res)
//     })


const DB = new Sequelize ('bdanimes', 'anime', 'galileo', {
  host:'localhost',
  dialect:'mysql',
  //loggin: false
});

DB.authenticate()
.then(() => {
console.log('Conectado a la base de datos exitosamente.');
//
module.exports = DB;
})
.catch(err => {
console.error('Error al conectarse a la base de datos:', err);
});

const Anime = DB.define('animes', {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  }, 
  titulo: {
      type: Sequelize.STRING,
      allowNull: false
  },
  sinopsis: {
      type:Sequelize.STRING
  },
  episodios: {
          type:Sequelize.STRING},
  punteo: {
          type:Sequelize.STRING
      }
})


ipcMain.on('enviarAnime', function(event, args){
  console.log(args)
  Anime.create ({
      titulo: args[0],
      sinopsis: args[1],
      episodios: args[2],
      punteo: args[3]
    })
      win.webContents.send('animeGuardado', [args,'guardado'])
  
})

ipcMain.on('consultarAnime', function(event, args){
  
  Anime.findAll({
    raw:true,
    where: {
      titulo: {
        [Op.startsWith]: args
      }
    }
  }).then(res=>{
    win.webContents.send('respuestaConsulta', [res,'econtrado'])
  })
      
})

ipcMain.on('eliminarAnime', function(event, args){
  
  Anime.destroy({
    where: {
      id: args[5]
      }
    }).then(res => {
      if (res === 1) {
        win.webContents.send('animeEliminado', [res,'eliminado', args[5]])
      }
    
    })
})