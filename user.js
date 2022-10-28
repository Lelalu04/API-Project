let container = document.querySelector(`.container-user`)
// let userIds = window.parent.document.getElementById(`1`)
// console.log(userIds)
let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let userId = urlParams.get(`user_id`)


console.log(queryParams)
console.log(urlParams)
console.log(userId)
// let userId = 1

fetch(`https://jsonplaceholder.typicode.com/users/` + userId)
    .then(res => res.json())
    .then(user => {
        console.log(user)

        let idP = createElement(`p`, `ID: ${user.id}`)
        let nameP = createElement(`p`, `Name: ${user.name}`)
        let usernameP = createElement(`p`, `User Name: ${user.username}`)

        let emailP = createElement(`p`, `Email: `)
        let emailSpan = createElement(`span`)
        let emailA = createElement(`a`, `${user.email}`)
        emailA.setAttribute(`href`, `mailto:${user.email}`)

        let addressP = createElement(`p`, `Address: `)
        let spanAddress = createElement(`span`)
        let addressA = createElement(`a`, `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}.`)
        addressA.setAttribute(`href`, `https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`)

        let phoneP = createElement(`p`, `Phone: `)
        let spanPhone = createElement(`span`)
        let phoneA = createElement(`a`, `${user.phone}`)
        phoneA.setAttribute(`href`, `tel:${user.phone}`)

        let websiteP = createElement(`p`, `Website: `)
        let websiteSpan = createElement(`span`)
        let websiteA = createElement(`a`, `${user.website}`)
        websiteA.setAttribute(`href`, `${user.email}`)

        let companyP = createElement(`p`, `Company:`)
        let companyUl = createElement(`ul`)
        let companyName = createElement(`li`, `Name: ${user.company.name}`)
        let companyCatchPhrase = createElement(`li`, `Catch phrase: ${user.company.catchPhrase}`)
        let companyBs = createElement(`li`, `BS: ${user.company.bs}`)

        let albumsbutton = createElement(`button`, `Albums:`)
        let albumsbodyDiv = createElement(`div`)
        // let bodyP = createElement(`h4`, post.body)
        albumsbutton.addEventListener(`click`, () => {
            fetch(`https://jsonplaceholder.typicode.com/users/` + userId + `/albums`)
            .then(res => res.json())
            .then(albums => {
                console.log(albums)
                albums.map(album => {
                    
                    let albumsItemDiv = createElement(`div`)
                    
                    albumsItemDiv.setAttribute(`classList`, `comment-item`)
                    let albumsTitleH5 = createElement(`h5`, `${album.id}. ${album.title}.`)
                    
                    albumsItemDiv.append(albumsTitleH5)
                    albumsbodyDiv.append(albumsTitleH5)
                })
                

                })

        })


        emailP.append(emailSpan)
        emailSpan.append(emailA)

        addressP.append(spanAddress)
        spanAddress.append(addressA)

        phoneP.append(spanPhone)
        spanPhone.append(phoneA)

        websiteP.append(websiteSpan)
        websiteSpan.append(websiteA)

        companyUl.append(companyName, companyCatchPhrase, companyBs)
        container.append(idP, nameP, usernameP, emailP, addressP, phoneP, websiteP, companyP, companyUl, albumsbutton,albumsbodyDiv)

        fetch(`https://jsonplaceholder.typicode.com/users/` + userId + `/posts`)
            .then(res => res.json())
            .then(posts => {
                posts.map(post => {
                    console.log(post)

                    let postItem = createdivAccordionItem()

                    let postH2 = createdivAccordionHeader('h2')

                    let postButton = createdAccordionButton()
                    postButton.textContent = post.title.toUpperCase()

                    let postCollapse = createdAccordionCollapse()

                    hite_showAccordionCollapse(postButton, postCollapse)

                    let postBody = createdAccordionBody()

                    let bodyP = createElement(`p`, post.body)
                   


                    let commentsButton = createElement(`button`, `Coments:`)
                    commentsButton.setAttribute(`id`, `${post.id}`)
                    commentsButton.addEventListener(`click`, () => {

                        console.log(post.id)
                        fetch(`https://jsonplaceholder.typicode.com/posts/` + post.id + `/comments`)
                            .then(res => res.json())
                            .then(comments => {
                                console.log(comments)
                                comments.map(comment => {
                                    console.log(comment)
                                    // let bodyP = createElement(`p`, post.body)
                                    let commentItemDiv = createElement(`div`)
                                    commentItemDiv.setAttribute(`classList`, `comment-item`)

                                    let commentNameH5 = createElement(`h5`, comment.name)
                                    let commentBodyP = createElement(`p`, comment.body)
                                    let commentEmailP = createElement(`p`, `Email: `)
                                    let commentEmailSpan = createElement(`span`)
                                    let commentEmailA = createElement(`a`, comment.email)
                                    commentEmailA.setAttribute(`href`, `mailto:${comment.email}`)

                                    commentEmailSpan.append(commentEmailA)
                                    commentEmailP.append(commentEmailSpan)
                                    commentItemDiv.append(commentNameH5, commentBodyP, commentEmailP)
                                    bodyP.append(commentItemDiv)
                                })



                            })
                    })
                    bodyP.append(commentsButton)
                    postBody.append(bodyP)
                    postCollapse.append(postBody)
                    postButton.append(postH2)
                    postItem.append(postButton, postCollapse)
                    container.append(postItem)

                })
            })
    })
function createElement(createElement, text) {
    let element = document.createElement(createElement)
    element.textContent = text
    return element
}

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
function hite_showAccordionCollapse(button, element) {
    button.addEventListener(`click`, () => {
        if (element.className === "hide") {
            element.setAttribute(`class`, "show")
        } else {
            element.setAttribute(`class`, "hide")
        }
    })
}