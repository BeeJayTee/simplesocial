const postSubmitButton = document.querySelector('#postSubmitButton')



const handlePostSubmit = () => {
    const postContent = document.querySelector('#postContent').value
    console.log(postContent)
    // fetch('/send-post', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON
    // })
}

postSubmitButton.addEventListener('click', handlePostSubmit)