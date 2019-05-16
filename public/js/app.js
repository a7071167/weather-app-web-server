console.log('Client side js file is loaded')

fetch('http://localhost:3000/weather?address=minsk').then((response) => {
    response.json().then((data) => {
        // console.log(data)
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
        
        
    })
})