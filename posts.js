import { appendToContainer_returnFetch,fetchData,createElement } from "./function.js";
import header from "./header.js";

        let posts = await appendToContainer_returnFetch(`.container-posts`,`https://jsonplaceholder.typicode.com/posts`)
        let ListH2 = createElement(`h2`, `Posts List:`)
        let ul = createElement(`ul`, "", "list-group")
        posts.fetchInfo.map(post => {
        
        let li = createElement(`li`)
        li.setAttribute(`class`, `list-group-item`)

        let postA = createElement('a', `${post.title.toUpperCase()}`)
        postA.setAttribute(`href`, `./post.html?post_id=${post.id}`)

        li.append(postA)
        ul.append(li)
        })
        posts.container.append(ListH2,ul)
        header()

