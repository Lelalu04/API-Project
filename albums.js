import { getUrlParams,appendToContainer_returnFetch, createElement, createPSpanA, accordionBase } from "./function.js";
import header from "./header.js";
import page from "./page.js";


init()

function init() {
    renderAlbumsList()
}
async function renderAlbumsList() {

    let limit = getUrlParams(`_limit`) ?  getUrlParams(`_limit`) : 10

    let albums = await appendToContainer_returnFetch(`.container-albums`,`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_page=${getUrlParams(`page`)}&_limit=${limit}`,`albums`,true)
    let total = albums.total
page(getUrlParams(`page`), limit, total)
header()
    
    let h2 = createElement(`h2`, `Albums List: `)
    let h2Span = createElement(`span`, `(${total})`)
    let createAlbum = createElement('a', `Create Album`)
    createAlbum.setAttribute(`href`, `./create-album.html`)
    h2.append(h2Span)
    
    albums.fetchInfo.map(album => {

        let albumAccordionBody = accordionBase({
            container: albums.accordion,
            headerH: `h2`,
            headerIdButtonIdCallapse: `album_${album.id}`,
            accordionContainerId: `albums`,
            ariaLabelledby: `album_${album.id}`,
            textContent: album.title.toUpperCase()
        })

        let albumAutorP = createPSpanA(`Autor: `, `${album.user.name}`, `./user.html?user_id=${album.user.id}`)

        let albumfullInfoA = createElement('a', `Link To Full Album`)
        albumfullInfoA.setAttribute(`href`, `./album.html?album_id=${album.id}`)

        let albumPhotoRandom = Math.floor(Math.random() * album.photos.length)
        let albumsImg = createElement(`img`)
        albumsImg.setAttribute(`src`, [...album.photos][albumPhotoRandom].thumbnailUrl)
        albumsImg.setAttribute(`alt`, [...album.photos][albumPhotoRandom].title)

        albumAccordionBody[0].append(albumfullInfoA, albumAutorP, albumsImg)
    })
    albums.container.prepend(createAlbum, h2)
}