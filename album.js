import { createElement,createPSpanA } from "./function.js";

let container = document.querySelector(`.container-album`)

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let albumId = urlParams.get(`album_id`)

fetch(`https://jsonplaceholder.typicode.com/albums/` + albumId + `/?_embed=photos&_expand=user`)
    .then(res => res.json())
    .then(album => {
        
        let albumTitleH2 = createElement(`h2`, album.title.toUpperCase())
        let albumAutorP = createPSpanA(`Autor: `,album.user.name,`./user.html?user_id=${album.userId}`)

        let albumPhotoDiv = createElement(`div`)
        
        album.photos.map(photos => {
            
            let albumsImg = createElement(`img`)
            albumsImg.setAttribute(`src`, photos.thumbnailUrl)
            albumsImg.setAttribute(`alt`, photos.title)
            albumPhotoDiv.append(albumsImg)
        })
        container.append(albumTitleH2, albumAutorP,albumPhotoDiv)
    })
