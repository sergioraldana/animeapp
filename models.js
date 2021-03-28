const { Sequelize } = require('sequelize');

const Anime = Sequelize.define('animes', {
    id: {
        type: Sequelize.INT,
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

// Anime.create({
//     titulo: "anime.titulo",
//     sinopsis: "anime.sinopsis",
//     episodios: "anime.episodios",
//     punteo: "anime.punto"
// })

module.exports = {
    Anime
}