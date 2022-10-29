let container = document.querySelector(`.container-users`)

fetch(`https://jsonplaceholder.typicode.com/users/?_embed=posts`)
    .then(res => res.json())
    .then(users => {
        console.log(users)
        let ListH2 = createElement(`h2`, `Users List:`)
        let ul = createElement(`ul`)
        ul.setAttribute(`class`, "list-group")
        users.map(user => {
            console.log([...user.posts].length)
        let li = createElement(`li`)
        li.setAttribute(`class`, `list-group-item`)
        let albumAutorA = createElement('a', `${user.name} (Posts: ${[...user.posts].length})`)
        albumAutorA.setAttribute(`href`, `./user.html?user_id=${user.id}`)
        // li.textContent = `${user.name} (Posts: ${[...user.posts].length})`
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