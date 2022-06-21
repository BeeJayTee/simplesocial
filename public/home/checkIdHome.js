const id = localStorage.getItem('id')

if (!id) {
    location.replace('/')
}