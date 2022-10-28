let container = document.querySelector(`.container-post`)

fetch(`https://jsonplaceholder.typicode.com/posts/1?_expand=user&_embed=comments`)
    .then(res => res.json())
    .then(post => {
        console.log(post)
        // post.map(post => {
            
            let postH2 = createElement(`h2`, post.title.toUpperCase())
            let postBody = createElement(`p`, post.body)

            let postAutorP = createElement(`p`, `Autor: `)
            let postAutorSpan = createElement(`span`)
            let postAutorA = createElement(`a`, post.user.name)
            postAutorA.setAttribute(`href`, `./user.html?user_id=${post.user.id}` )

            let postComentBtn = createElement(`button`, `Comments:`)
            let postComentBodyDiv = createElement(`div`)

            postComentBtn.addEventListener(`click`, () => {
                post.comments.map(comment => {

                    let postComentName = createElement(`h3`, comment.name.toUpperCase())
                    let postComentBody = createElement(`p`, comment.body)
                    let postComentEmailP = createElement(`p`, `Email: `)
                    let postComentEmailSpan = createElement(`span`)
                    let postComentEmailA = createElement(`a`, comment.email)
                    postComentEmailA.setAttribute(`href`, `mailto:${comment.email}`)

                    postComentEmailSpan.append(postComentEmailA)
                    postComentEmailP.append(postComentEmailSpan)
                    postComentBodyDiv.append(postComentName,postComentBody,postComentEmailP)
                    container.append(postComentBodyDiv)
                })
            })
            let postAlbumsBtn = createElement(`button`, `Albums:`)
            let postAlbumsDiv = createElement(`div`)
            postAlbumsBtn.addEventListener(`click`, () => {
                let posy = createElement(`p`, `comment.body`)
                postAlbumsDiv.append(posy)
                postAlbumsBtn.appendChild(postAlbumsDiv)
            })
           
            


            postAutorSpan.append(postAutorA)
            postAutorP.append(postAutorSpan)
            container.append(postH2, postBody,postAutorP,postComentBtn,postAlbumsBtn)


        //     let postButton = createdAccordionButton()
        //     postButton.textContent = post.title.toUpperCase()

        //     hite_showAccordionCollapse(postButton, postCollapse)
        //     let postBody = createdAccordionBody()

        //     let nameP = createElementP(`Name: `)
        //     let nameSpan = createElement('span')
        //     let nameA = createElement('a', `${post.user.name}`)
        //     nameA.setAttribute(`href`, `./user.html`)
        //     nameA.setAttribute(`id`, `1`)
        //     // nameA.setAttribute(`id`, `${post.user.id}`)
        //     let albumsButton = createElement('button', `Albums:`)
        //     let albumsbodyDiv = createElement('div')

        //     albumsButton.addEventListener(`click`, () => {
        //         fetch(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
        //             .then(res => res.json())
        //             .then(albums => {
        //                 albums.map((album, index) => {
        //                     console.log(album)
                            
        //                     let albumsP = createElement(`p`, `${index + 1}. `)
        //                     let albumsSpan = createElement(`span`)
        //                     let albumsA = createElement(`a`, `${album.title}.`)
        //                     albumsA.setAttribute(`href`, `./album.html`)

        //                     let albumsImg = createElement(`img`)
        //                     albumsImg.setAttribute(`src`, album.photos[0].thumbnailUrl)
        //                     albumsImg.setAttribute(`alt`, album.photos[0].title)
                            
        //                 albumsSpan.append(albumsA)
        //                 albumsP.append(albumsSpan)
        //                 albumsbodyDiv.append(albumsP, albumsImg)
        //                 })
        //             })
        //     })


        //    


        //     post.comments.map(comment => {

        //         let commentItem = createdivAccordionItem()

        //         let commentH3 = createdivAccordionHeader('h3')

        //         let commentButton = createdAccordionButton()

        //         let commentCollapse = createdAccordionCollapse()

        //         hite_showAccordionCollapse(commentButton, commentCollapse)

        //         let commentBody = createdAccordionBody()

        //         let commentP = createElementP(comment.body)
        //         let commentA = createElementA(comment.email)

        //         commentH3.textContent = comment.name.toUpperCase()

        //         commentBody.append(commentP, commentA)
        //         commentCollapse.append(commentBody)
        //         commentButton.append(commentH3)
        //         commentItem.append(commentButton, commentCollapse)
        //         postBody.append(commentItem)

        //     })
            
        // })
    })


function createdivAccordionItem() {
    let divAccordionItem = document.createElement(`div`)
    divAccordionItem.setAttribute(`class`, `accordion-item`)
    return divAccordionItem
}
function createdivAccordionHeader(element) {
    let accordionH2 = document.createElement(element)
    accordionH2.setAttribute(`class`, `accordion-header`)
    return accordionH2
}
function createdAccordionButton() {
    let accordionButton = document.createElement(`button`)
    accordionButton.setAttribute(`class`, `accordion-button`)
    return accordionButton
}
function createdAccordionCollapse() {
    let accordionCollapse = document.createElement(`div`)
    accordionCollapse.setAttribute(`class`, "hide")
    return accordionCollapse
}
function createdAccordionBody() {
    let accordionBody = document.createElement(`div`)
    accordionBody.setAttribute(`class`, "accordion-body")
    return accordionBody
}
function createElementP(text) {
    let p = document.createElement(`p`)
    p.textContent = text
    return p
}
function createElementA(text) {
    let a = document.createElement(`a`)
    a.setAttribute(`href`, `mailto:${text}`)
    a.textContent = text
    return a
}
function hite_showAccordionCollapse(button, element) {
    button.addEventListener(`click`, () => {
        if (element.className === "hide") {
            element.setAttribute(`class`, "show")
        } else {
            element.setAttribute(`class`, "hide")
        }
    })
}
function createElement(element, text) {
    let variable = document.createElement(element)
    variable.textContent = text
    return variable
}
