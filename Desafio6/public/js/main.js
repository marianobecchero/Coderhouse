//const socket = io.connect();
const socket = io("http://localhost:8080"); // hacer la conexión con el servidor de socket.io

/*socket.on('productos', data => {
    



    console.log(data)
    renderProductos(data)
  })*/

/*socket.on('productos', data => {
    fetch('/api/productos', 
    {method: "GET",
    renderProductos(data)
    })
})*/

socket.on("connect", () => {

    // hacer la petición al servidor de la API
    fetch("/api/productos", {
        method: "GET",
        });
});

socket.on("message", (msg) => {
    console.log(msg);
});
  
  // Metodo para agregar mensajes
/*const addPrducto = () => {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('nuevoProducto', mensaje);

    // Limpiamos los campos de texto
    document.getElementById('title').value = ''
    document.getElementById('price').value = ''
    document.getElementById('thumbnail').value = ''
    return false
}

    // Metodo que me renderiza los mensajes en el DOM
const renderProductos = (productos) => {
    const html = productos.map((element, index) => {
        return (`
        <div>
            <strong>${index} - ${element.title}</strong>: 
            <em>${element.price}</em> 
        </div>
        `)
    }).join(' ')

    console.log(html)

    document.getElementById('productos').innerHTML = html;
}*/