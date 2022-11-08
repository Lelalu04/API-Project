import { appendToContainer_returnFetch, firstLetterUpperCase, fetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
import { createAlbumsAccordionAddEvent, createCommentsAccordionAddEvent } from "./addEventListersFunctions.js";
import { addToApiPost } from "./function_resource.js";

init()

function init() {
    getPostInfo()
    header()
    let form = document.querySelector('#create-comment-form');
    let createdAccordionBoolen = false
    let createdFirstCommentBoolen = false
    localStorage.setItem(`createdFirstCommentBoolen`, JSON.stringify(createdFirstCommentBoolen))
    let accordionContainer
    let id = 501
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
                postId: getUrlParams(`post_id`),
            }
        }

        let postComment = await addToApiPost(obj, `comment`)
        let bodyComments = document.getElementById(`body-comments`)

        if (bodyComments.childElementCount === 0) {
            id++
            accordionContainer = createContainerAccordion(`comment_${getUrlParams(`post_id`)}`)
            accordionContainer.classList.add("komentaras");
            bodyComments.append(accordionContainer)
            localStorage.setItem(`createdFirstCommentBoolen`, JSON.stringify(createdFirstCommentBoolen = true))
            addComment(accordionContainer, postComment, id)
            console.log(accordionContainer)
        } else {
            id++
            let accordionComments = document.querySelector(`.komentaras`)
            addComment(accordionComments, postComment, id)
        }
    })
}
function addComment(accordionContainer, postComment, id) {
    let commentAccordionBody_button = accordionBase({
        container: accordionContainer,
        headerH: `h3`,
        headerIdButtonIdCallapse: `comment_${id}`,
        accordionContainerId: `comment_${id}`,
        ariaLabelledby: `comment_${id}`,
        textContent: postComment.name
    })

    let commentBodyP = createElement(`p`, postComment.name)
    let commentEmailP = createPSpanA(`Email: `, postComment.email, `mailto:${postComment.email}`)
    commentAccordionBody_button[0].append(commentBodyP, commentEmailP)
}

async function getPostInfo() {
    let post = await appendToContainer_returnFetch(`.container-post`, `https://jsonplaceholder.typicode.com/posts/` + getUrlParams(`post_id`) + `/?_embed=comments&_expand=user`, `comments-albums_`)

    let postTitle = createElement(`h2`, post.fetchInfo.title.toUpperCase())
    let postBodyP = createElement(`p`, firstLetterUpperCase(post.fetchInfo.body))
    let nameP = createPSpanA(`Name: `, `${post.fetchInfo.user.name}`, `./user.html?user_id=${post.fetchInfo.user.id}`)

    let editPost = createElement('a', `Edit`)
        editPost.setAttribute(`href`, `./edit-post.html?post_id=${getUrlParams(`post_id`)}`)

    post.container.prepend(postTitle, postBodyP, nameP, editPost)

    createAlbumsAccordionAddEvent(post.accordion, post.fetchInfo)
    createCommentsAccordionAddEvent(post.accordion, post.fetchInfo)
}