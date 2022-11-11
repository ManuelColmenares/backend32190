const express = require('express')  
const { promises: fs} = require('fs')

const app = express()

const PORT = 8008

app.get('/productos',  async (req, res) => {
    const showProducts = await myContenedor.getData()
    res.send(showProducts)

})
app.get('/productoRandom', async (req, res) => {
    const randomProduct =  await myContenedor.getRandomProduct()
    res.send(randomProduct)
})

class Contenedor {
    constructor (fileName){
        this.fileName = fileName
    }

   async getData() { 
        try {
            const showData = await fs.readFile(`./${this.fileName}`, 'utf-8')
            return showData
        } catch (error) {
            console.log(`Error al obtener la data: ${error}`);
        }
        
    }

    async getRandomProduct () {
        try {
            const showData = await fs.readFile(`./${this.fileName}`, 'utf-8')
            const data = JSON.parse(showData)
             const randomProduct = data.sort(() => Math.random() -0.5)
             return randomProduct[0]
        } catch (error) {
            console.log(`Error al obtener producto aleatorio ${error}`);        
        }
    }

}

const myContenedor = new Contenedor('productos.txt')


const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})

server.on('error', error => console.log(`Se ha producido un error ${error}`))