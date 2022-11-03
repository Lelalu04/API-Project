import { firstLetterUpperCase,asyncAwaitFetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";

init()

function init() {
    getPostInfo()
}

async function getPostInfo() {
    let container = document.querySelector(`.container-post`)
    
    let post = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/posts/` + getUrlParams(`post_id`) + `/?_embed=comments&_expand=user`)
    let postTitle = createElement(`h2`, post.title.toUpperCase())
    let postBodyP = createElement(`p`, firstLetterUpperCase(post.body))
    let nameP = createPSpanA(`Name: `, `${post.user.name}`, `./user.html?user_id=${post.user.id}`)
    
    let albums_CommentsAccordion = createContainerAccordion(`comments-albums_${post.id}`)
    container.append(postTitle, postBodyP, nameP, albums_CommentsAccordion)
    
    createAlbumsAccordion(albums_CommentsAccordion,post)
    createCommentsAccordion(albums_CommentsAccordion,post)
}

function createAlbumsAccordion(accordion,post){
    let albumsAccordionBody_btn = accordionBase(accordion, `h3`, `albums_${post.id}`, `comments-albums_${post.id}`, `albums_${post.id}`, `Albums`)
    let albumsAccordion;
    albumsAccordionBody_btn[1].addEventListener(`click`, async () => {
        if (!albumsAccordion) {
            let albums = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
            albumsAccordion = createContainerAccordion(`div`, `album_${post.id}`)
    
            albums.map((album) => {
    
                let albumAccordionBody = accordionBase(albumsAccordion, `h3`, `album_${album.id}`, `album_${post.id}`, `album_${album.id}`, album.title.toUpperCase())
    
                let br = createElement(`br`)
                let albumsA = createElement(`a`, `${album.title.toUpperCase()}.`)
                albumsA.setAttribute(`href`, `./album.html?user_id=${post.user.id}&user_name=${post.user.name}`)
    
                let albumsImg = createElement(`img`)
                albumsImg.setAttribute(`src`, album.photos[0].thumbnailUrl)
                albumsImg.setAttribute(`alt`, album.photos[0].title)
    
                albumAccordionBody[0].append(albumsA, br, albumsImg)
                albumsAccordionBody_btn[0].append(albumsAccordion)
            })
        }
    })
}

function createCommentsAccordion(accordion,post) {
let commentsAccordionBody_btn = accordionBase(accordion, `h3`, `comments_${post.id}`, `comments-albums_${post.id}`, `comments_${post.id}`, `Comments`)
    let commentsAccordion;
    commentsAccordionBody_btn[1].addEventListener(`click`, async () => {
    if (!commentsAccordion) {
        let comments = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        commentsAccordion = createContainerAccordion(`comment_${post.id}`)
        comments.map(comment => {

            let commentAccordionBody = accordionBase(commentsAccordion, `h3`, `comment_${comment.id}`, `comment_${post.id}`, `comment_${comment.id}`, comment.name.toUpperCase())

            let commentBodyP = createElement(`p`, firstLetterUpperCase(comment.body))
            let commentEmailP = createPSpanA(`Email: `, comment.email, `mailto:${comment.email}`)

            commentAccordionBody[0].append(commentBodyP, commentEmailP)
            commentsAccordionBody_btn[0].append(commentsAccordion)
        })
    }
})
}

