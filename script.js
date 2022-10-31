let container = document.querySelector(`.container-home`)
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

            let linkToFullPost = createElement(`a`, `See Full Post`)
            linkToFullPost.setAttribute(`href`, `./post.html?post_id=${post.id}`)

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

            postAccordionBody.append(linkToFullPost,postBodyP, nameP, albums_CommentsAccordion)
            postAccordionCollapse.append(postAccordionBody)
            postAccordionButton.append()
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
                                        console.log(album)
                                        // let albumsP = createElement(`p`, `${index + 1}. `)
                                        let br = createElement(`br`)
                                        let albumsA = createElement(`a`, `${album.title.toUpperCase()}.`)
                                        albumsA.setAttribute(`href`, `./album.html?album_id=${album.id}`)
            
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
                            commentsAccordionBody.append(commentsAccordion)
                        })
                    })
                }
            })
        })
    })

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
function createElement(element, text) {
    let variable = document.createElement(element)
    variable.textContent = text
    return variable
}