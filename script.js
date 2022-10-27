let container = document.querySelector(`.container-posts`)




fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`)
    .then(res => res.json())
    .then(posts => {
        posts.map(post => {
            let postItem = createdivAccordionItem()
            let postH2 = createdivAccordionHeader('h2')
            let postButton = createdAccordionButton()
            postButton.textContent = post.title.toUpperCase()

            let postCollapse = createdAccordionCollapse()
            hite_showAccordionCollapse(postButton, postCollapse)
            let postBody = createdAccordionBody()

            let nameP = createElementP(`Name: `)
            let nameSpan = createElement('span')
            let nameA = createElement('a', `${post.user.name}`)
            nameA.setAttribute(`href`, `./user.html`)
            nameA.setAttribute(`id`, `1`)
            // nameA.setAttribute(`id`, `${post.user.id}`)
            let albumsButton = createElement('button', `Albums:`)
            let albumsbodyDiv = createElement('div')

            albumsButton.addEventListener(`click`, () => {
                fetch(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
                    .then(res => res.json())
                    .then(albums => {
                        albums.map((album, index) => {
                            console.log(album)
                            
                            let albumsP = createElement(`p`, `${index + 1}. `)
                            let albumsSpan = createElement(`span`)
                            let albumsA = createElement(`a`, `${album.title}.`)
                            albumsA.setAttribute(`href`, `./album.html`)

                            let albumsImg = createElement(`img`)
                            albumsImg.setAttribute(`src`, album.photos[0].thumbnailUrl)
                            albumsImg.setAttribute(`alt`, album.photos[0].title)
                            
                        albumsSpan.append(albumsA)
                        albumsP.append(albumsSpan)
                        albumsbodyDiv.append(albumsP, albumsImg)
                        })
                    })
            })


            nameP.append(nameSpan)
            nameSpan.append(nameA)
            postBody.append(createElementP(post.body), nameP, albumsButton, albumsbodyDiv)
            postCollapse.append(postBody)
            postH2.append(postButton)
            postItem.append(postH2, postCollapse)


            post.comments.map(comment => {

                let commentItem = createdivAccordionItem()

                let commentH3 = createdivAccordionHeader('h3')

                let commentButton = createdAccordionButton()

                let commentCollapse = createdAccordionCollapse()

                hite_showAccordionCollapse(commentButton, commentCollapse)

                let commentBody = createdAccordionBody()

                let commentP = createElementP(comment.body)
                let commentA = createElementA(comment.email)

                commentH3.textContent = comment.name.toUpperCase()

                commentBody.append(commentP, commentA)
                commentCollapse.append(commentBody)
                commentButton.append(commentH3)
                commentItem.append(commentButton, commentCollapse)
                postBody.append(commentItem)

            })
            container.append(postItem)
        })
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



    // let container = document.querySelector(`.container`)

// fetch(`https://jsonplaceholder.typicode.com/posts`)
//     .then(res => res.json())
//     .then(posts => {
//         posts.map(post => {
//             let div = document.createElement(`div`)
//             div.setAttribute(`class`, `post-container`)
//             div.style.border = `2px solid red`
//             let h2 = document.createElement(`h2`)
//             let p = document.createElement(`p`)
//             h2.textContent = post.title.toUpperCase()
//             p.textContent = post.body

//             fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
//                 .then(res => res.json())
//                 .then(users => {
//                     let nameP = document.createElement(`p`)
//                     let br = document.createElement(`br`)
//                     nameP.textContent = `Name: ${users.name}`

//                     fetch(`https://jsonplaceholder.typicode.com/comments/${post.userId}`)
//                         .then(res => res.json())
//                         .then(comments => {
//                             console.log(comments)
//                             let a = document.createElement(`a`)
//                             let h3 = document.createElement(`h3`)
//                             let commentsP = document.createElement(`p`)

//                             a.setAttribute(`href`, `mailto:${comments.email}`)
//                             a.textContent = comments.email
//                             h3.textContent = comments.name.toUpperCase()
//                             commentsP.textContent = comments.body

//                             div.append(h2, p, nameP, h3, commentsP, a, br)
//                         })
//                     })
//                     container.append(div)
//                 })
//     })






// fetch(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums`)
// .then(res => res.json())
// .then(albums => {
//     console.log(albums)
//     albums.map(album => {
        
        
//         let albumsP = createElement(`p`, `${album.id}. `)
//         let albumsSpan = createElement(`span`)
//         let albumsA = createElement(`a`, `${album.title}.`)
//         albumsA.setAttribute(`href`, `./album.html`)
//         // let albumsUserName = createElement(`p`, `${album.id}. `)
        
//     console.log(album.id)
        
//         fetch(`https://jsonplaceholder.typicode.com/albums/` + album.id + `/photos`)
//             .then(res => res.json())
//             .then(photos => {
//                 console.log(photos[0].thumbnailUrl)
//                 // albums.map(album => {
//                     // photos.map(photo => {
//                     //     console.log(photo[0])
//                     // })
//                     let albumsImg = createElement(`img`)
//                     albumsImg.setAttribute(`src`, photos[0].thumbnailUrl)
//                     albumsImg.setAttribute(`alt`, photos[0].title)

                   
//                 //     let albumsSpan = createElement(`span`)

//                 //     let albumsA = createElement(`a`, `${album.title}.`)
//                 //     albumsA.setAttribute(`href`, `./album.html`)

//                 //     albumsSpan.append(albumsA)
//                 //     albumsP.append(albumsSpan)
//                 //     albumsbodyDiv.append(albumsP)
//                 // })
                
//             albumsSpan.append(albumsA)
//             albumsP.append(albumsSpan)
//             albumsbodyDiv.append(albumsP,albumsImg)
//             })
//     })


// })