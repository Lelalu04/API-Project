let container = document.querySelector(`.container-posts`)
let containerAccordion = document.createElement(`div`)
containerAccordion.setAttribute(`class`, `accordion`)
containerAccordion.setAttribute(`id`, `accordion-post`)

container.append(containerAccordion)



fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`)
.then(res => res.json())
.then(posts => {
    posts.map(post => {
console.log(post)

            let postAccordionItem = createdivAccordionItem()
            let postAccordionH2 = createdivAccordionHeader(`h2`, `post`)
            let postAccordionButton = createdAccordionButton(post.id)
            postAccordionButton.textContent = post.title.toUpperCase()

            let postAccordionCollapse = createdAccordionCollapse(post.id, `post`, `post`)
            let postAccordionBody = createdAccordionBody()

            let postBodyP = createElement(`p`, post.body)
            let nameP = createElement(`p`, `Name: `)
            let nameSpan = createElement('span')
            let nameA = createElement('a', `${post.user.name}`)
            nameA.setAttribute(`href`, `./user.html?user_id=${post.user.id}`)
            // nameA.setAttribute(`id`, `1`)

            nameSpan.append(nameA)
            nameP.append(nameSpan)


            let albums_CommentsAccordion = createdivElement_AddClass(`div`, `accordion`)
            albums_CommentsAccordion.setAttribute(`id`, `accordion-comments-albums_${post.id}`)


            let commentsAccordionItem = createdivAccordionItem()
            let commentsAccordionH3 = createdivAccordionHeader(`h3`, `comments_${post.id}` )
            let commentsAccordionButton = createdAccordionButton(`comments_${post.id}`)
            commentsAccordionButton.textContent = `Comments`
            let commentsAccordionCollapse = createdAccordionCollapse(`comments_${post.id}`, `comments-albums_${post.id}`,`comments_${post.id}`)
            let commentsAccordionBody = createdAccordionBody()
            
            let albumsAccordionItem = createdivAccordionItem()
            let albumsAccordionH3 = createdivAccordionHeader(`h3`, `albums_${post.id}`)
            let albumsAccordionButton = createdAccordionButton(`albums_${post.id}`)
            albumsAccordionButton.textContent = `Albums`
            let albumsAccordionCollapse = createdAccordionCollapse(`albums_${post.id}`,`comments-albums_${post.id}`,`albums_${post.id}`)
            let albumsAccordionBody = createdAccordionBody()

            commentsAccordionCollapse.append(commentsAccordionBody)
            commentsAccordionH3.append(commentsAccordionButton)
            commentsAccordionItem.append(commentsAccordionH3,commentsAccordionCollapse)

            albumsAccordionCollapse.append(albumsAccordionBody)
            albumsAccordionH3.append(albumsAccordionButton)
            albumsAccordionItem.append(albumsAccordionH3,albumsAccordionCollapse)
            albums_CommentsAccordion.append(albumsAccordionItem,commentsAccordionItem)

            postAccordionBody.append(postBodyP, nameP, albums_CommentsAccordion)
            postAccordionCollapse.append(postAccordionBody)
            postAccordionH2.append(postAccordionButton)
            postAccordionItem.append(postAccordionH2,postAccordionCollapse)
            containerAccordion.append(postAccordionItem)

            let albumsAccordion;
            albumsAccordionButton.addEventListener(`click`, () => {
                if(!albumsAccordion){
                    fetch(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
                                .then(res => res.json())
                                .then(albums => {
                                    albumsAccordion = createdivElement_AddClass(`div`, `accordion`)
                                    albumsAccordion.setAttribute(`id`, `accordion-album_${post.id}`)
                                    albums.map((album, index) => {
    
                                        let albumAccordionItem = createdivAccordionItem()
                                        let albumsAccordionH3 = createdivAccordionHeader(`h3`, `album_${album.id}` )
                                        let albumAccordionButton = createdAccordionButton(`album_${album.id}`)
                                        albumAccordionButton.textContent = album.title.toUpperCase()
                                        let albumAccordionCollapse = createdAccordionCollapse(`album_${album.id}`, `album_${post.id}`,`album_${album.id}`)
                                        let albumAccordionBody = createdAccordionBody()
                                        
                                        // let albumsP = createElement(`p`, `${index + 1}. `)
                                        let br = createElement(`br`)
                                        let albumsA = createElement(`a`, `${album.title.toUpperCase()}.`)
                                        albumsA.setAttribute(`href`, `./album.html`)
            
                                        let albumsImg = createElement(`img`)
                                        albumsImg.setAttribute(`src`, album.photos[0].thumbnailUrl)
                                        albumsImg.setAttribute(`alt`, album.photos[0].title)
                                        
                                    // albumsSpan.append(albumsA)
                                    // albumsP.append(albumsSpan)
    
                                    albumAccordionBody.append(albumsA,br,albumsImg)
                                    albumAccordionCollapse.append(albumAccordionBody)
                                    albumsAccordionH3.append(albumAccordionButton)
                                    albumAccordionItem.append(albumsAccordionH3,albumAccordionCollapse)
                                    albumsAccordion.append(albumAccordionItem)
                                    albumsAccordionBody.append(albumsAccordion)
                                    })
                                })
                }
            })

            let commentsAccordion;
            commentsAccordionButton.addEventListener(`click`, () => {
                if(!commentsAccordion){
                    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                    .then(res => res.json())
                    .then(comments => {
                        commentsAccordion = createdivElement_AddClass(`div`, `accordion`)
                        commentsAccordion.setAttribute(`id`, `accordion-comment_${post.id}`)
                        comments.map(comment => {
    
                            let commentAccordionItem = createdivAccordionItem()
                            let commentAccordionH3 = createdivAccordionHeader(`h3`, `comment_${comment.id}` )
                            let commentAccordionButton = createdAccordionButton(`comment_${comment.id}`)
                            commentAccordionButton.textContent = comment.name
                            let commentAccordionCollapse = createdAccordionCollapse(`comment_${comment.id}`, `comment_${post.id}`,`comment_${comment.id}`)
                            let commentAccordionBody = createdAccordionBody()
    
                            let commentBodyP = createElement(`p`, comment.name)
                            let commentEmailP = createElement(`p`, `Email: `)
                            let commentEmailSpan = createElement(`span`)
                            let commentEmailA = createElement(`a`, comment.email)
                            commentEmailA.setAttribute(`href`, `href`, `mailto:${comment.email}`)
    
                            commentEmailP.append(commentEmailSpan)
                            commentEmailSpan.append(commentEmailA)
    
                            commentAccordionBody.append(commentBodyP,commentEmailP)
                            commentAccordionCollapse.append(commentAccordionBody)
                            commentAccordionH3.append(commentAccordionButton)
                            commentAccordionItem.append(commentAccordionH3,commentAccordionCollapse)
                            commentsAccordion.append(commentAccordionItem)
                        })
                        commentsAccordionBody.append(commentsAccordion)
                    })
                }
            })
        })
    })



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


        //     nameP.append(nameSpan)
        //     nameSpan.append(nameA)
        //     postBody.append(createElementP(post.body), nameP, albumsButton, albumsbodyDiv)
        //     postCollapse.append(postBody)
        //     postH2.append(postButton)
        //     postItem.append(postH2, postCollapse)


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
        //     container.append(postItem)


function createdivElement_AddClass(element, classText) {
    let variable = document.createElement(element)
    variable.setAttribute(`class`, classText)
    return variable
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




        //     
        //     hite_showAccordionCollapse(postButton, postCollapse)
        //     let postBody = createdAccordionBody()

        //     let nameP = createElementP(`Name: `)
        //     let nameSpan = createElement('span')
        //     let nameA = createElement('a', `${post.user.name}`)
        //     nameA.setAttribute(`href`, `./user.html?user_id=${post.user.id}`)
        //     nameA.setAttribute(`id`, `1`)
        //     console.log(nameA)
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


        //     nameP.append(nameSpan)
        //     nameSpan.append(nameA)
        //     postBody.append(createElementP(post.body), nameP, albumsButton, albumsbodyDiv)
        //     postCollapse.append(postBody)
        //     postH2.append(postButton)
        //     postItem.append(postH2, postCollapse)


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
        //     container.append(postItem)


// veikentis
    //     let postAccordionItem = createdivElement_AddClass(`div`, 'accordion-item')
    //     let postAccordionH2 = createdivElement_AddClass(`h2`, 'accordion-header')
    //     // postAccordionH2.setAttribute(`id`, `headingOne`)
    //     let postAccordionButton = createdivElement_AddClass(`button`, 'accordion-button collapsed')
    //     // postAccordionButton.setAttribute(`type`, "button")
    //     postAccordionButton.setAttribute(`data-bs-toggle`, `collapse`)
    //     postAccordionButton.setAttribute(`data-bs-target`, `#collapse_${post.id}`)
    //     // postAccordionButton.setAttribute(`aria-expanded`, "false")
    //     postAccordionButton.setAttribute(`aria-controls`, `collapse_${post.id}`)
    //     postAccordionButton.textContent = post.title.toUpperCase()

    //     let postAccordionCollapse = createdivElement_AddClass(`div`, 'accordion-collapse collapse')
    //     postAccordionCollapse.setAttribute(`id`, `collapse_${post.id}`)
    //     postAccordionCollapse.setAttribute(`data-bs-parent`, `#accordionExample`)
    //     // postAccordionCollapse.setAttribute(`aria-labelledby`, "headingOne")
        
    //     // postAccordionButton.setAttribute(`id`, `collapse_${post.id}`)

    //     let postAccordionBody = createdivElement_AddClass(`div`, 'accordion-body')

    //     let postBodyP = createElement(`p`, post.body)

    //     let nameP = createElement(`p`, `Name: `)
    //     let nameSpan = createElement('span')
    //     let nameA = createElement('a', `${post.user.name}`)
    //     nameA.setAttribute(`href`, `./user.html?user_id=${post.user.id}`)
    //     // nameA.setAttribute(`id`, `1`)

    //     nameSpan.append(nameA)
    //     nameP.append(nameSpan)


    //     let albumsAccordion = document.createElement(`div`)
    //     containerAccordion.setAttribute(`class`, `accordion`)




    //     albumsAccordion.append()


    //     postAccordionBody.append(postBodyP, nameP, albumsAccordion)
    //     postAccordionCollapse.append(postAccordionBody)
    //     postAccordionH2.append(postAccordionButton)
    //     postAccordionItem.append(postAccordionH2,postAccordionCollapse)
    // containerAccordion.append(postAccordionItem)