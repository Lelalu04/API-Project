import { fetchData, createElement, getUrlParams } from "./function.js";
import { addToApiPost } from "./function_resource.js";
let form = document.getElementById(`post-edit`)
let review = document.querySelector(`.container-review`)
let select = document.getElementById(`select-name`)
let titleInput = document.getElementById(`input-title`)
let bodyInput = document.getElementById(`textarea-content`)

let users = await fetchData(`https://jsonplaceholder.typicode.com/users`)

users.map(user => {
    let option = createElement(`option`, user.name) 
    option.value = user.id
    select.append(option)
})
let post = await fetchData(`https://jsonplaceholder.typicode.com/posts/` + getUrlParams(`post_id`))

titleInput.value = post.title
bodyInput.value = post.body

form.addEventListener(`submit`, async (e) => {
    e.preventDefault()
    let result = document.querySelector(`.review-result`)
    if(result){
        result.remove()
    }
    let title = e.target.elements[`input-title`].value  
    let body = e.target.elements[`textarea-content`].value  
    let user = e.target.elements[`select-name`]
    
    let obj = {
        link: `https://jsonplaceholder.typicode.com/posts/`+ post.id,
        method: `PUT`,
        bodyObj: {
            title,
            body,
            userId: user.value
        }
    }

    review.append(await addToApiPost(obj, `post`))
    console.log(review)
})