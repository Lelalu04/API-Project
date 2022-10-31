import { createElement, createdivAccordionItem, createdivAccordionHeader, createdAccordionButton, createdAccordionCollapse, createdAccordionBody } from "./function.js";


let container = document.querySelector(`.container-home`)
let containerAccordion = document.createElement(`div`)
containerAccordion.setAttribute(`class`, `accordion`)
containerAccordion.setAttribute(`id`, `accordion-post`)

container.append(containerAccordion)

fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`)
    .then(res => res.json())
    .then(posts => {
        posts.map(post => {

            let postAccordionBody_button = accordionBase(containerAccordion, `h2`, post.id, `post`, `post`, post.title.toUpperCase())

            let linkToFullPost = createElement(`a`, `See Full Post`)
            linkToFullPost.setAttribute(`href`, `./post.html?post_id=${post.id}`)

            let postBodyP = createElement(`p`, post.body)
            let nameP = createElement(`p`, `Name: `)
            let nameSpan = createElement('span')
            let nameA = createElement('a', `${post.user.name}`)
            nameA.setAttribute(`href`, `./user.html?user_id=${post.user.id}`)

            nameSpan.append(nameA)
            nameP.append(nameSpan)
            postAccordionBody_button[0].append(linkToFullPost, postBodyP, nameP)

            let albums_CommentsAccordion = createElement(`div`)
            albums_CommentsAccordion.setAttribute(`class`, `accordion`)
            albums_CommentsAccordion.setAttribute(`id`, `accordion-comments-albums_${post.id}`)

            let albumsAccordionBody_button = accordionBase(albums_CommentsAccordion, `h3`, `albums_${post.id}`, `comments-albums_${post.id}`, `albums_${post.id}`, `Albums`)
            let commentsAccordionBody_button = accordionBase(albums_CommentsAccordion, `h3`, `comments_${post.id}`, `comments-albums_${post.id}`, `comments_${post.id}`, `Comments`)

            postAccordionBody_button[0].append(albums_CommentsAccordion)

            let albumsAccordion;
            albumsAccordionBody_button[1].addEventListener(`click`, () => {
                if (!albumsAccordion) {
                    fetch(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
                        .then(res => res.json())
                        .then(albums => {
                            albumsAccordion = createElement(`div`)
                            albumsAccordion.setAttribute(`class`, `accordion`)
                            albumsAccordion.setAttribute(`id`, `accordion-album_${post.id}`)
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
                        })
                }
            })

            let commentsAccordion;
            commentsAccordionBody_button[1].addEventListener(`click`, () => {
                if (!commentsAccordion) {
                    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                        .then(res => res.json())
                        .then(comments => {
                            commentsAccordion = createElement(`div`)
                            commentsAccordion.setAttribute(`class`, `accordion`)
                            commentsAccordion.setAttribute(`id`, `accordion-comment_${post.id}`)
                            comments.map(comment => {

                                let commentAccordionBody_button = accordionBase(commentsAccordion, `h3`, `comment_${comment.id}`, `comment_${post.id}`, `comment_${comment.id}`, comment.name)

                                let commentBodyP = createElement(`p`, comment.name)
                                let commentEmailP = createElement(`p`, `Email: `)
                                let commentEmailSpan = createElement(`span`)
                                let commentEmailA = createElement(`a`, comment.email)
                                commentEmailA.setAttribute(`href`, `href`, `mailto:${comment.email}`)

                                commentEmailP.append(commentEmailSpan)
                                commentEmailSpan.append(commentEmailA)
                                commentAccordionBody_button[0].append(commentBodyP, commentEmailP)
                                commentsAccordionBody_button[0].append(commentsAccordion)
                            })
                        })
                }
            })
        })
    })
function accordionBase(container, headerH, headerIdButtonIdCallapse, accordionContainerId, ariaLabelledby, textContent) {
    let postAccordionItem = createdivAccordionItem()
    let postAccordionH2 = createdivAccordionHeader(headerH, headerIdButtonIdCallapse)
    let postAccordionButton = createdAccordionButton(headerIdButtonIdCallapse)
    postAccordionButton.textContent = textContent
    let postAccordionCollapse = createdAccordionCollapse(headerIdButtonIdCallapse, accordionContainerId, ariaLabelledby)
    let postAccordionBody = createdAccordionBody()

    postAccordionCollapse.append(postAccordionBody)
    postAccordionH2.append(postAccordionButton)
    postAccordionItem.append(postAccordionH2, postAccordionCollapse)
    container.append(postAccordionItem)

    let accordionBody_Button = [postAccordionBody, postAccordionButton]
    return accordionBody_Button

}