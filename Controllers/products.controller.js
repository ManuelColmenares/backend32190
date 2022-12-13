const controller = {}
const products = []

controller.getProducts = (req, res) => { // Devuelve todos los productos.
    res.json(products)
}

controller.getProduct = (req, res) => {  // Devuelve un producto según su id. 
    const product = products.find(c => c.id === parseInt(req.params.id));
    const error = {error: 'producto no encontrado'};
    if (!product) return res.send(error);
    else res.json(product);
 }


 controller.createProduct = (req, res) => {  // Recibe y agrega un producto, y lo devulve con su id asignado

    const getId = (arr) => { 
        if (arr.length == 0) return 1;
        else return arr[arr.length -1].id + 1;
    }
    const id = getId(products);

    const product = {
        title: req.body.title,
        precio: parseInt(req.body.precio),
        thumbnail: req.body.thumbnail,
        id: id

    };
    products.push(product);
    res.json(products);
}

controller.updateProduct = (req, res,) => {  // Recibe y actualiza un producto según su id. 
    
    const product = products.find(c => c.id === parseInt(req.params.id));
    const { title, precio, thumbnail} = req.body;
    const error = {error: 'producto no encontrado'};

    if (!product) { 
        return res.json(error);
    } else {  
        if (title){
            product.title = title
        }
        if (precio){
            product.precio = precio
        }
        if (thumbnail){
            product.thumbnail = thumbnail
        }
    }
    res.json(products);

 }

 controller.deleteProduct = (req, res) => {  // Elimina un producto según su id. 
    const product = products.find(c => c.id === parseInt(req.params.id));
    const error = {error: 'producto no encontrado'};
    if (!product) return res.json(error);
    
    const index = products.indexOf(product);
    products.splice(index, 1);
    
    res.json(product);

 }

module.exports = controller