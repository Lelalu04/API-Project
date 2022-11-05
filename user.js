import { fetchData, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";

init()
function init() {
    renderUserInfo()
    
}

async function renderUserInfo () {
    
    let container = document.querySelector(`.container-user`)
    
    let user = await fetchData(`https://jsonplaceholder.typicode.com/users/` + getUrlParams(`user_id`) + `?_embed=posts&_embed=albums`)
    let idP = createElement(`p`, `ID: ${user.id}`)
    let nameP = createElement(`p`, `Name: ${user.name}`)
    let usernameP = createElement(`p`, `User Name: ${user.username}`)
    let emailP = createPSpanA(`Email: `, `${user.email}`, `mailto:${user.email}`)
    let addressP = createPSpanA(`Address: `, `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}.`, `https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`)
    let phoneP = createPSpanA(`Phone: `, `${user.phone}`, `tel:${user.phone}`)
    let websiteP = createPSpanA(`Website: `, `${user.website}`, `${user.website}`)
    let companyP = createElement(`p`, `Company:`)
    let ul = createElement(`ul`)
    ul.setAttribute(`class`, `list-group`)
    
    createElementLi(ul, `Name: ${user.company.name}`)
    createElementLi(ul, `Catch phrase: ${user.company.catchPhrase}`)
    createElementLi(ul, `BS: ${user.company.bs}`)
    
    let accordionContainer = createContainerAccordion(`user`)
    container.append(idP, nameP, usernameP, emailP, addressP, phoneP, websiteP, companyP, ul, accordionContainer) 
    renderAlbumAccordion(accordionContainer,user)
    renderPostAccordion(accordionContainer,user)
    header()
    

}    

function renderAlbumAccordion(accordion,user){
let albumsBody = accordionBase({
    container: accordion, 
    headerH:`albums`,
    headerIdButtonIdCallapse: `albums`,
    accordionContainerId: `user`,
    ariaLabelledby: `albums`, 
    textContent: `Albums`})

    let albumsUl = createElement(`ul`)
    albumsUl.setAttribute(`class`, `list-group`)
    albumsBody[0].append(albumsUl)
    
    user.albums.map(album => {
        createElementAInnerLi(`${album.title.toUpperCase()}`, `./album.html?album_id=${album.id}`, albumsUl)
    })
}

function renderPostAccordion(accordion,user) {
    let postsBody = accordionBase({
        container: accordion,
        headerH: `posts`,
        headerIdButtonIdCallapse: `posts`,
        accordionContainerId: `user`,
        ariaLabelledby: `posts`,
        textContent: `Posts`})

    let postsUl = createElement(`ul`)
    postsUl.setAttribute(`class`, `list-group`)

    user.posts.map(post => {
        createElementAInnerLi(`${post.title.toUpperCase()}`, `./post.html?post_id=${post.id}`, postsUl)
    })
    postsBody[0].append(postsUl)
}

function createElementLi(ul, textContent) {
    let li = document.createElement(`li`)
    li.setAttribute(`class`, `list-group-item`)
    li.textContent = textContent
    ul.append(li)
    return li
}

function createElementAInnerLi(title, link, ul) {
    let a = createElement('a', title)
    a.setAttribute(`href`, link)
    let li = createElementLi(ul)
    li.append(a)
}
