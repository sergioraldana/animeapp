
//seach type: anime, manga, person, character
export function search(type, value){
    return fetch(`https://api.jikan.moe/v3/search/${type}?q=${value.replaceAll(' ', '%')}&page=1`)
}