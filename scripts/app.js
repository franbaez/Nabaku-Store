let carrito = []

const contenedorCarrito = document.getElementById('carrito-contenedor')
const contenedorProductos = document.getElementById("producto-contenedor")

//Obtengo los productos mediante fetch con un archivo JSON
const traerDatos = async () =>{
const respuesta = await fetch('data.json');
const data = await respuesta.json();
    
      //Imprimo en pantalla cada producto
      data.forEach(producto => {
        const div = document.createElement("div");
            div.classList.add("card")
            div.innerHTML += `<div class="card-imagen" style="width: 35rem;">
                                <img src="${producto.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-light">${producto.nombre}</h5>
                                    <p class="card-text text-light">Genero:  ${producto.genero}</p>
                                    <p class="card-text text-light">Precio:$ ${producto.precio}</p>
                                    <p class="card-text text-light">Tomo: ${producto.numTomo}</p>
    
                                    <button class="btn btn-danger" id=boton${producto.id}>Comprar</button>
                                </div>
                            </div>`
    
            contenedorProductos.appendChild(div)
            
            const boton = document.getElementById( `boton${producto.id}` )
    
            boton.addEventListener('click', ()=> {
                
                //Agrego los productos al carrito y los muestro
                const agregarProducto = (dataId) => {
                    let item = data.find((data) => data.id === dataId)
                    carrito.push(item)
                    
                    const mostrarEnCarrito = () =>{
                        contenedorCarrito.innerHTML = ""
                      
                        carrito.forEach((item)=>{
                            const div = document.createElement('div')
                            div.className = ('productoEncarrito')
                           
                             div.innerHTML = `<p>${producto.nombre}</p>
                                <p>Precio: ${producto.precio}</p> 
                                <p id="tomo${producto.id}">Tomo: ${producto.numTomo}</p>
                                <button  id=boton2${producto.id} class="boton-eliminar" >Eliminar<i class="fa-solid fa-trash-can"></i></button>`;
                    
                                contenedorCarrito.appendChild(div)
                               
                                //Boton para eliminar items del carrito
                                const boton2 = document.getElementById( `boton2${producto.id}` )

                                boton2.addEventListener('click', () =>{
                                    const eliminarItem = (dataId) =>{
                                        const item = carrito.find((data) => data.id === dataId);
                                        const indice =carrito.indexOf(item);
                                        carrito.splice(indice, 1);
                                        mostrarEnCarrito();
                                        mensajeCarrito();
                                    }
                                    eliminarItem()
                                })
                        })
                    }
                    mostrarEnCarrito()                   
                 }  
                    agregarProducto();             
                    
                    

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
traerDatos();



//Funcion que agrega los productos comprados en un nuevo array llamado "carrito"
/*const agregarProducto = (productoId) => {
    let item = data.find((producto) => producto.id === productoId)
    carrito.push(item)
    mostrarEnCarrito()
    
}*/
//Funcion que elimina los items del carrito que el usuario desee
/*const eliminarItem = (dataId) => {
    const item = carrito.find((data) => data.id === dataId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    mostrarEnCarrito()
    mensajeCarrito()
}




//Recorremos el array "carrito" y generamos los elementos HTML necesarios para mostrar los items que se agregaron al carrito
/*const mostrarEnCarrito = () =>{
    contenedorCarrito.innerHTML = ""
  
    carrito.forEach((item)=>{
        const div = document.createElement('div')
        div.className = ('productoEncarrito')
       
         div.innerHTML = `<p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p> 
            <p id="tomo${producto.id}">Tomo: ${producto.numTomo}</p>
            <button onclick = "eliminarItem(${producto.id})" class="boton-eliminar" >Eliminar<i class="fa-solid fa-trash-can"></i></button>`;

            contenedorCarrito.appendChild(div)
            
    })
}*/
