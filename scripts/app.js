let carrito = []

const contenedorCarrito = document.getElementById('carrito-contenedor')

//Funcion que toma los objetos del array "productos" y los muestra en pantalla
const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("producto-contenedor")

    //Recorremos el array con un forEach y generamos los elementos HTML necesarios que tendran las Key y Value de cada objeto
    productos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML += `<div class="card-imagen" style="width: 35rem;">
                            <img src="${producto.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Genero:  ${producto.genero}</p>
                                <p class="card-text">Precio:$ ${producto.precio}</p>
                                <p class="card-text">Tomo: ${producto.numTomo}</p>

                                <button class="btn btn-danger" id=boton${producto.id}>Comprar</button>
                            </div>
                        </div>`

        contenedorProductos.appendChild(div)
        
        const boton = document.getElementById( `boton${producto.id}` )

        boton.addEventListener('click', ()=> {
            agregarProducto(producto.id)
            Swal.fire({
                background: 'rgb(209, 207, 223)',
                title: 'Vamos!',
                text: 'Se agregara ' + producto.nombre + ' al carrito.',
                imageUrl: producto.img,
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: 'Portada del tomo ' + producto.numTomo + ' de ' + producto.nombre,
              })
            
              })

            } 
        )
}
mostrarProductos(productos)

//Funcion que agrega los productos comprados en un nuevo array llamado "carrito"
const agregarProducto = (productoId) => {
    const item = productos.find((producto) => producto.id === productoId)
    carrito.push(item)
    mostrarEnCarrito()
    
}
//Funcion que elimina los items del carrito que el usuario desee
const eliminarItem = (productoId) => {
    const item = carrito.find((producto) => producto.id === productoId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    mostrarEnCarrito()
    mensajeCarrito()
}




//Recorremos el array "carrito" y generamos los elementos HTML necesarios para mostrar los items que se agregaron al carrito
const mostrarEnCarrito = () =>{
    contenedorCarrito.innerHTML = ""
  
    carrito.forEach((producto)=>{
        const div = document.createElement('div')
        div.className = ('productoEncarrito')
       
         div.innerHTML = `<p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p> 
            <p id="tomo${producto.id}">Tomo: ${producto.numTomo}</p>
            <button onclick = "eliminarItem(${producto.id})" class="boton-eliminar" >Eliminar<i class="fa-solid fa-trash-can"></i></button>`;

            contenedorCarrito.appendChild(div)
            
    })
}


    