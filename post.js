import { firstLetterUpperCase,fetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";

init()

function init() {
    getPostInfo()
    header()
}

async function getPostInfo() {
    let container = document.querySelector(`.container-post`)
    
    let post = await fetchData(`https://jsonplaceholder.typicode.com/posts/` + getUrlParams(`post_id`) + `/?_embed=comments&_expand=user`)
    let postTitle = createElement(`h2`, post.title.toUpperCase())
    let postBodyP = createElement(`p`, firstLetterUpperCase(post.body))
    let nameP = createPSpanA(`Name: `, `${post.user.name}`, `./user.html?user_id=${post.user.id}`)
    
    let albums_CommentsAccordion = createContainerAccordion(`comments-albums_${post.id}`)
    container.append(postTitle, postBodyP, nameP, albums_CommentsAccordion)
    
    createAlbumsAccordion(albums_CommentsAccordion,post)
    createCommentsAccordion(albums_CommentsAccordion,post)
}

function createAlbumsAccordion(accordion,post){
    let albumsAccordionBody_btn = accordionBase({
        container: accordion, 
        headerH: `h3`, 
        headerIdButtonIdCallapse: `albums_${post.id}`,
        accordionContainerId: `comments-albums_${post.id}`,
        ariaLabelledby: `albums_${post.id}`,
        textContent: `Albums`})
    let albumsAccordion;
    albumsAccordionBody_btn[1].addEventListener(`click`, async () => {
        if (!albumsAccordion) {
            let albums = await fetchData(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
            albumsAccordion = createContainerAccordion(`div`, `album_${post.id}`)
    
            albums.map((album) => {
    
                let albumAccordionBody = accordionBase({
                    container: albumsAccordion,
                    headerH: `h3`,
                    headerIdButtonIdCallapse: `album_${album.id}`,
                    accordionContainerId: `album_${post.id}`,
                    ariaLabelledby: `album_${album.id}`,
                    textContent: album.title.toUpperCase()})
    
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
let commentsAccordionBody_btn = accordionBase({
    container: accordion,
    headerH: `h3`,
    headerIdButtonIdCallapse: `comments_${post.id}`,
    accordionContainerId: `comments-albums_${post.id}`,
    ariaLabelledby: `comments_${post.id}`,
    textContent: `Comments`})
    let commentsAccordion;
    commentsAccordionBody_btn[1].addEventListener(`click`, async () => {
    if (!commentsAccordion) {
        let comments = await fetchData(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        commentsAccordion = createContainerAccordion(`comment_${post.id}`)
        comments.map(comment => {

            let commentAccordionBody = accordionBase({
                container: commentsAccordion,
                headerH: `h3`,
                headerIdButtonIdCallapse: `comment_${comment.id}`,
                accordionContainerId: `comment_${post.id}`,
                ariaLabelledby: `comment_${comment.id}`,
                textContent: comment.name.toUpperCase()})

            let commentBodyP = createElement(`p`, firstLetterUpperCase(comment.body))
            let commentEmailP = createPSpanA(`Email: `, comment.email, `mailto:${comment.email}`)

            commentAccordionBody[0].append(commentBodyP, commentEmailP)
            commentsAccordionBody_btn[0].append(commentsAccordion)
        })
    }
})
}

