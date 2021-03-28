import { search } from './jikan-api.js'

let con = document.getElementById('contenido')
let btn = document.getElementById('btn')
let btnConsulta = document.getElementById('btn-consulta')
let campo_texto = document.getElementById('campo_texto')
let selector = document.getElementById('seleccion_tipo')
let tarjetero = document.getElementById('tarjetero')
let table = document.getElementById('table')
let tabla = document.getElementById('tabla')

btn.addEventListener('click', busqueda)
btnConsulta.addEventListener('click', busquedaBD)


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

    async function busquedaBD() {
        switch(selector.value){
            case "anime":
                let args = campo_texto.value;
                window.comunicacion.consultarAnime(args)
                break;
            case "manga":
                    alert('No implementado')
                break;
            case "character":
                alert('No implementado')
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

            let boton = document.createElement('input')
            boton.setAttribute('type','button')
            boton.setAttribute('value','Guardar')
            boton.classList.add('btn')
            boton.classList.add('btn-primary')
            boton.addEventListener('click', guardarAnime)
            boton.setAttribute('id',anime.mal_id)

            let celdaBoton = document.createElement('td')
            celdaBoton.appendChild(boton)

            let fila = document.createElement('tr')
            fila.innerHTML += `<tr>
                <td>${anime.title}</td>
                <td>${anime.synopsis}</td>
                <td>${anime.episodes}</td>
                <td>${anime.score}</td>
                <td><img src="${anime.image_url}" class="rounded" width="100" alt="${anime.title}"></td>
            </tr>`
            fila.appendChild(celdaBoton)
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

    function guardarAnime(event){
        var boton = event.target
        var celda = boton.parentElement
        var fila = celda.parentElement
        let args = []
        for(let i = 0; i < fila.children.length - 1; i++ ){
            args.push(fila.children[i].textContent)
        }

        args[4] = event.target.getAttribute('id')
        console.log(args)
        window.comunicacion.enviarAnime(args)
    }

    window.comunicacion.receiveMessage('animeGuardado', function(event, args){
        console.log(args)
        if(args[1] == 'guardado'){
            document.getElementById(args[0][4]).value = 'Guardado'
            document.getElementById(args[0][4]).disabled = true;
        }
    })

    window.comunicacion.receiveMessage('respuestaConsulta', function(event, args){
        mostrarAnimesBD(args[0])
    })

    function mostrarAnimesBD(res){
        let animes = res
        tabla.innerHTML = "";

        for(var i = 0; i < animes.length; i++){
            let anime = animes[i]

            let boton = document.createElement('input')
            boton.setAttribute('type','button')
            boton.setAttribute('value','Eliminar')
            boton.classList.add('btn')
            boton.classList.add('btn-danger')
            boton.setAttribute('id', anime.id)
            boton.addEventListener('click', eliminarAnime)
            let celdaBoton = document.createElement('td')
            celdaBoton.appendChild(boton)

            let fila = document.createElement('tr')
            fila.innerHTML += `<tr>
                <td>${anime.titulo}</td>
                <td>${anime.sinopsis}</td>
                <td>${anime.episodios}</td>
                <td>${anime.punteo}</td>
                <td>${anime.createdAt}</td>
            </tr>`
            fila.appendChild(celdaBoton)
            tabla.appendChild(fila)
        }
    }

    function eliminarAnime(event) {
        let boton = event.target
        let celda = boton.parentElement
        let fila = celda.parentElement
        let args = []
        for(let i = 0; i < fila.children.length - 1; i++ ){
            args.push(fila.children[i].textContent)
        }
        args[5] = event.target.getAttribute('id')
        window.comunicacion.eliminarAnimeBD(args)
    }

    window.comunicacion.receiveMessage('animeEliminado', function(event, args){
        if(args[1] == 'eliminado'){
        console.log(args[2])
        document.getElementById(args[2]).value = 'Eliminado'
        document.getElementById(args[2]).disabled = true;
        }
    })