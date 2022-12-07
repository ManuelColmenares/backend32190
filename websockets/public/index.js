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
    form.reset()
})


socketClient.on("products", async(data)=>{
    const templateTable = await fetch("./templates/tableProducts.hbs");
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);

    
    const html = template({products: data})
    document.getElementById("productsContainer").innerHTML = html  
})

//Chat

socketClient.on('messages', data => {
    const html = data.map(msj => {
        return `<div>
        <strong style="color:#3677f0;">${msj.author}</strong>
        <em style="color: #875A09;">[${msj.date}] : </em>
        <em style="color: #02B93E;">${msj.text}</em>
        </div>`
    })
    .join(" ")

    document.getElementById("messages").innerHTML = html
    
})


const chatForm = document.getElementById('chatForm')
    
    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = {
            author: document.getElementById("username").value,
            date: new Date(Date.now()).toLocaleString(),
            text: document.getElementById("text").value
        }

        socketClient.emit('new-message', message)
        document.getElementById('text').value=""
        
    })