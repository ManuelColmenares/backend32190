const express = require('express')
const app = express()

const products = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')


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



const PORT = 3030

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

server.on('error', error => console.log(`Se ha producido un error ${error}`))