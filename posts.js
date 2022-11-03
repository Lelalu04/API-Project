let container = document.querySelector(`.container-posts`)

fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(res => res.json())
    .then(posts => {
        console.log(posts)
        let ListH2 = createElement(`h2`, `Posts List:`)
        let ul = createElement(`ul`)
        ul.setAttribute(`class`, "list-group")
        posts.map(post => {
        
        let li = createElement(`li`)
        li.setAttribute(`class`, `list-group-item`)

        let albumAutorA = createElement('a', `${post.title}`)
        albumAutorA.setAttribute(`href`, `./post.html?post_id=${post.id}`)
        
        li.append(albumAutorA)
        ul.append(li)
        })
        container.append(ListH2,ul)
    })

    function createElement(element, text) {
        let variable = document.createElement(element)
        variable.textContent = text
        return variable
    }