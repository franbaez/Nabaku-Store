const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("producto-contenedor")

    productos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML += `<div class="card-imagen" style="width: 18rem;">
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
            carritoIndex(producto.id)
            alert(`Se agrego el producto ${producto.nombre} al carrito de compras.`)
        })

    })
}


mostrarProductos(productos)