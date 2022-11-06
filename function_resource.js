import { fetchData, createElement, createPSpanA } from "./function.js";

export async function addToApiPost(actionObj) {
    let div = createElement(`div`, "", "review-result")
let json = await action(actionObj)
console.log(json)
    

    let h3 = createElement(`h3`, json.title)
    let p = createElement(`p`, json.body)
    let user = await fetchData(`https://jsonplaceholder.typicode.com/users/` + json.userId)

    let userP = createPSpanA(`Autor: `, user.name, `./user.html?user_id=${json.userId}`)
    div.append(h3, p, userP)
    return div
}

async function action(actionObj) {
    let {link, method, title, body, userId, id} = actionObj
    let obj
    if (method === `DELETE`) {
        obj = {
            method: method,
        }
    } else {
        let bodyObj = {}
        if (method === `POST`) {
                bodyObj = {
                    title,
                    body,
                    userId,
                }
            } else if (method === `PUT`) {
                bodyObj = {
                    id: id,
                    title: title,
                    body: body,
                    userId: userId,
                }
            } else if (method === `PATCH`) {
                bodyObj = {
                    title: title,
                }
            }
            obj = {
                method: method,
                body: JSON.stringify(bodyObj) 
                ,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
        }
    }
    let res = await fetch(link, { ...obj })
    let json = await res.json()
    console.log(json)
    return json

}

// import { fetchData, createElement, createPSpanA } from "./function.js";

// export async function addToApiPost(title, body, userid) {
//     let div = createElement(`div`, "", "review-result")

//     fetch(`https://jsonplaceholder.typicode.com/posts`, {
//         method: `POST`,
//         body: JSON.stringify({
//             title: title,
//             body: body,
//             userId: userid,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//     .then( async (res) => await res.json())
//     .then( async (json) => {
//     // console.log(json)
//     let h3 = createElement(`h3`, json.title)
//     let p = createElement(`p`, json.body)
//     let user = await fetchData(`https://jsonplaceholder.typicode.com/users/` + json.userId)
//     // console.log(user)
//     let userP = createPSpanA(`Autor: `, user.name, `./user.html?user_id=${json.userId}`)
//     div.append(h3, p, userP)
//     console.log(div)
//     return div 
// });
// }