
//seach type: anime, manga, person, character
export function search(value){
    return fetch(`https://api.jikan.moe/v3/search/anime?q=${value.replaceAll(' ', '%')}&page=1`)
}

