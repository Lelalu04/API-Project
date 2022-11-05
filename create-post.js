import { fetchData, createElement } from "./function.js";
import { addToApiPost } from "./methods.js";
let select = document.getElementById(`select-name`)
let form = document.getElementById(`post-create`)
let review = document.querySelector(`.container-review`)

let users = await fetchData(`https://jsonplaceholder.typicode.com/users`)

users.map(user => {
    let option = createElement(`option`, user.name) 
    option.value = user.id
    select.append(option)
})

form.addEventListener(`submit`, (e) => {
    e.preventDefault()
    let result = document.querySelector(`.review-result`)
    if(result){
        result.remove()
    }
    let title = e.target.elements[`input-title`].value  
    let body = e.target.elements[`textarea-content`].value  
    let user = e.target.elements[`select-name`]
    
    review.append(addToApiPost(title,body,user.value))
})