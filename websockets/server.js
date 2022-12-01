const express = require('express')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const products = [
    {
        nombre: 'Calculadora',
        precio: 1040,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-64.png"
    }
]

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

//Config handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index',
    defaultDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

//Tamplate engine
app.set('view engine', 'hbs')

app.set('views', __dirname + '/views')


//Config WebSocket
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');

    socket.emit('products', products)

    socket.on('new-product', data =>{
        products.push(data)
        
        io.sockets.emit('products', products)
    })
})

app.get('/', (req,res) => {
    res.render("main", products)
})

const PORT = 3000

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

httpServer.on('error', error => console.log(`Se ha producido un error ${error}`))