import { appendToContainer_returnFetch,firstLetterUpperCase,fetchData,createElement, getUrlParams, createContainerAccordion, accordionBase } from "./function.js";
import header from "./header.js";
init()

function init() {
    outerSearchForm()
    innerSearchForm() 
    header()
}
function outerSearchForm() {
    loadToDisplay(getUrlParams(`search`))
}

function innerSearchForm() {
    let form = document.getElementById(`search-form`)
    let searchInput = document.getElementById(`search-input`)
    form.addEventListener(`submit`, (e) => {
        e.preventDefault()
        let items = document.querySelectorAll(`.accordion-item`)
        items.forEach(item => {
            item.remove()
        })
        loadToDisplay(searchInput.value)
        e.target.reset()
    })
    
}

async function loadToDisplay(searchText) {
    await searchFunc(`users`, `user`, `Users`, `name`,searchText)
    await searchFunc(`posts`, `post`, `Posts`, `title`,searchText)
    await searchFunc(`albums`, `album`, `Albums`, `title`,searchText)
}

async function searchFunc(category, buttonId, textContentBtn, findObj,searchText) {

    let datas = await appendToContainer_returnFetch(`.container-search`,`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`,`search`)
    let accordionBody = accordionBase({
        container: datas.accordion, 
        headerH2: `h2`,
        headerIdButtonIdCallapse: category,
        accordionContainerId: `search`,
        ariaLabelledby: category, 
        textContent: textContentBtn + `: (${[...datas.fetchInfo].length})`})
    datas.fetchInfo.map(data => {
        let ul = createElement(`ul`, "", "list-group")
        let li = createElement(`li`, "", `list-group-item`)

        let nameA = createElement('a', `${firstLetterUpperCase(data[findObj])}`)
        nameA.setAttribute(`href`, `./${buttonId}.html?${buttonId}_id=${data.id}`)

        li.append(nameA)
        ul.append(li)
        accordionBody[0].append(ul)
    })
}
