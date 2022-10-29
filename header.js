let header = createElement(`header`)
let nav = createElement(`nav`)
let navBarUl = createElement(`ul`)
navBarUl.setAttribute(`class`, "nav")
let navBarobj = {
    texts: [`Home/`, `Posts/`, `Users/`, `Albums`],
    links: [`index.html`, `posts.html`, `users.html`, `albums.html`]
}

for (let i = 0; i < navBarobj.texts.length; i++) {
    let navBarli = createElement(`li`)
    navBarli.setAttribute(`class`, "nav-item")
    let navBarA = createElement(`a`, navBarobj.texts[i])
    navBarA.setAttribute(`class`, "nav-item")
    navBarA.setAttribute(`href`, `./${navBarobj.links[i]}`)
    navBarli.append(navBarA)
    navBarUl.append(navBarli)
}
nav.append(navBarUl)
header.append(nav)
document.body.prepend(header)

function createElement(element, text) {
    let variable = document.createElement(element)
    variable.textContent = text
    return variable
}