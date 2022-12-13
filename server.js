const express = require('express')  
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname + '/public'))

// Routes
app.use('/api/productos',require('./routes/products.routes'));

//Start server  
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

server.on('error', error => console.log(`Se ha producido un error ${error}`))