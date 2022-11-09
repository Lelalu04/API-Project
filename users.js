import { getUrlParams,createElement,createElementAInnerLi,appendToContainer_returnFetch } from "./function.js";
import header from "./header.js";
init()
import page from "./page.js";

function init() {
    renderUsersList()
    
}
async function renderUsersList() {
    let limit = getUrlParams(`_limit`) ?  getUrlParams(`_limit`) : 10
    let users = await appendToContainer_returnFetch(`.container-users`,`https://jsonplaceholder.typicode.com/users/?_embed=posts&_page=${getUrlParams(`page`)}&_limit=${limit}`,null,true)
    
    let total = users.total
page(getUrlParams(`page`), limit, total)
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