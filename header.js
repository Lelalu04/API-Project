export default init()

function init() {
    let form = createForm() 
    createHeader(form)
}

function createHeader(searchForm) {
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
    header.append(searchForm, nav)
    document.body.prepend(header)
}

function createForm() {
    let searchForm = createElement(`form`)
    let inputText = createElement(`input`)
    inputText.type = `text`
    inputText.name = `search`
    inputText.placeholder = "search"
    let inputSubmit = createElement(`input`)
    inputSubmit.setAttribute(`type`, `submit`)
    inputSubmit.value = "Search"

    searchForm.append(inputText, inputSubmit)
    searchForm.action = './search.html';
    return searchForm
}

function createElement(element, text) {
    let variable = document.createElement(element)
    variable.textContent = text
    return variable
}