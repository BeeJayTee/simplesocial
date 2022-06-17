// main js file


const signUpUser = () => {
    // get form values
    const email = document.querySelector('#signUpEmail').value
    const password1 = document.querySelector('#signUpPassword').value
    const password2 = document.querySelector('#signUpPassword2').value
    if (password1 === password2) {
        const password = password1
        const formData = {
            email: email,
            password: password
        }
        fetch('/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                if (data === 'email already exists') {
                    document.querySelector('#formMessage').textContent = "An account with that email already exists."
                } else {
                    localStorage.setItem('id', data)
                    location.assign('/home')
                }
            })
    } else {
        document.querySelector('#formMessage').textContent = "Passwords don't match."
        return
    }
}

document.querySelector('#signUpSubmit').addEventListener('click', signUpUser)