import { createElement,createElementAInnerLi,appendToContainer_returnFetch } from "./function.js";
import header from "./header.js";
init()

function init() {
    renderUsersList()
}
async function renderUsersList() {
    let users = await appendToContainer_returnFetch(`.container-users`,`https://jsonplaceholder.typicode.com/users/?_embed=posts`)

    let listH2 = createElement(`h2`, `Users List: (${users.fetchInfo.length})`)

    let createUser = createElement('a', `Create User`)
    createUser.setAttribute(`href`, `./create-user.html`)
    let ul = createElement(`ul`, "", `list-group`)
    users.fetchInfo.map(user => {
        
        createElementAInnerLi(`${user.name} (Posts: ${[...user.posts].length})`, `./user.html?user_id=${user.id}`, ul)
    })
    users.container.append(createUser, listH2, ul)
    header()
    
}