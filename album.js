let container = document.querySelector(`.container-album`)

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let userId = urlParams.get(`user_id`)
let userName = urlParams.get(`user_name`)


console.log(userId)
console.log(userName)

fetch(`https://jsonplaceholder.typicode.com/users/` + userId + `/albums?_embed=photos`)
    .then(res => res.json())
    .then(albums => {
        console.log(albums)
        let albumsAccordion = createdivElement_AddClass(`div`, `accordion`)
        albumsAccordion.setAttribute(`id`, `accordion-albums`)
        albums.map(album => {

            let albumAccordionItem = createdivAccordionItem()
            let albumAccordionH3 = createdivAccordionHeader(`h2`, `album_${album.id}`)
            let albumAccordionButton = createdAccordionButton(`album_${album.id}`)
            albumAccordionButton.textContent = album.title.toUpperCase()
            let albumAccordionCollapse = createdAccordionCollapse(`album_${album.id}`, `albums`, `album_${album.id}`)
            let albumAccordionBody = createdAccordionBody()

            let albumsImg;
            albumAccordionButton.addEventListener(`click`, () => {
                if(!albumsImg){

                }
            })
            album.photos.map(photo => {
                console.log(photo)
                albumsImg = createElement(`img`)
                albumsImg.setAttribute(`src`, photo.thumbnailUrl)
                albumsImg.setAttribute(`alt`, photo.title)
    
                
                albumAccordionBody.append(albumsImg)
            })
            albumAccordionCollapse.append(albumAccordionBody)
            albumAccordionH3.append(albumAccordionButton)
            albumAccordionItem.append(albumAccordionH3, albumAccordionCollapse)
            albumsAccordion.append(albumAccordionItem)
        })
        let albumAutorP = createElement(`p`, `Autor: `)
        let albumAutorSpan = createElement(`span`)
        let albumAutorA = createElement('a', `${userName}`)
        albumAutorA.setAttribute(`href`, `./user.html?user_id=${userId}`)

        albumAutorSpan.append(albumAutorA)
            albumAutorP.append(albumAutorSpan)
            
        container.append(albumAutorP, albumsAccordion)
    })

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
    function createdivElement_AddClass(element, classText) {
        let variable = document.createElement(element)
        variable.setAttribute(`class`, classText)
        return variable
    }