import { asyncAwaitFetchData,createElement, getUrlParams, createContainerAccordion, accordionBase } from "./function.js";

let form = document.getElementById(`search-form`)
let container = document.querySelector(`.container-search`)
let containerAccordion = createContainerAccordion(`search`)
let searchInput = document.getElementById(`search-input`)

container.append(containerAccordion)

form.addEventListener(`submit`, (e) => {
    e.preventDefault()
    let items = document.querySelectorAll(`.accordion-item`)
    items.forEach(item => {
        item.remove()
    })
    console.log(searchInput.value)
    loadToDisplay(searchInput.value)
    e.target.reset()
})
console.log(`veikia`)


loadToDisplay(getUrlParams(`search`))


async function loadToDisplay(searchText) {
    await searchFunc(`users`, `user`, `Users`, `name`,searchText)
    await searchFunc(`posts`, `post`, `Posts`, `title`,searchText)
    await searchFunc(`albums`, `album`, `Albums`, `title`,searchText)
}

async function searchFunc(category, buttonId, textContentBtn, findObj,searchText) {

    let datas = await asyncAwaitFetchData(`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`)
    let accordionBody = accordionBase(containerAccordion, `h2`, category, `search`, category, textContentBtn + `: (${[...datas].length})`)
    datas.map(data => {
        let ul = createElement(`ul`)
        let li = createElement(`li`)

        let nameA = createElement('a', `${data[findObj]}`)
        nameA.setAttribute(`href`, `./${buttonId}.html?${buttonId}_id=${data.id}`)

        li.append(nameA)
        ul.append(li)
        accordionBody[0].append(ul)
    })

}
// async function asyncAwaitFetchData(category,searchText) {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`);
//     const datas = await res.json();
//     return datas
// }
