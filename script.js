import { firstLetterUpperCase, fetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";

init()
function init() {
    LoadToDisplay()
    header()
}
async function LoadToDisplay() {

    let container = document.querySelector(`.container-home`)
    let containerAccordion = createContainerAccordion(`post`)
    container.append(containerAccordion)

    let posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`)
    posts.map(post => {

        let postAccordionBody_button = accordionBase({
            container: containerAccordion,
            headerH: `h2`,
            headerIdButtonIdCallapse: post.id,
            accordionContainerId: `post`,
            ariaLabelledby: `post`,
            textContent: post.title.toUpperCase()
        })

        let linkToFullPost = createElement(`a`, `See Full Post`)
        linkToFullPost.setAttribute(`href`, `./post.html?post_id=${post.id}`)

        let postBodyP = createElement(`p`, firstLetterUpperCase(post.body))
        let nameP = createPSpanA(`Name: `, `${post.user.name}`, `./user.html?user_id=${post.user.id}`)

        let albums_CommentsAccordion = createContainerAccordion(`comments-albums_${post.id}`)
        postAccordionBody_button[0].append(linkToFullPost, postBodyP, nameP, albums_CommentsAccordion)

        createAlbumsAccordion(albums_CommentsAccordion, post)
        createCommnetsAccordion(albums_CommentsAccordion, post)
    })
}

function createCommnetsAccordion(accordion, post) {
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
function createAlbumsAccordion(accordion, post) {
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