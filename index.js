import { pintarCarrito } from "./carrito.js";
import { obtenerCarritoStorage } from "./storage.js"

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('carrito'))
    {
    const carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    }

})