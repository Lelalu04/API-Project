import { asyncAwaitFetchData, createElement } from "./function.js";
import header from "./header.js";

let container = document.querySelector(`.container-users`)

let users = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/users/?_embed=posts`)
let ListH2 = createElement(`h2`, `Users List:`)
let ul = createElement(`ul`)
ul.setAttribute(`class`, "list-group")
users.map(user => {
    let li = createElement(`li`)
    li.setAttribute(`class`, `list-group-item`)
    let albumAutorA = createElement('a', `${user.name} (Posts: ${[...user.posts].length})`)
    albumAutorA.setAttribute(`href`, `./user.html?user_id=${user.id}`)
    li.append(albumAutorA)
    ul.append(li)
})
container.append(ListH2, ul)