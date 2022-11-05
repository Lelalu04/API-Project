import { firstLetterUpperCase, fetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
import {createAlbumsAccordionAddEvent,createCommentsAccordionAddEvent} from "./addEventListersFunctions.js";

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

        createAlbumsAccordionAddEvent(albums_CommentsAccordion, post)
        createCommentsAccordionAddEvent(albums_CommentsAccordion, post)
    })
}

