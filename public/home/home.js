const postSubmitButton = document.querySelector('#postSubmitButton')
const postTextInput = document.querySelector('#postContent')



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
            if (response.ok) {
                location.reload()
            }
        })
}

postSubmitButton.addEventListener('click', handlePostSubmit)
postTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        postTextInput.style['caret-color'] = 'transparent'
        handlePostSubmit()
    }
})