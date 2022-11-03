import { firstLetterUpperCase,asyncAwaitFetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";

init()
function init() {
    LoadToDisplay()
}
async function LoadToDisplay() {
    
    let container = document.querySelector(`.container-home`)
    let containerAccordion = createContainerAccordion(`post`)
    container.append(containerAccordion)

    let posts = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`)
    posts.map(post => {
    
        let postAccordionBody_button = accordionBase(containerAccordion, `h2`, post.id, `post`, `post`, post.title.toUpperCase())
    
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
    let commentsAccordionBody_button = accordionBase(accordion, `h3`, `comments_${post.id}`, `comments-albums_${post.id}`, `comments_${post.id}`, `Comments`)
    let commentsAccordion;
    commentsAccordionBody_button[1].addEventListener(`click`, async () => {
        if (!commentsAccordion) {
            let comments = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            commentsAccordion = createContainerAccordion(`comment_${post.id}`)
            comments.map(comment => {

                let commentAccordionBody_button = accordionBase(commentsAccordion, `h3`, `comment_${comment.id}`, `comment_${post.id}`, `comment_${comment.id}`, comment.name)

                let commentBodyP = createElement(`p`, comment.name)
                let commentEmailP = createPSpanA(`Email: `, comment.email, `mailto:${comment.email}`)

                commentAccordionBody_button[0].append(commentBodyP, commentEmailP)
                commentsAccordionBody_button[0].append(commentsAccordion)
            })
        }
    })
}
function createAlbumsAccordion(accordion, post) {
    let albumsAccordionBody_button = accordionBase(accordion, `h3`, `albums_${post.id}`, `comments-albums_${post.id}`, `albums_${post.id}`, `Albums`)
    let albumsAccordion;
    albumsAccordionBody_button[1].addEventListener(`click`, async () => {
        if (!albumsAccordion) {

            let albums = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
            albumsAccordion = createContainerAccordion(`album_${post.id}`)
            albums.map((album) => {

                let albumAccordionBody_button = accordionBase(albumsAccordion, `h3`, `album_${album.id}`, `album_${post.id}`, `album_${album.id}`, album.title.toUpperCase())

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