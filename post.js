import { appendToContainer_returnFetch, firstLetterUpperCase,fetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
import {createAlbumsAccordionAddEvent, createCommentsAccordionAddEvent} from "./addEventListersFunctions.js";
import { addToApiPost } from "./function_resource.js";

init()

function init() {
    getPostInfo()
    header()
    let form = document.querySelector('#create-comment-form');
    let createdAccordionBoolen = false
    let createdFirstCommentBoolen = false
    let accordionContainer 
    
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let name = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let body = event.target.elements.body.value;

    let obj = {
        link: 'https://jsonplaceholder.typicode.com/comments',
        method: `POST`,
        bodyObj: {
            name,
            email,
            body,
            postId: getUrlParams(`post_id`) ,
        }
    }

    let postComment = await addToApiPost(obj, `comment`)
    console.log(postComment)


    let accordion =  document.getElementById(`collapse_comments_${getUrlParams(`post_id`)}`).getElementsByClassName(`accordion-body`)
    console.log(...accordion)
    
    
    if(!createdAccordionBoolen){
    accordionContainer = createContainerAccordion(`comment_${getUrlParams(`post_id`)}`)
     accordion[0].append(accordionContainer)
     createdAccordionBoolen = true
    }
    if(!createdFirstCommentBoolen){
         let commentAccordionBody_button = accordionBase({
             container: accordionContainer,
             headerH: `h3`,
             headerIdButtonIdCallapse: `comment_${postComment.id}`,
             accordionContainerId: `comment_${getUrlParams(`post_id`)}`,
             ariaLabelledby: `comment_${postComment.id}`,
             textContent: postComment.name
         })
     
         let commentBodyP = createElement(`p`, postComment.name)
         let commentEmailP = createPSpanA(`Email: `, postComment.email, `mailto:${postComment.email}`)
     
         commentAccordionBody_button[0].append(commentBodyP, commentEmailP)
         createdFirstCommentBoolen = true
        console.log(`1`)
        console.log(accordionContainer)

    } else {
        console.log(`2`)
        console.log(accordionContainer)
        let commentAccordionBody_button = accordionBase({
            container: accordionContainer,
            headerH: `h3`,
            headerIdButtonIdCallapse: `comment_${postComment.id}`,
            accordionContainerId: `comment_${getUrlParams(`post_id`)}`,
            ariaLabelledby: `comment_${postComment.id}`,
            textContent: postComment.name
        })
    
        let commentBodyP = createElement(`p`, postComment.name)
        let commentEmailP = createPSpanA(`Email: `, postComment.email, `mailto:${postComment.email}`)
    
        commentAccordionBody_button[0].append(commentBodyP, commentEmailP)
    }
  })
}

async function getPostInfo() {
    let post = await appendToContainer_returnFetch(`.container-post`, `https://jsonplaceholder.typicode.com/posts/` + getUrlParams(`post_id`) + `/?_embed=comments&_expand=user`,`comments-albums_`)

    let postTitle = createElement(`h2`, post.fetchInfo.title.toUpperCase())
    let postBodyP = createElement(`p`, firstLetterUpperCase(post.fetchInfo.body))
    let nameP = createPSpanA(`Name: `, `${post.fetchInfo.user.name}`, `./user.html?user_id=${post.fetchInfo.user.id}`)
    
    let editPost = createElement('a', `Edit`)
        editPost.setAttribute(`href`, `./edit-post.html?post_id=${getUrlParams(`post_id`)}`)

    post.container.prepend(postTitle, postBodyP, nameP, editPost)
    
    createAlbumsAccordionAddEvent(post.accordion,post.fetchInfo)
    createCommentsAccordionAddEvent(post.accordion,post.fetchInfo)
}