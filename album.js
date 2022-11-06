import { appendToContainer_returnFetch,fetchData, createElement, getUrlParams, createPSpanA } from "./function.js";
import header from "./header.js";
init()

function init() {
    renderAlbumList()
}
async function renderAlbumList() {
    let album = await appendToContainer_returnFetch(`.container-album`,`https://jsonplaceholder.typicode.com/albums/` + getUrlParams(`album_id`) + `/?_embed=photos&_expand=user`)

    let albumTitleH2 = createElement(`h2`, album.fetchInfo.title.toUpperCase())
    let albumAutorP = createPSpanA(`Autor: `, album.fetchInfo.user.name, `./user.html?user_id=${album.fetchInfo.userId}`)

    let albumPhotoDiv = createElement(`div`)
    album.fetchInfo.photos.map(photos => {

        let albumsImg = createElement(`img`)
        albumsImg.setAttribute(`src`, photos.thumbnailUrl)
        albumsImg.setAttribute(`alt`, photos.title)
        albumPhotoDiv.append(albumsImg)
    })
    album.container.append(albumTitleH2, albumAutorP, albumPhotoDiv)
    header()
}
