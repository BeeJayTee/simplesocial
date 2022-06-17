const id = localStorage.getItem('id')
console.log('poop')

if (!id) {
    console.log('poop')
    location.replace('/')
} else {
    console.log('id checks out')
}