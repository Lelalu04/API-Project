let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let searchText = urlParams.get(`search`)

console.log(searchText)

let container = document.querySelector(`.container-search`)
let containerAccordion = document.createElement(`div`)
containerAccordion.setAttribute(`class`, `accordion`)
containerAccordion.setAttribute(`id`, `accordion-search`)

container.append(containerAccordion)

loadToDisplay()


async function loadToDisplay() {
    await searchFunc(`users`, `user`, `Users`, `name`)
    await searchFunc(`posts`, `post`, `Posts`, `title`)
    await searchFunc(`albums`, `album`, `Albums`, `title`)
}

async function searchFunc(category, buttonId, textContentBtn,findObj) {

    let datas = await asyncAwaitFetchData(category)
    // if(datas){

    // }
    let accordionItem = createdivAccordionItem()
    let accordionH2 = createdivAccordionHeader(`h2`, category)
    let accordionButton = createdAccordionButton(buttonId)
    accordionButton.textContent = textContentBtn +`: (${[...datas].length})`
    let accordionCollapse = createdAccordionCollapse(buttonId, `search`, category)
    let accordionBody = createdAccordionBody()
    datas.map(data => {
    let ul = createElement(`ul`)
    let li = createElement(`li`)

    let nameA = createElement('a', `${data[findObj]}`)
    nameA.setAttribute(`href`, `./${buttonId}.html?${buttonId}_id=${data.id}`)

    li.append(nameA)
    ul.append(li)
    accordionBody.append(ul)
})
    accordionCollapse.append(accordionBody)
    accordionH2.append(accordionButton)
    accordionItem.append(accordionH2,accordionCollapse)
    containerAccordion.append(accordionItem)


}
async function asyncAwaitFetchData(category){
    const res = await fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`);
  const datas = await res.json();
  return datas

}


function createdivAccordionItem() {
    let accordionItem = document.createElement(`div`)
    accordionItem.setAttribute(`class`, `accordion-item`)
    return accordionItem
}
function createdivAccordionHeader(element, id) {
    let accordionH2 = document.createElement(element)
    accordionH2.setAttribute(`class`, `accordion-header`)
    accordionH2.setAttribute(`id`, `heading_${id}`)
    return accordionH2
}
function createdAccordionButton(id) {
    let accordionButton = document.createElement(`button`)
    accordionButton.setAttribute(`class`, `accordion-button collapsed`)
    accordionButton.setAttribute(`data-bs-toggle`, `collapse`)
    accordionButton.setAttribute(`data-bs-target`, `#collapse_${id}`)
    accordionButton.setAttribute(`aria-controls`, `collapse_${id}`)
    // postAccordionButton.setAttribute(`type`, "button")
     // postAccordionButton.setAttribute(`aria-expanded`, "false")
    return accordionButton
}
function createdAccordionCollapse(id, dataBsParent, ariaLabelledby) {
    let accordionCollapse = document.createElement(`div`)
    accordionCollapse.setAttribute(`class`, `accordion-collapse collapse`)
    accordionCollapse.setAttribute(`id`, `collapse_${id}`)
    accordionCollapse.setAttribute(`data-bs-parent`, `#accordion-${dataBsParent}`)
    accordionCollapse.setAttribute(`aria-labelledby`, `heading_${ariaLabelledby}`)

    return accordionCollapse
}
function createdAccordionBody() {
    let accordionBody = document.createElement(`div`)
    accordionBody.setAttribute(`class`, "accordion-body")
    return accordionBody
}
function createElement(element, text) {
    let variable = document.createElement(element)
    variable.textContent = text
    return variable
}