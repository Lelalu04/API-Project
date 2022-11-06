import { appendToContainer_returnFetch, createElement } from "./function.js";
import header from "./header.js";

let posts = await appendToContainer_returnFetch(`.container-posts`, `https://jsonplaceholder.typicode.com/posts`)
let listH2 = createElement(`h2`, `Posts List: (${posts.fetchInfo.length})`)
let ul = createElement(`ul`, "", "list-group")

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

