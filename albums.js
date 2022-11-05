import { fetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
init()

function init() {
    renderAlbumsList()
    header()
}
async function renderAlbumsList() {

    let container = document.querySelector(`.container-albums`)

    let albums = await fetchData(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos`)
    let h2 = createElement(`h2`, `Albums List: `)
    let h2Span = createElement(`span`, `(${[...albums].length})`)
    h2.append(h2Span)
    container.append(h2)
    let albumsAccordion = createContainerAccordion(`albums`)
    albums.map(album => {

        let albumAccordionBody = accordionBase({
            container: albumsAccordion,
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
    container.append(albumsAccordion)
}
