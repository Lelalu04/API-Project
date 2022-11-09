import { createElement } from "./function.js";

export default cheakOrNull

function cheakOrNull(urlParams, limit) {
    let pageCount
    if (urlParams === null) {
        pageCount = 1
    } else {
        pageCount = urlParams
    }
    let div = createElement(`div`, "", `pagination-container`)
    let numberInput = createElement(`input`)
    numberInput.setAttribute(`type`, `number`)
    numberInput.setAttribute(`class`, `pagination-number`)
    numberInput.min = 10
    numberInput.value = limit
    document.body.prepend(div, numberInput)
    numberInput.addEventListener(`input`, () => {
        setTimeout(function () {
            if(numberInput.value < 10){
                numberInput.value = 10
            }
            let orginalUrl = document.location.origin
            let pageUrl = document.location.pathname
            window.location.href = `${orginalUrl}${pageUrl}?page=1&_limit=${numberInput.value}`
            createPageElements({
                page: pageCount,
                limit,
                div,
                value: numberInput.value
            })
            
        }, 2000)
    })
    createPageElements({
        page: pageCount,
        limit,
        div,
        value: numberInput.value
    })
}

export async function createPageElements(obj) {
    let { page, limit, div, value } = obj
    let pagination = document.querySelectorAll(`.pagination`)

    if (!pagination.length == 0) {
        pagination.forEach(element => {
            element.remove()
        })
    }

    const currentPage = Number(page)
    const total = 100;
    const pages = Math.ceil(total / limit);

    let firstPage = createPageElement({
        currentPage,
        page: 1,
        text: `First Page`,
        pageCount: 1,
        limit: value
    })

    let backPage = createPageElement({
        currentPage,
        page: 1,
        text: `<`,
        pageCount: currentPage - 1,
        limit: value
    })
    div.append(firstPage, backPage)

    for (let i = 1; i <= pages; i++) {
        let countPage = createPageElement({
            currentPage,
            page: i,
            text: i,
            pageCount: i,
            limit: value
        })
        div.append(countPage)
    }
    let nextPage = createPageElement({
        currentPage,
        page: pages,
        text: `>`,
        pageCount: currentPage + 1,
        limit: value
    })

    let lastPage = createPageElement({
        currentPage,
        page: pages,
        text: `Last Page`,
        pageCount: pages,
        limit: value
    })
    div.append(nextPage, lastPage)
}

function createPageElement(data) {
    let { currentPage, page, text, pageCount, limit } = data
    let orginalUrl = document.location.origin
    let pageUrl = document.location.pathname
    if (currentPage === page) {
        let span = createElement(`span`, text, `pagination`)
        return span
    } else {
        let a = createElement(`a`, text, `pagination`)
        a.setAttribute(`href`, `${orginalUrl}${pageUrl}?page=${pageCount}&_limit=${limit}`)
        return a
    }
}

