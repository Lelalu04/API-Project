
import { firstLetterUpperCase, fetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";


export function createAlbumsAccordionAddEvent(accordion, post) {
    let albumsAccordionBody_button = accordionBase({
        container: accordion,
        headerH: `h3`,
        headerIdButtonIdCallapse: `albums_${post.id}`,
        accordionContainerId: `comments-albums_${post.id}`,
        ariaLabelledby: `albums_${post.id}`,
        textContent: `Albums`
    })
    let albumsAccordion;
    albumsAccordionBody_button[1].addEventListener(`click`, async () => {
        if (!albumsAccordion) {

            let albums = await fetchData(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
            albumsAccordion = createContainerAccordion(`album_${post.id}`)
            albums.map((album) => {

                let albumAccordionBody_button = accordionBase({
                    container: albumsAccordion,
                    headerH: `h3`,
                    headerIdButtonIdCallapse: `album_${album.id}`,
                    accordionContainerId: `album_${post.id}`,
                    ariaLabelledby: `album_${album.id}`,
                    textContent: album.title.toUpperCase()
                })

                let br = createElement(`br`)
                let albumsA = createElement(`a`, `${album.title.toUpperCase()}.`)
                albumsA.setAttribute(`href`, `./album.html?album_id=${album.id}`)

                let albumsImg = createElement(`img`)
                albumsImg.setAttribute(`src`, album.photos[0].thumbnailUrl)
                albumsImg.setAttribute(`alt`, album.photos[0].title)

                albumAccordionBody_button[0].append(albumsA, br, albumsImg)
                albumsAccordionBody_button[0].append(albumsAccordion)
            })
        }
    })
}  
export function createCommentsAccordionAddEvent(accordion, post) {
    let commentsAccordionBody_button = accordionBase({
        container: accordion,
        headerH: `h3`,
        headerIdButtonIdCallapse: `comments_${post.id}`,
        accordionContainerId: `comments-albums_${post.id}`,
        ariaLabelledby: `comments_${post.id}`,
        textContent: `Comments`
    })
    let commentsAccordion;
    commentsAccordionBody_button[1].addEventListener(`click`, async () => {
        if (!commentsAccordion) {
            let comments = await fetchData(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            commentsAccordion = createContainerAccordion(`comment_${post.id}`)
            comments.map(comment => {

                let commentAccordionBody_button = accordionBase({
                    container: commentsAccordion,
                    headerH: `h3`,
                    headerIdButtonIdCallapse: `comment_${comment.id}`,
                    accordionContainerId: `comment_${post.id}`,
                    ariaLabelledby: `comment_${comment.id}`,
                    textContent: comment.name
                })

                let commentBodyP = createElement(`p`, comment.name)
                let commentEmailP = createPSpanA(`Email: `, comment.email, `mailto:${comment.email}`)

                commentAccordionBody_button[0].append(commentBodyP, commentEmailP)
                commentsAccordionBody_button[0].append(commentsAccordion)
            })
        }
    })
}