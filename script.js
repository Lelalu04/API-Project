import { getUrlParams,appendToContainer_returnFetch,firstLetterUpperCase, fetchData, createElement, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
import {createAlbumsAccordionAddEvent,createCommentsAccordionAddEvent} from "./addEventListersFunctions.js";

import page from "./page.js";


init()
function init() {
    LoadToDisplay()
    
}
async function LoadToDisplay() {
    let limit = getUrlParams(`_limit`) ?  getUrlParams(`_limit`) : 10
    
    let posts = await appendToContainer_returnFetch(`.container-home`,`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user&_page=${getUrlParams(`page`)}&_limit=${limit}`,`post`, true)
    
    let total = posts.total
    page(getUrlParams(`page`), limit, total)
    header()
    
    posts.fetchInfo.map(post => {

        let postAccordionBody_button = accordionBase({
            container: posts.accordion,
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

