const express = require('express')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const products = []
const mensajes = []

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

    //PRODUCTOS
    socket.emit('products', products)

    socket.on('new-product', data =>{
        products.push(data)
        
        io.sockets.emit('products', products)
    })

    //CHAT
    socket.emit('messages', mensajes)

    socket.on('new-message', data => {
        mensajes.push(data)

        io.sockets.emit('messages', mensajes)
    })

})

app.get('/', (req,res) => {
    res.render("main")
})


//Start Server
const PORT = 3000

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

httpServer.on('error', error => console.log(`Se ha producido un error ${error}`))