import { firstLetterUpperCase,fetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
import {createAlbumsAccordionAddEvent, createCommentsAccordionAddEvent} from "./addEventListersFunctions.js";

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
    
    createAlbumsAccordionAddEvent(albums_CommentsAccordion,post)
    createCommentsAccordionAddEvent(albums_CommentsAccordion,post)
}



