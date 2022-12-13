const express = require('express')
const app = express()
const port = process.env.PORT || 8080

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


//Start Server
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    console.log('Press Ctrl+C to quit.')
})

server.on('error', err => console.log(`Se ha producido un error ${err}`));
