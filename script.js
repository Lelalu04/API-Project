let container = document.querySelector(`.container`)

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

            let nameP = createElementP(`Name: ${post.user.name}`)

            postBody.append(createElementP(post.body), nameP)
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
                // commentsP.textContent = comment.body
                commentBody.append(commentP,commentA)
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