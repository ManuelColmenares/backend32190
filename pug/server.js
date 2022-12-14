const express = require('express')
const { Router } = express
const app = express()

const products = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'pug')

app.get('/', (req, res) => {  
    res.render('formulario')
})


app.post('/productos', (req, res) => { // Recibe y agrega un producto al historial
    products.push(req.body)
    res.redirect('/')
})

app.get('/productos', (req, res) => {  
    res.render('historial', {products})
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

server.on('error', error => console.log(`Se ha producido un error ${error}`))