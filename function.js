export async function appendToContainer_returnFetch(containerClassName, fetchLink, accordionId) {
    let container = document.querySelector(containerClassName)
    let fetchInfo = await fetchData(fetchLink)

    if (accordionId) {
        let accordion 
        if(fetchInfo.id){
            accordion = createContainerAccordion(accordionId + fetchInfo.id)
            container.append(accordion)
        }else {
            accordion = createContainerAccordion(accordionId)
            container.append(accordion)
        }
        let obj = {
            fetchInfo,
            container,
            accordion
        }
        return obj
    }
    let obj = {
        container,
        fetchInfo
    }
    return obj
}

export async function fetchData(link) {
    const res = await fetch(link);
    const datas = await res.json();
    return datas
}
export function getUrlParams(getParm) {
    let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let variable = urlParams.get(getParm)
return variable
}

export function createElementLi(ul, textContent) {
    let li = document.createElement(`li`)
    li.setAttribute(`class`, "list-group-item")
    li.textContent = textContent
    ul.append(li)
    return li
}

export function createElementAInnerLi(title, link, ul) {
    let a = createElement('a', title)
    a.setAttribute(`href`, link)
    let li = createElementLi(ul)
    li.append(a)
}

export function createElement(element, text, className) {
    let variable = document.createElement(element)
    variable.textContent = text
    if(className){
        variable.className = className
    }
    return variable
}
export function createPSpanA(pTextContent, aTextContent, aHref) {
    let p = createElement(`p`, pTextContent)
    let span = createElement(`span`)
    let a = createElement(`a`, aTextContent)
    a.setAttribute(`href`, aHref)

    p.append(span)
    span.append(a)
    return p
}
export function createContainerAccordion(id) {
    let containerAccordion = document.createElement(`div`)
    containerAccordion.setAttribute(`class`, `accordion`)
    containerAccordion.setAttribute(`id`, `accordion-${id}`)
    return containerAccordion
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

export function accordionBase(InfoObj) {
    let {container, headerH, headerIdButtonIdCallapse, accordionContainerId, ariaLabelledby, textContent} = InfoObj
    let postAccordionItem = createElement(`div`, ``, `accordion-item`)
    let postAccordionH2 = createdivAccordionHeader(headerH, headerIdButtonIdCallapse)
    let postAccordionButton = createdAccordionButton(headerIdButtonIdCallapse)
    postAccordionButton.textContent = textContent
    let postAccordionCollapse = createdAccordionCollapse(headerIdButtonIdCallapse, accordionContainerId, ariaLabelledby)
    let postAccordionBody = createElement(`div`, ``, "accordion-body")

    postAccordionCollapse.append(postAccordionBody)
    postAccordionH2.append(postAccordionButton)
    postAccordionItem.append(postAccordionH2, postAccordionCollapse)
    container.append(postAccordionItem)

    let accordionBody_Button = [postAccordionBody, postAccordionButton]
    return accordionBody_Button
}
export function firstLetterUpperCase(text) {
    return text[0].toUpperCase() + text.slice(1)
}
