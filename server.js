const express = require('express')  
const { promises: fs} = require('fs')

const app = express()

const PORT = 8008

app.get('/productos',  async (req, res) => {
    const getProducts = await myContenedor.getData()
    res.send(getProducts)

})
app.get('/productoRandom', async (req, res) => {
    const getProduct =  await myContenedor.proudctRandom()
    res.send(getProduct)
})

class Contenedor {
    constructor (fileName){
        this.fileName = fileName
    }

   async getData() {  // Devuelve los pro
        let data = null
        try {
            const readData = await fs.readFile(`./${this.fileName}`, 'utf-8')
            const data = JSON.parse(readData)
            console.log(data);
            return data
        } catch (error) {
            console.log(`Error al obtener la data: ${error}`);
        }
        
    }

    async proudctRandom () {
        try {
            const readData = await fs.readFile(`./${this.fileName}`, 'utf-8')
            const data = JSON.parse(readData)
             const productRandom = data.sort(() => Math.random() -0.5)
             return productRandom[0]
        } catch (error) {
            console.log(`Error al obtener producto aleatorio ${error}`);        
        }
    }

}

const myContenedor = new Contenedor('productos.txt')
console.log(myContenedor.getData()); 

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})