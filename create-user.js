import { fetchData, createElement } from "./function.js";
import { addToApiPost } from "./function_resource.js";
let form = document.getElementById(`user-create`)
let review = document.querySelector(`.container-review`)



form.addEventListener(`submit`, async (e) => {
    e.preventDefault()
    let result = document.querySelector(`.review-result`)
    if(result){
        result.remove()
    }
    let element = e.target.elements
    let name = element[`input-name`].value
    let username = element[`input-userName`].value
    let email = element[`input-email`].value
    let phone = element[`input-phoneNumber`].value
    let website = element[`input-website`].value
    let street = element[`input-street`].value
    let suite = element[`input-suite`].value
    let city = element[`input-city`].value
    let zipcode = element[`input-zipcode`].value
    let lat = element[`input-lat`].value
    let lng = element[`input-lng`].value
    let companyName = element[`input-companyName`].value
    let catchPhrase = element[`input-catchPhrase`].value
    let bs = element[`input-bs`].value

    console.log(name)
    
    let obj = {
        link: `https://jsonplaceholder.typicode.com/users`,
        method: `POST`,
        bodyObj: {
            name,
            username,
            email,
            phone,
            website ,
            address: {
                street ,
                suite ,
                city,
                zipcode,
                geo: {
                    lat ,
                    lng ,
                }},
            company:{
                companyName,
                catchPhrase,
                bs
            }
        }
    }

    review.append(await addToApiPost(obj, `user`))
    console.log(review)
})