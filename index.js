import { search } from './jikan-api.js'

let con = document.getElementById('contenido')
let btn = document.getElementById('btn')
let campo_texto = document.getElementById('campo_texto')
let tabla = document.getElementById('tabla')

btn.addEventListener('click', busqueda)

async function busqueda() {
    search(campo_texto.value)
    //search('boku')
        .then(res =>{
            res.json()
                .then(resJSON=>{
                    let animes = resJSON.results

                    for(var i = 0; i < animes.length; i++){
                        let anime = animes[i]
                        if(anime.episodes === 0) {
                            anime.episodes = 'NA'
                        }
                        if(anime.score === 0) {
                            anime.score = 'NA'
                        }
                        tabla.innerHTML += `<tr>
                                            <td>${anime.title}</td>
                                            <td>${anime.synopsis}</td>
                                            <td>${anime.episodes}</td>
                                            <td>${anime.score}</td>
                                            <td></td>
                                            <td><img src="${anime.image_url}" class="rounded"  width="60" alt="${anime.title}"></td>
                                            </tr>`
                
                    }
                }).catch(err => console.log(err))
        })

}