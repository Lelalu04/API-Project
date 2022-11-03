import { asyncAwaitFetchData,createElement, getUrlParams, createPSpanA } from "./function.js";

let container = document.querySelector(`.container-album`)

        let album = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/albums/` + getUrlParams(`album_id`) + `/?_embed=photos&_expand=user`)
    
        let albumTitleH2 = createElement(`h2`, album.title.toUpperCase())
        let albumAutorP = createPSpanA(`Autor: `,album.user.name,`./user.html?user_id=${album.userId}`)

        let albumPhotoDiv = createElement(`div`)
        console.log(album)
        album.photos.map(photos => {
            
            let albumsImg = createElement(`img`)
            albumsImg.setAttribute(`src`, photos.thumbnailUrl)
            albumsImg.setAttribute(`alt`, photos.title)
            albumPhotoDiv.append(albumsImg)
        })
        container.append(albumTitleH2, albumAutorP,albumPhotoDiv)
