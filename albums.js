import { createElement,createContainerAccordion, accordionBase } from "./function.js";

let container = document.querySelector(`.container-albums`)

fetch(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos`)
.then(res => res.json())
.then(albums => {
        let h2 = createElement(`h2`, `Albums List: `)
        let h2Span = createElement(`span`,`(${[...albums].length})`)
        h2.append(h2Span)
        container.append(h2)
        let albumsAccordion = createContainerAccordion(`albums`)
        albums.map(album => {
            
            let albumAccordionBody = accordionBase(albumsAccordion, `h2`, `album_${album.id}`, `albums`, `album_${album.id}`, album.title.toUpperCase())

            let albumAutorP = createElement(`p`, `Autor: `)
            let albumAutorSpan = createElement(`span`)
            let albumAutorA = createElement('a', `${album.user.name}`)
            albumAutorA.setAttribute(`href`, `./user.html?user_id=${album.user.id}`)

            let albumfullInfoA = createElement('a', `Link To Full Album`)
            albumfullInfoA.setAttribute(`href`, `./album.html?album_id=${album.id}&user_name=${album.user.name}`)

            console.log(album.photos.length)
            console.log(...album.photos)
            let albumPhotoRandom = Math.floor(Math.random() * album.photos.length)
            let albumsImg = createElement(`img`)
            albumsImg.setAttribute(`src`, [...album.photos][albumPhotoRandom].thumbnailUrl)
            albumsImg.setAttribute(`alt`, [...album.photos][albumPhotoRandom].title)
            
            albumAutorSpan.append(albumAutorA)
            albumAutorP.append(albumAutorSpan)
            albumAccordionBody[0].append(albumfullInfoA, albumAutorP, albumsImg)

        })      
            
        container.append(albumsAccordion)
    })