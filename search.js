let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let searchText = urlParams.get(`search`)

console.log(searchText)

let container = document.querySelector(`.container-search`)
let containerAccordion = document.createElement(`div`)
containerAccordion.setAttribute(`class`, `accordion`)
containerAccordion.setAttribute(`id`, `accordion-search`)

container.append(containerAccordion)

// fetch(`https://jsonplaceholder.typicode.com/users?q=${searchText}`)
// .then(res => res.json())
// .then(users => {
//     let usersAcardionItem = createdivAccordionItem()
//     let usersAccordionH2 = createdivAccordionHeader(`h2`, `users`)
//     let usersAccordionButton = createdAccordionButton(`user`)
//     usersAccordionButton.textContent = `Users: (${[...users].length})`
//     let usersAccordionCollapse = createdAccordionCollapse(`user`, `search`, `users`)
//     let usersAccordionBody = createdAccordionBody()
//     // console.log([...users].length)
//     users.map(user => {
        
//     let ul = createElement(`ul`)
//     let li = createElement(`li`)

//     let nameA = createElement('a', `${user.name}`)
//     nameA.setAttribute(`href`, `./user.html?user_id=${user.id}`)
//     // nameA.setAttribute(`id`, `1`)

//     li.append(nameA)
//     ul.append(li)
//     usersAccordionBody.append(ul)
// })
//     usersAccordionCollapse.append(usersAccordionBody)
//     usersAccordionH2.append(usersAccordionButton)
//     usersAcardionItem.append(usersAccordionH2,usersAccordionCollapse)
//     containerAccordion.append(usersAcardionItem)


// console.log(users)
// })
searchFunc(`users`, `user`, `Users`, `name`)
searchFunc(`posts`, `post`, `Posts`, `title`)
searchFunc(`albums`, `album`, `Albums`, `title`)




function searchFunc(category, buttonId, textContentBtn,findObj) {
    fetch(`https://jsonplaceholder.typicode.com/${category}?q=${searchText}`)
.then(res => res.json())
.then(datas => {
    console.log(datas)
    let usersAcardionItem = createdivAccordionItem()
    let usersAccordionH2 = createdivAccordionHeader(`h2`, category)
    let usersAccordionButton = createdAccordionButton(buttonId)
    usersAccordionButton.textContent = textContentBtn +`: (${[...datas].length})`
    let usersAccordionCollapse = createdAccordionCollapse(buttonId, `search`, category)
    let usersAccordionBody = createdAccordionBody()
    datas.map(data => {
        console.log(data) 
    let ul = createElement(`ul`)
    let li = createElement(`li`)

    let nameA = createElement('a', `${data[findObj]}`)
    nameA.setAttribute(`href`, `./${buttonId}.html?${buttonId}_id=${data.id}`)

    li.append(nameA)
    ul.append(li)
    usersAccordionBody.append(ul)
})
    usersAccordionCollapse.append(usersAccordionBody)
    usersAccordionH2.append(usersAccordionButton)
    usersAcardionItem.append(usersAccordionH2,usersAccordionCollapse)
    containerAccordion.append(usersAcardionItem)

})
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