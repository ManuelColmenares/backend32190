const socketClient = io();

//Products

const productForm = document.getElementById("form");

productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const product = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        foto: document.getElementById("foto").value
    }
    //Enviar producto por socket
    socketClient.emit("new-product", product)
})


socketClient.on("products", async(data)=>{
    const templateTable = await fetch("./templates/tableProducts.hbs");
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);

    
    const html = template({products: data})
    document.getElementById("productsContainer").innerHTML = html
    
    
})