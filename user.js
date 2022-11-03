import { createElement, getUrlParams, createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
let container = document.querySelector(`.container-user`)

fetch(`https://jsonplaceholder.typicode.com/users/` + getUrlParams(`user_id`) + `?_embed=posts&_embed=albums`)
    .then(res => res.json())
    .then(user => {
        console.log(user)

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
        let albumsBody = accordionBase(accordionContainer, `albums`, `albums`, `user`, `albums`, `Albums`)
        let postsBody = accordionBase(accordionContainer, `posts`, `posts`, `user`, `posts`, `Posts`)

        let postsUl = createElement(`ul`)
        postsUl.setAttribute(`class`, `list-group`)

        user.posts.map(post => {

            let albumAutorA = createElement('a', `${post.title.toUpperCase()}`)
            albumAutorA.setAttribute(`href`, `./post.html?post_id=${post.id}`)
            let li = createElementLi(postsUl)
            li.append(albumAutorA)
        })
        postsBody[0].append(postsUl)

        let albumsUl = createElement(`ul`)
        albumsUl.setAttribute(`class`, `list-group`)
        user.albums.map(album => {

            let albumA = createElement('a', `${album.title.toUpperCase()}`)
            albumA.setAttribute(`href`, `./album.html?album_id=${album.id}`)
            let li = createElementLi(albumsUl)
            li.append(albumA)
        })
        albumsBody[0].append(albumsUl)
        container.append(idP, nameP, usernameP, emailP, addressP, phoneP, websiteP, companyP, ul, accordionContainer)
    })
function createElementLi(ul, textContent) {
    let li = document.createElement(`li`)
    li.setAttribute(`class`, `list-group-item`)
    li.textContent = textContent
    ul.append(li)
    return li
}
