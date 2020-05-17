
/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    message1.textContent = "Loading..."
    message2.textContent = ""
    
    const location = search.value

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.forecast.location
                message2.textContent = data.forecast.forecast
            }
        })
    })
})