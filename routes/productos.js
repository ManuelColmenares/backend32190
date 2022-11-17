const fs = require('fs')
const { Router } = require('express');
const router = Router();


const products = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8')); // Obtenemos el array de productos.
//console.log(productos);
products.length + 1

router.get('/', (req, res) => { // Devuelve todos los productos.
    res.json(products)
});

 router.get('/:id', (req, res) => {  // Devuelve un producto según su id. 
    const product = products.find(c => c.id === parseInt(req.params.id));
    const error = {error: 'producto no encontrado'};
    if (!product) return res.send(error);
    else res.json(product);
 });

 router.post('/', (req, res) => {
    const product = {
        title: req.body.title,
        precio: parseInt(req.body.precio),
        thumbnail: req.body.thumbnail,
        id: products.length + 1
    };
    products.push(product);
    res.json(products);
});
 
router.delete('/:id', (req, res) => {  // Elimina un producto según su id. 
    const product = products.find(c => c.id === parseInt(req.params.id));
    const error = {error: 'producto no encontrado'};
    if (!product) return res.json(error);
    
    const index = products.indexOf(product);
    products.splice(index, 1);
    
    res.json(product);

 });

module.exports = router;