import { fetchData, getUrlParams } from "./function.js";
import { addToApiPost } from "./function_resource.js";
let form = document.getElementById(`user-edit`)
let review = document.querySelector(`.container-review`)

let user = await fetchData(`https://jsonplaceholder.typicode.com/users/` + getUrlParams(`user_id`))

document.getElementById(`input-name`).value = user.name
document.getElementById(`input-userName`).value = user.username
document.getElementById(`input-email`).value = user.email
document.getElementById(`input-phoneNumber`).value = user.phone
document.getElementById(`input-website`).value = user.website
document.getElementById(`input-street`).value = user.address.street
document.getElementById(`input-suite`).value = user.address.suite
document.getElementById(`input-city`).value = user.address.city
document.getElementById(`input-zipcode`).value = user.address.zipcode
document.getElementById(`input-lat`).value = user.address.geo.lat
document.getElementById(`input-lng`).value = user.address.geo.lng
document.getElementById(`input-companyName`).value = user.company.name
document.getElementById(`input-catchPhrase`).value = user.company.catchPhrase
document.getElementById(`input-bs`).value = user.company.bs


form.addEventListener(`submit`, async (e) => {
    e.preventDefault()
    let result = document.querySelector(`.review-result`)
    if (result) {
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

    let obj = {
        link: `https://jsonplaceholder.typicode.com/users/` + user.id,
        method: `PUT`,
        bodyObj: {
            name,
            username,
            email,
            phone,
            website,
            address: {
                street,
                suite,
                city,
                zipcode,
                geo: {
                    lat,
                    lng,
                }
            },
            company: {
                companyName,
                catchPhrase,
                bs
            }
        }
    }

    review.append(await addToApiPost(obj, `user`))
    console.log(review)
})