import { appendToContainer_returnFetch, createElementAInnerLi,createElementLi, createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";

init()
function init() {
    renderUserInfo()
    header()
}

async function renderUserInfo() {
    let user = await appendToContainer_returnFetch(`.container-user`, `https://jsonplaceholder.typicode.com/users/` + getUrlParams(`user_id`) + `?_embed=posts&_embed=albums`, `user`)
    console.log(user)
    let idP = createElement(`p`, `ID: ${user.fetchInfo.id}`)
    let nameP = createElement(`p`, `Name: ${user.fetchInfo.name}`)
    let usernameP = createElement(`p`, `User Name: ${user.fetchInfo.username}`)
    let emailP = createPSpanA(`Email: `, `${user.fetchInfo.email}`, `mailto:${user.fetchInfo.email}`)
    let addressP = createPSpanA(`Address: `, `${user.fetchInfo.address.street}, ${user.fetchInfo.address.suite}, ${user.fetchInfo.address.city}, ${user.fetchInfo.address.zipcode}.`, `https://maps.google.com/?q=${user.fetchInfo.address.geo.lat},${user.fetchInfo.address.geo.lng}`)
    let phoneP = createPSpanA(`Phone: `, `${user.fetchInfo.phone}`, `tel:${user.fetchInfo.phone}`)
    let websiteP = createPSpanA(`Website: `, `${user.fetchInfo.website}`, `${user.fetchInfo.website}`)
    let companyP = createElement(`p`, `Company:`)
    let ul = createElement(`ul`)
    ul.setAttribute(`class`, `list-group`)

    createElementLi(ul, `Name: ${user.fetchInfo.company.name}`)
    createElementLi(ul, `Catch phrase: ${user.fetchInfo.company.catchPhrase}`)
    createElementLi(ul, `BS: ${user.fetchInfo.company.bs}`)

    user.container.prepend(idP, nameP, usernameP, emailP, addressP, phoneP, websiteP, companyP, ul)
    renderAlbumAccordion(user.accordion, user.fetchInfo)
    renderPostAccordion(user.accordion, user.fetchInfo)
}

function renderAlbumAccordion(accordion, user) {
    let albumsBody = accordionBase({
        container: accordion,
        headerH: `albums`,
        headerIdButtonIdCallapse: `albums`,
        accordionContainerId: `user`,
        ariaLabelledby: `albums`,
        textContent: `Albums`
    })

    let albumsUl = createElement(`ul`, "", `list-group`)
    albumsBody[0].append(albumsUl)

    user.albums.map(album => {
        createElementAInnerLi(`${album.title.toUpperCase()}`, `./album.html?album_id=${album.id}`, albumsUl)
    })
}

function renderPostAccordion(accordion, user) {
    let postsBody = accordionBase({
        container: accordion,
        headerH: `posts`,
        headerIdButtonIdCallapse: `posts`,
        accordionContainerId: `user`,
        ariaLabelledby: `posts`,
        textContent: `Posts`
    })

    let postsUl = createElement(`ul`, "", `list-group`)

    user.posts.map(post => {
        createElementAInnerLi(`${post.title.toUpperCase()}`, `./post.html?post_id=${post.id}`, postsUl)
    })
    postsBody[0].append(postsUl)
}
