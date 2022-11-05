import { firstLetterUpperCase,fetchData,createElement, getUrlParams, createContainerAccordion, accordionBase } from "./function.js";
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
    let container = document.querySelector(`.container-search`)
    let containerAccordion = createContainerAccordion(`search`)

    let datas = await fetchData(`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`)
    let accordionBody = accordionBase({
        container: containerAccordion, 
        headerH2: `h2`,
        headerIdButtonIdCallapse: category,
        accordionContainerId: `search`,
        ariaLabelledby: category, 
        textContent: textContentBtn + `: (${[...datas].length})`})
    datas.map(data => {
        let ul = createElement(`ul`)
        ul.setAttribute(`class`, "list-group")
        let li = createElement(`li`)
        li.setAttribute(`class`, `list-group-item`)

        let nameA = createElement('a', `${firstLetterUpperCase(data[findObj])}`)
        nameA.setAttribute(`href`, `./${buttonId}.html?${buttonId}_id=${data.id}`)

        li.append(nameA)
        ul.append(li)
        accordionBody[0].append(ul)
    })
    container.append(containerAccordion)
    

}
