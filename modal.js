import { eliminarProductoCarrito } from "./carrito.js";


const modalCarrito = document.getElementById("carrito-contenedor")

modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation();

    if(e.target.classList.contains('boton-eliminar'))
    {
        
        eliminarProductoCarrito(e.target.value);
    }
 
    
})