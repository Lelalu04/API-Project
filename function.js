export function createElement(element, text) {
    let variable = document.createElement(element)
    variable.textContent = text
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
export function createdivAccordionItem() {
    let accordionItem = document.createElement(`div`)
    accordionItem.setAttribute(`class`, `accordion-item`)
    return accordionItem
}
export function createdivAccordionHeader(element, id) {
    let accordionH2 = document.createElement(element)
    accordionH2.setAttribute(`class`, `accordion-header`)
    accordionH2.setAttribute(`id`, `heading_${id}`)
    return accordionH2
}
export function createdAccordionButton(id) {
    let accordionButton = document.createElement(`button`)
    accordionButton.setAttribute(`class`, `accordion-button collapsed`)
    accordionButton.setAttribute(`data-bs-toggle`, `collapse`)
    accordionButton.setAttribute(`data-bs-target`, `#collapse_${id}`)
    accordionButton.setAttribute(`aria-controls`, `collapse_${id}`)
    // postAccordionButton.setAttribute(`type`, "button")
     // postAccordionButton.setAttribute(`aria-expanded`, "false")
    return accordionButton
}
export function createdAccordionCollapse(id, dataBsParent, ariaLabelledby) {
    let accordionCollapse = document.createElement(`div`)
    accordionCollapse.setAttribute(`class`, `accordion-collapse collapse`)
    accordionCollapse.setAttribute(`id`, `collapse_${id}`)
    accordionCollapse.setAttribute(`data-bs-parent`, `#accordion-${dataBsParent}`)
    accordionCollapse.setAttribute(`aria-labelledby`, `heading_${ariaLabelledby}`)

    return accordionCollapse
}
export function createdAccordionBody() {
    let accordionBody = document.createElement(`div`)
    accordionBody.setAttribute(`class`, "accordion-body")
    return accordionBody
}
export function accordionBase(container, headerH, headerIdButtonIdCallapse, accordionContainerId, ariaLabelledby, textContent) {
    let postAccordionItem = createdivAccordionItem()
    let postAccordionH2 = createdivAccordionHeader(headerH, headerIdButtonIdCallapse)
    let postAccordionButton = createdAccordionButton(headerIdButtonIdCallapse)
    postAccordionButton.textContent = textContent
    let postAccordionCollapse = createdAccordionCollapse(headerIdButtonIdCallapse, accordionContainerId, ariaLabelledby)
    let postAccordionBody = createdAccordionBody()

    postAccordionCollapse.append(postAccordionBody)
    postAccordionH2.append(postAccordionButton)
    postAccordionItem.append(postAccordionH2, postAccordionCollapse)
    container.append(postAccordionItem)

    let accordionBody_Button = [postAccordionBody, postAccordionButton]
    return accordionBody_Button

}
