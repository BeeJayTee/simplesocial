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
}

postSubmitButton.addEventListener('click', handlePostSubmit)