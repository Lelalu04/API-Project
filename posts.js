import { fetchData,createElement } from "./function.js";
import header from "./header.js";

let container = document.querySelector(`.container-posts`)

        let posts = await fetchData(`https://jsonplaceholder.typicode.com/posts`)
        let ListH2 = createElement(`h2`, `Posts List:`)
        let ul = createElement(`ul`)
        ul.setAttribute(`class`, "list-group")
        posts.map(post => {
        
        let li = createElement(`li`)
        li.setAttribute(`class`, `list-group-item`)

        let postA = createElement('a', `${post.title.toUpperCase()}`)
        postA.setAttribute(`href`, `./post.html?post_id=${post.id}`)

        li.append(postA)
        ul.append(li)
        })
        container.append(ListH2,ul)
        header()

