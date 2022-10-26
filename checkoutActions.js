import { obtenerCarritoStorage } from "./storage.js"

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('carrito')) {
        const carrito = obtenerCarritoStorage();
        pintarCarritoCheckout(carrito);
    }

})

const pintarCarritoCheckout = (carrito) => {
    const contenedor = document.getElementById('checkout-carrito');
    if (contenedor)
    {
    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<h6 id="precio${producto.id}">${producto.nombre} ${producto.color} x${producto.stock} </h6>
        <p class="cantidad-texto">$${producto.precio}</p>`
        contenedor.appendChild(div);
    })
    pintarSubtotalCheckout(carrito);
    }
}

const pintarSubtotalCheckout = (carrito) => {

    const contenedorSubtotal = document.getElementById("checkout-subtotal")
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal = subtotal + producto.precio * producto.stock
    });
    contenedorSubtotal.innerHTML = `<h5>Total: $ ${subtotal}</h5>`



}

export { pintarCarritoCheckout };