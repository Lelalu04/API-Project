import { appendToContainer_returnFetch,fetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
init()

function init() {
    renderAlbumsList()
    header()
}
async function renderAlbumsList() {

    let albums = await appendToContainer_returnFetch(`.container-albums`,`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos`,`albums`)
    let h2 = createElement(`h2`, `Albums List: `)
    let h2Span = createElement(`span`, `(${[...albums.fetchInfo].length})`)
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
    albums.container.prepend(h2)
}
