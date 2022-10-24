import { pintarCarrito } from "./carrito.js";
import { obtenerCarritoStorage } from "./storage.js"
import {mostrarProductos} from "./app.js"

document.addEventListener('DOMContentLoaded', () => {
    
    mostrarProductos();

    if (localStorage.getItem('carrito'))
    {
    const carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    console.log("cargo desde dom");
    }
    console.log("no lee");
})