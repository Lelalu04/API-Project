let container = document.querySelector(`.container-albums`)

fetch(`https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos`)
.then(res => res.json())
.then(albums => {
        let h2 = createElement(`h2`, `Albums List: `)
        let h2Span = createElement(`span`,`(${[...albums].length})`)
        h2.append(h2Span)
        container.append(h2)
        let albumsAccordion = createdivElement_AddClass(`div`, `accordion`)
        albumsAccordion.setAttribute(`id`, `accordion-albums`)
        albums.map(album => {
            let albumAccordionItem = createdivAccordionItem()
            let albumAccordionH3 = createdivAccordionHeader(`h2`, `album_${album.id}`)
            let albumAccordionButton = createdAccordionButton(`album_${album.id}`)
            albumAccordionButton.textContent = album.title.toUpperCase()
            let albumAccordionCollapse = createdAccordionCollapse(`album_${album.id}`, `albums`, `album_${album.id}`)
            let albumAccordionBody = createdAccordionBody()

            let albumAutorP = createElement(`p`, `Autor: `)
            let albumAutorSpan = createElement(`span`)
            let albumAutorA = createElement('a', `${album.user.name}`)
            albumAutorA.setAttribute(`href`, `./user.html?user_id=${album.user.id}`)

            // let albumAutorP = createElement(`p`, `Autor: `)
            // let albumAutorSpan = createElement(`span`)
            let albumfullInfoA = createElement('a', `Link To Full Album`)
            albumfullInfoA.setAttribute(`href`, `./album.html?user_id=${album.user.id}&user_name=${album.user.name}`)

            console.log(album.photos.length)
            console.log(...album.photos)
            let albumPhotoRandom = Math.floor(Math.random() * album.photos.length)
            let albumsImg = createElement(`img`)
            albumsImg.setAttribute(`src`, [...album.photos][albumPhotoRandom].thumbnailUrl)
            albumsImg.setAttribute(`alt`, [...album.photos][albumPhotoRandom].title)
            console.log([...album.photos][1])
            
            albumAutorSpan.append(albumAutorA)
            albumAutorP.append(albumAutorSpan)
            albumAccordionBody.append(albumfullInfoA, albumAutorP, albumsImg)

//             albumAccordionButton.addEventListener(`click`, () => {
//                 if(!albumsImg){
// // ar koda pernaujo uzkrauna?
// album.photos.map(photo => {
//     // console.log(photo)
//     albumsImg = createElement(`img`)
//     albumsImg.setAttribute(`src`, photo.thumbnailUrl)
//     albumsImg.setAttribute(`alt`, photo.title)

    
//     albumAccordionBody.append(albumsImg)
// })
//                 }
//             })
            albumAccordionCollapse.append(albumAccordionBody)
            albumAccordionH3.append(albumAccordionButton)
            albumAccordionItem.append(albumAccordionH3, albumAccordionCollapse)
            albumsAccordion.append(albumAccordionItem)
        })
       
            
        container.append(albumsAccordion)
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