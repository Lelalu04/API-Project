import { createElement,createPSpanA, createContainerAccordion, accordionBase } from "./function.js";
let container = document.querySelector(`.container-post`)

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams)
let postId = urlParams.get(`post_id`)

fetch(`https://jsonplaceholder.typicode.com/posts/`+postId+`/?_embed=comments&_expand=user`)
.then(res => res.json())
.then(post => {
    
            let postTitle = createElement(`h2`, post.title.toUpperCase())
            let postBodyP = createElement(`p`, post.body)
            let nameP = createPSpanA(`Name: `,`${post.user.name}`,`./user.html?user_id=${post.user.id}`)
         
            container.append(postTitle,postBodyP,nameP)


            let albums_CommentsAccordion = createContainerAccordion(`comments-albums_${post.id}`)

            let albumsAccordionBody = accordionBase(albums_CommentsAccordion, `h3`, `albums_${post.id}`, `comments-albums_${post.id}`,`albums_${post.id}`,`Albums`)
            let commentsAccordionBody = accordionBase(albums_CommentsAccordion, `h3`, `comments_${post.id}`, `comments-albums_${post.id}`,`comments_${post.id}`,`Comments`)

            container.append(albums_CommentsAccordion)
            let albumsAccordion;
            albumsAccordionBody[1].addEventListener(`click`, () => {
                if(!albumsAccordion){
                    fetch(`https://jsonplaceholder.typicode.com/users/` + post.userId + `/albums?_embed=photos`)
                                .then(res => res.json())
                                .then(albums => {
                                    albumsAccordion = createContainerAccordion(`div`, `album_${post.id}`)
                
                                    albums.map((album) => {
    
                                        let albumAccordionBody = accordionBase(albumsAccordion, `h3`, `album_${post.id}`, `album_${post.id}`,`album_${post.id}`,album.title.toUpperCase())
                                        
                                        let br = createElement(`br`)
                                        let albumsA = createElement(`a`, `${album.title.toUpperCase()}.`)
                                        albumsA.setAttribute(`href`, `./album.html?user_id=${post.user.id}&user_name=${post.user.name}`)
            
                                        let albumsImg = createElement(`img`)
                                        albumsImg.setAttribute(`src`, album.photos[0].thumbnailUrl)
                                        albumsImg.setAttribute(`alt`, album.photos[0].title)
                                        
                                    // albumsSpan.append(albumsA)
                                    // albumsP.append(albumsSpan)
    
                                    albumAccordionBody[0].append(albumsA,br,albumsImg)
                                    albumsAccordionBody[0].append(albumsAccordion)
                                    })
                                })
                }
            })

            let commentsAccordion;
            commentsAccordionBody[1].addEventListener(`click`, () => {
                if(!commentsAccordion){
                    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                    .then(res => res.json())
                    .then(comments => {
                        commentsAccordion = createContainerAccordion(`comment_${post.id}`)
                        comments.map(comment => {

                            let commentAccordionBody = accordionBase(commentsAccordion, `h3`, `comment_${comment.id}`, `comment_${post.id}`,`comment_${comment.id}`,comment.name)
    
                            let commentBodyP = createElement(`p`, comment.name)
                            let commentEmailP = createPSpanA(`Email: `,comment.email,`mailto:${comment.email}`)

                            commentAccordionBody[0].append(commentBodyP,commentEmailP)
                            commentsAccordionBody[0].append(commentsAccordion)
                        })
                    })
                }
            })
        })
