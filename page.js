import { fetchData, createElement } from "./function.js";

export default page


export async function page(page, pageUrl) {
    let div = createElement(`div`)
    const currentPage = Number(page)
    const total = 100;
    const limit = 25;
    const pages = Math.ceil(total / limit);
    
  
    if(currentPage === 1){
        let span = createElement(`span`, `First Page`)
        div.append(span)
    } else {
        let a = createElement(`a`, `First Page`)
        a.setAttribute(`href`, `./${pageUrl}.html?page=1`)
        div.append(a)
    }
    for (let i = 1; i <= pages; i++) {
        console.log(currentPage)
        if(currentPage === i || currentPage === 0){
            let span = createElement(`span`, i)
            div.append(span)
        } else {
            let a = createElement(`a`, i)
            a.setAttribute(`href`, `./${pageUrl}.html?page=` + i)
            div.append(a)
        }
    }
    if(currentPage === pages){
        let span = createElement(`span`, `Last Page`)
        div.append(span)
    } else {
        let a = createElement(`a`, `First Page`)
        a.setAttribute(`href`, `./${pageUrl}.html?page=${pages}`)
        div.append(a)
    }
    document.body.prepend(div)
}

