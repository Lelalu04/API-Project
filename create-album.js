import { fetchData, createElement } from "./function.js";
import { addToApiPost } from "./function_resource.js";
let select = document.getElementById(`select-name`)
let form = document.getElementById(`album-create`)
let review = document.querySelector(`.container-review`)

let users = await fetchData(`https://jsonplaceholder.typicode.com/users`)

users.map(user => {
    let option = createElement(`option`, user.name) 
    option.value = user.id
    select.append(option)
})

form.addEventListener(`submit`, async (e) => {
    e.preventDefault()
    let result = document.querySelector(`.review-result`)
    if(result){
        result.remove()
    }
    let title = e.target.elements[`input-title`].value  
    let user = e.target.elements[`select-name`]
    
    let obj = {
        link: `https://jsonplaceholder.typicode.com/posts`,
        method: `POST`,
        bodyObj: {
            title,
            userId: user.value
        }
    }

    review.append(await addToApiPost(obj, `album`))
    console.log(review)
})