let carrito = [];
const contenedorCarrito = document.getElementById('carrito-contenedor');
const contenedorProductos = document.getElementById('producto-contenedor');

loadEvents();

function loadEvents() {
	// Obtengo los productos mediante fetch con un archivo JSON
	document.addEventListener('DOMContentLoaded', (e) => {
		fetch('data.json')
			.then((object) => object.json())
			.then((data) => mostrarProductos(data));
	});

	contenedorProductos.addEventListener('click', agregarProducto);

	contenedorCarrito.addEventListener('click', eliminarProducto);
}

function mostrarProductos(productos) {
	productos.forEach((producto) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML += `<div class="card-imagen" style="width: 35rem;">
							<img src="${producto.img}" class="card-img-top" alt="...">
							<div class="card-body">
								<h5 class="card-title text-light">${producto.nombre}</h5>
								<p class="card-text text-light">Genero:  ${producto.genero}</p>
								<p class="card-text text-light precio">Precio:$ ${producto.precio}</p>
								<p class="card-text text-light tomo">Tomo: ${producto.numTomo}</p>
								<button class="btn btn-danger agregar-carrito" id=boton${producto.id}>Comprar</button>
							</div>
		                  </div>`;

		contenedorProductos.appendChild(div);
	});
}

function agregarProducto(e) {
	if (e.target.classList.contains('agregar-carrito')) {
		const selectedProduct = e.target.parentElement.parentElement.parentElement;
		readDataProduct(selectedProduct);
		carrito.push(infoProduct(selectedProduct));
		console.log(carrito);
		
		
	const { imagen, nombre, tomo } = infoProduct(selectedProduct);
		 infoProduct(selectedProduct);



		Swal.fire({
			background: 'rgb(209, 207, 223)',
			title: 'Vamos!',
			text: 'Se agregara ' + nombre + ' al carrito.',
			imageUrl: imagen,
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: 'Portada del tomo ' + tomo + ' de ' + nombre
		});
	}
	
}

function infoProduct(item) {
	const product = {
		imagen: item.querySelector('img').src,
		nombre: item.querySelector('h5').textContent,
		precio: Number(item.querySelector('.precio').innerText.replace('Precio:$ ', '')),
		tomo: item.querySelector('.tomo').innerText,
		id: item.querySelector('button').getAttribute('id'),
		cantidad: 1,
		total: 0
	};
	

	product.total = product.precio * product.cantidad;
	 
	return product;
	
}
	
function readDataProduct(product) {
	const div = document.createElement('div');

	const { nombre, precio, tomo, id } = infoProduct(product);
	div.className = 'productoEncarrito';
	div.innerHTML = `<p>${nombre}</p>
                    <p>Precio: ${precio}</p>
                    <p id="tomo${id}">${tomo}</p>
                    <button id="eliminar${id}" class="boton-eliminar" >Eliminar<i class="fa-solid fa-trash-can"></i></button>
					`;
	contenedorCarrito.appendChild(div);
	
	
 }

 function eliminarProducto(e) {
	if (e.target.classList.contains('boton-eliminar')) {
		e.preventDefault();
		const productId = e.target.getAttribute('id');
		
		const item = carrito.find((product) => product.id === productId);
		const indice = carrito.indexOf(item);
		carrito.splice(indice, 1);
		carrito = carrito.filter(product => product.id !== productId)
        console.log(carrito);
        

	}
}	