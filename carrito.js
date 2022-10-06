import { inventarioProductos } from "./app.js";
import { guardarCarritoStorage, obtenerCarritoStorage } from "./storage.js";

let carritoCompras = [];

const carritoIndex = (productoID) => {

    const contenedorCarrito = document.getElementById("carrito-contenedor")
    const renderProductosCarrito = () => {

        let producto = inventarioProductos.find(producto => producto.id == productoID)

        if (carritoCompras.indexOf(producto) == -1) {
            producto.stock = 1;
            carritoCompras.push(producto)
            let div = document.createElement("div")
            div.classList.add("productoEnCarrito")
            div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
            <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
            <button id="eliminar${producto.id}" class="btn btn-dark">
            <i class="bi bi-trash-fill"></i></button>`
            contenedorCarrito.appendChild(div)
        }
        else {
            carritoCompras[carritoCompras.indexOf(producto)].sumarStock(1)
            let modificacionPrecio = document.getElementById(`precio${producto.id}`)
            let precioActualizado = carritoCompras[carritoCompras.indexOf(producto)].precio * carritoCompras[carritoCompras.indexOf(producto)].stock
            modificacionPrecio.innerHTML = `${producto.nombre} ${producto.color} $${precioActualizado}`
            let modificacionCantidad = document.getElementById(`cantidad${producto.id}`)
            modificacionCantidad.innerHTML = `Cantidad: ${carritoCompras[carritoCompras.indexOf(producto)].stock}`
        }

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
    guardarCarritoStorage (carritoCompras);
}

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    carrito.forEach(producto => {

        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
        <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
        <button id="eliminar${producto.id}" class="btn btn-dark">
        <i class="bi bi-trash-fill"></i></button>`

        contenedor.appendChild(div);
    })

    if (localStorage.getItem('carrito'))
    {
        carritoCompras = obtenerCarritoStorage();
        console.log(carritoCompras);
    }

    renderSubtotal(); 
    
}


export { pintarCarrito, carritoIndex };