let container = document.querySelector(`.container`)

fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(res => res.json())
    .then(posts => {
        posts.map(post => {
            let div = document.createElement(`div`)
            div.setAttribute(`class`, `post-container`)
            div.style.border = `2px solid red`
            let h2 = document.createElement(`h2`)
            let p = document.createElement(`p`)
            h2.textContent = post.title.toUpperCase()
            p.textContent = post.body

            fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                .then(res => res.json())
                .then(users => {
                    let nameP = document.createElement(`p`)
                    let br = document.createElement(`br`)
                    nameP.textContent = `Name: ${users.name}`

                    fetch(`https://jsonplaceholder.typicode.com/comments/${post.userId}`)
                        .then(res => res.json())
                        .then(comments => {
                            console.log(comments)
                            let a = document.createElement(`a`)
                            let h3 = document.createElement(`h3`)
                            let commentsP = document.createElement(`p`)

                            a.setAttribute(`href`, `mailto:${comments.email}`)
                            a.textContent = comments.email
                            h3.textContent = comments.name.toUpperCase()
                            commentsP.textContent = comments.body

                            div.append(h2, p, nameP, h3, commentsP, a, br)
                            container.append(div)
                        })
                })
        })
    })