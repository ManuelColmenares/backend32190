const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

const products = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', handlebars.engine())

app.set('views', './views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => { // Devuelve los productos 
    res.render('formulario', {products})
})

app.post('/productos', (req, res) => { // Recibe y agrega un producto al historial
    products.push(req.body)
    res.redirect('/')
})

app.get('/productos', (req, res) => { // Devuelve los productos 
    res.render('historial', {products})
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

server.on('error', error => console.log(`Se ha producido un error ${error}`))