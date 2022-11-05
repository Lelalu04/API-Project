
import { fetchData, createElement, createPSpanA } from "./function.js";

export async function addToApiPost(title, body, userid) {
    let div = createElement(`div`, "", "review-result")

    let res = fetchData(`https://jsonplaceholder.typicode.com/posts`, {
        method: `POST`,
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userid,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    let json = res.json()

    let h3 = createElement(`h3`, json.title)
    let p = createElement(`p`, json.body)
    let user = await fetchData(`https://jsonplaceholder.typicode.com/users/` + json.userId)

    let userP = createPSpanA(`Autor: `, user.name, `./user.html?user_id=${json.userId}`)
    div.append(h3, p, userP)
    return div
}