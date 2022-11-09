import { appendToContainer_returnFetch, createElement, getUrlParams } from "./function.js";
import header from "./header.js";
import page from "./page.js";

let limit = getUrlParams(`_limit`) ?  getUrlParams(`_limit`) : 10
page(getUrlParams(`page`), limit)

        console.log(getUrlParams(`_limit`))


let posts = await appendToContainer_returnFetch(`.container-posts`, `https://jsonplaceholder.typicode.com/posts?_page=${getUrlParams(`page`)}&_limit=${limit}`)
let listH2 = createElement(`h2`, `Posts List: (${posts.fetchInfo.length})`)
let ul = createElement(`ul`, "", "list-group")
// console.dir(posts)

let createpost = createElement('a', `Create Post`)
createpost.setAttribute(`href`, `./create-post.html`)

posts.fetchInfo.map(post => {
        console.log(posts.fetchInfo.length)
        let li = createElement(`li`)
        li.setAttribute(`class`, `list-group-item`)

        let postA = createElement('a', `${post.title.toUpperCase()}`)
        postA.setAttribute(`href`, `./post.html?post_id=${post.id}`)

        li.append(postA)
        ul.append(li)
})
posts.container.append(createpost, listH2, ul)
header()

