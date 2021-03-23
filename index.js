import { search } from './jikan-api.js'

let con = document.getElementById('contenido')
let btn = document.getElementById('btn')
let campo_texto = document.getElementById('campo_texto')
let selector = document.getElementById('seleccion_tipo')
let tarjetero = document.getElementById('tarjetero')
let table = document.getElementById('table')
let tabla = document.getElementById('tabla')

btn.addEventListener('click', busqueda)

selector.addEventListener('change', function(event){
    switch(event.target.value){
        case "anime":
            campo_texto.placeholder = "Ingrese el nombre del anime"
            break;
        case "manga":
            campo_texto.placeholder = "Ingrese el nombre del manga"
            break;
        case "character":
            campo_texto.placeholder = "Ingrese el nombre del personaje"
                break;
    }
})

async function busqueda() {
    switch(selector.value){
        case "anime":
            search('anime', campo_texto.value)
                .then(resHTTP => resHTTP.json())
                .then(resJSON => {
                    mostrarAnimes(resJSON)
                })
                .catch(err => console.log(err))                
            break;
        case "manga":
            search('manga', campo_texto.value)
                .then(resHTTP => resHTTP.json())
                .then(resJSON => {
                    mostrarMangas(resJSON)
                })                
                .catch(err => console.log(err))
            break;
        case "character":
            search('character', campo_texto.value)
                .then(resHTTP => resHTTP.json())
                .then(resJSON => {
                    mostrarPersonajes(resJSON)
                })                
                .catch(err => console.log(err))
            break;
        }
    }
    
    function mostrarAnimes(resJSON){
        let animes = resJSON.results
        tabla.innerHTML = "";

        for(var i = 0; i < animes.length; i++){
            let anime = animes[i]
            if(anime.episodes === 0) {
                anime.episodes = 'NA'
            }
            if(anime.score === 0) {
                anime.score = 'NA'
            }
            let fila = document.createElement('tr')
            fila.innerHTML += `<tr>
                <td>${anime.title}</td>
                <td>${anime.synopsis}</td>
                <td>${anime.episodes}</td>
                <td>${anime.score}</td>
                <td><img src="${anime.image_url}" class="rounded" width="100" alt="${anime.title}"></td>
            </tr>`
            tabla.appendChild(fila)
        }
    }

    function mostrarMangas(resJSON){
        let mangas = resJSON.results
        tabla.innerHTML = "";
        for(var i = 0; i < mangas.length; i++){
            let manga = mangas[i]
            if(manga.chapters === 0) {
                manga.chapters = 'NA'
            }
            if(manga.score === 0) {
                manga.score = 'NA'
            }
            let fila = document.createElement('tr')
            fila.innerHTML += `<tr>
                <td>${manga.title}</td>
                <td>${manga.synopsis}</td>
                <td>${manga.chapters}</td>
                <td>${manga.score}</td>
                <td><img src="${manga.image_url}" class="rounded" width="100" alt="${manga.title}"></td>
            </tr>`
            tabla.appendChild(fila)
        }
    }

    function mostrarPersonajes(resJSON){
        let personajes = resJSON.results
        tabla.innerHTML = "";
        tarjetero.innerHTML =""
        for(var i = 0; i < personajes.length; i++){
            let personaje = personajes[i]
            let columna = document.createElement('div')
            columna.classList.add('col')
            columna.innerHTML += `<div class="card"><img class="card-img-top" src="${personaje.image_url}" width="200" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${personaje.name}</h5>
            </div>
            </div>`
            tarjetero.appendChild(columna)
        }
    }



  