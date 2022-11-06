import { appendToContainer_returnFetch, firstLetterUpperCase,fetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
import {createAlbumsAccordionAddEvent, createCommentsAccordionAddEvent} from "./addEventListersFunctions.js";

init()

function init() {
    getPostInfo()
    header()
}

async function getPostInfo() {
    let post = await appendToContainer_returnFetch(`.container-post`, `https://jsonplaceholder.typicode.com/posts/` + getUrlParams(`post_id`) + `/?_embed=comments&_expand=user`,`comments-albums_`)

    let postTitle = createElement(`h2`, post.fetchInfo.title.toUpperCase())
    let postBodyP = createElement(`p`, firstLetterUpperCase(post.fetchInfo.body))
    let nameP = createPSpanA(`Name: `, `${post.fetchInfo.user.name}`, `./user.html?user_id=${post.fetchInfo.user.id}`)
    
    post.container.prepend(postTitle, postBodyP, nameP)
    
    createAlbumsAccordionAddEvent(post.accordion,post.fetchInfo)
    createCommentsAccordionAddEvent(post.accordion,post.fetchInfo)
}