const form = document.querySelector('#github-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.target[0].value
        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
        .then(response => response.json())
        .then(response => {
            const userList = document.querySelector('#user-list')
             const repoList = document.querySelector('#repos-list')
             userList.innerHTML = ""
             repoList.innerHTML = ""

            
            response.items.map(item => {
                const li = document.createElement('li')

             const h2 = document.createElement('h2')
             h2.textContent = item.login
             h2.addEventListener('click', e => showUserInfo(item.login, e))

             const img = document.createElement('img')
             img.src = item.avatar_url

             li.append(h2, img,)
             userList.append(li)

             

            })


        })

form.reset()

    

    })

function showUserInfo(username, e){
          e.preventDefault()
          fetch(`https://api.github.com/users/${username}/repos`)
          .then(response => response.json())
          .then(response => {
                response.map(repo => {
                    const repoList = document.querySelector('#repos-list')
                    repoList.innerHTML = ""
                    const li = document.createElement('li')
                    const h1 = document.createElement('h1')
                    h1.textContent = repo.name
                    
                    li.append(h1)
                    repoList.append(li)
                })

          })

}