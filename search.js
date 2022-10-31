import { createElement,createContainerAccordion, accordionBase } from "./function.js";

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let searchText = urlParams.get(`search`)

console.log(searchText)

let container = document.querySelector(`.container-search`)
let containerAccordion = createContainerAccordion(`search`)

container.append(containerAccordion)

loadToDisplay()


async function loadToDisplay() {
    await searchFunc(`users`,`user`, `Users`, `name`)
    await searchFunc(`posts`,`post`, `Posts`, `title`)
    await searchFunc(`albums`,`album`, `Albums`, `title`)
}

async function searchFunc(category,buttonId, textContentBtn,findObj) {

    let datas = await asyncAwaitFetchData(category)
    // if(datas){

    // }
    let accordionBody = accordionBase(containerAccordion, `h2`, category , `search`, category, textContentBtn +`: (${[...datas].length})`)
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
async function asyncAwaitFetchData(category){
    const res = await fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`);
  const datas = await res.json();
  return datas

}
