import { inventarioProductos } from "./app.js";
import { guardarCarritoStorage, obtenerCarritoStorage } from "./storage.js";

let carritoCompras = [];


const validarProductoRepetido = (productoID) => {

    if (localStorage.getItem('carrito')) {
        carritoCompras = obtenerCarritoStorage();
    }

    const productoRepetido = carritoCompras.find(producto => producto.id === productoID)

    if (productoRepetido)
    {
        productoRepetido.stock++;
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `cantidad: ${productoRepetido.stock}`
        let modificacionPrecio = document.getElementById(`precio${productoRepetido.id}`)
        let precioActualizado = carritoCompras[carritoCompras.indexOf(productoRepetido)].precio * carritoCompras[carritoCompras.indexOf(productoRepetido)].stock
        modificacionPrecio.innerHTML = `${productoRepetido.nombre} ${productoRepetido.color} $${precioActualizado}`
        renderSubtotal();
    }
  
    else 
    {
        carritoIndex (productoID)
    }

    guardarCarritoStorage (carritoCompras);
}

const carritoIndex = (productoID) => {

    const contenedorCarrito = document.getElementById("carrito-contenedor")
    const renderProductosCarrito = () => {
        
        let producto = inventarioProductos.find(producto => producto.id === productoID)

            carritoCompras.push(producto)
            let div = document.createElement("div")
            div.classList.add("productoEnCarrito")
            div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
            <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
            <button id="eliminar${producto.id}" value='${producto.id}'  class="btn btn-dark boton-eliminar">
            x</button>`
            contenedorCarrito.appendChild(div)      
    
    }

    renderProductosCarrito()
    renderSubtotal() 
}

const renderSubtotal = () => {
    const contenedorSubtotal = document.getElementById("carrito-subtotal")
    let subtotal = 0;
    carritoCompras.forEach(producto => {
        subtotal = subtotal + producto.precio * producto.stock
    });
    contenedorSubtotal.innerHTML = `<h5>Subtotal: $ ${subtotal}</h5>`

    actualizarContador();
    guardarCarritoStorage (carritoCompras);
}
const actualizarContador = () =>{
    const contadorCarrito = document.getElementById("contador-carrito")
    const totalCantidad = carritoCompras.reduce((acc, producto) => acc + producto.stock, 0);
    contadorCarrito.innerHTML = totalCantidad; 
}

const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter(producto => producto.id != productoId);

    pintarCarrito(carritoActualizado);
};


const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
        <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
        <button id="eliminar${producto.id}" value='${producto.id}' class="btn btn-dark boton-eliminar">
        x</button>`
        contenedor.appendChild(div);
    })

    carritoCompras = carrito;
    renderSubtotal(); 
    console.log("pinto carrito");
    
}


export { pintarCarrito, carritoIndex, validarProductoRepetido, eliminarProductoCarrito};