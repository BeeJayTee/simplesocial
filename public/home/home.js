const postSubmitButton = document.querySelector('#postSubmitButton')



const handlePostSubmit = () => {
    const postContent = document.querySelector('#postContent').value
    fetch('/send-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                post: postContent,
                userId: localStorage.getItem('id')
            }
        )
    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            conseol.log(data)
        })
}

postSubmitButton.addEventListener('click', handlePostSubmit)