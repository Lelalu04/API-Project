import { createElement } from "./function.js";

export default cheakOrNull

function cheakOrNull(urlParams) {
    let pageCount
    if (urlParams === null) {
        pageCount = 1
    } else {
        pageCount = urlParams
    }
    
    
    createPageElements(pageCount)
}

export async function createPageElements(page) {
    let div = createElement(`div`)
    let numberInput = createElement(`input`)
    numberInput.setAttribute(`type`, `number`)

    const currentPage = Number(page)
    const total = 100;
    const limit = 25
    const pages = Math.ceil(total / limit);

    let firstPage = createPageElement({
        currentPage,
        page: 1,
        text: `First Page`,
        pageCount: 1,
        limit: numberInput.value
    })

    let backPage = createPageElement({
        currentPage,
        page: 1,
        text: `<`,
        pageCount: currentPage - 1,
        limit: numberInput.value
    })
    div.append(firstPage, backPage)

    for (let i = 1; i <= pages; i++) {
        let countPage = createPageElement({
            currentPage,
            page: i,
            text: i,
            pageCount: i,
            limit: numberInput.value
        })
        div.append(countPage)
    }
    let nextPage = createPageElement({
        currentPage,
        page: pages,
        text: `>`,
        pageCount: currentPage + 1,
        limit: numberInput.value
    })

    let lastPage = createPageElement({
        currentPage,
        page: pages,
        text: `Last Page`,
        pageCount: pages, 
        limit: numberInput.value
    })
    div.append(nextPage, lastPage)



    document.body.prepend(div, numberInput)
}
function createPageElement(data) {
    let { currentPage, page, text, pageCount, limit } = data
    let orginalUrl = document.location.origin
    console.log(orginalUrl)
    let pageUrl = document.location.pathname
    if (currentPage === page) {
        let span = createElement(`span`, text)
        return span
    } else {
        let a = createElement(`a`, text)
        a.setAttribute(`href`, `${orginalUrl}${pageUrl}?page=${pageCount}?_limit=${limit}`)
        return a
    }
}

