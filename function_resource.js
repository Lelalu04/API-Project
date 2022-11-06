import { fetchData, createElement,createElementLi, createPSpanA } from "./function.js";

export async function addToApiPost(actionObj,whichElement) {
    let data = await action(actionObj)
    console.log(data)

    return await showResult(data, whichElement)
}
async function showResult(data,whichElement) {
    let div = createElement(`div`, "", "review-result")

    if(whichElement === `user`){
        let idP = createElement(`p`, `ID: ${data.id}`)
        let nameP = createElement(`p`, `Name: ${data.name}`)
        let usernameP = createElement(`p`, `User Name: ${data.username}`)
        let emailP = createPSpanA(`Email: `, `${data.email}`, `mailto:${data.email}`)
        let addressP = createPSpanA(`Address: `, `${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}.`, `https://maps.google.com/?q=${data.address.geo.lat},${data.address.geo.lng}`)
        let phoneP = createPSpanA(`Phone: `, `${data.phone}`, `tel:${data.phone}`)
        let websiteP = createPSpanA(`Website: `, `${data.website}`, `${data.website}`)
        let companyP = createElement(`p`, `Company:`)
        let ul = createElement(`ul`)
        ul.setAttribute(`class`, `list-group`)
    
        createElementLi(ul, `Name: ${data.company.companyName}`)
        createElementLi(ul, `Catch phrase: ${data.company.catchPhrase}`)
        createElementLi(ul, `BS: ${data.company.bs}`)
    
        div.append(idP, nameP, usernameP, emailP, addressP, phoneP, websiteP, companyP, ul)
    }
    else if(whichElement === `post`){
        let h3 = createElement(`h3`, data.title)
        let p = createElement(`p`, data.body)
        let user = await fetchData(`https://jsonplaceholder.typicode.com/users/` + data.userId)
    
        let userP = createPSpanA(`Autor: `, user.name, `./user.html?user_id=${data.userId}`)
        div.append(h3, p, userP)
    }
    else if(whichElement === `post`){

    }
    return div
}

async function action(actionObj) {
    let { link, method, bodyObj} = actionObj
    let obj = {
        method: method,
        body: JSON.stringify(bodyObj)
        ,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    } 
    let res = await fetch(link, { ...obj })
    let json = await res.json()
    console.log(json)
    return json
}