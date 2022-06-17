if (localStorage.getItem('id')) {
    fetch('/home', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            id: localStorage.getItem('id')
        })
    })
        .then(response => {
            location.assign('/home')
        })
} else {
    console.log('not logged in')
}