import { eliminarProductoCarrito } from "./carrito.js";


const modalCarrito = document.getElementById("carrito-contenedor")

modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation();

    if(e.target.classList.contains('boton-eliminar'))
    {
        
        eliminarProductoCarrito(e.target.value);
        Toastify({
            text: "Se eliminó el producto",
            duration: 3000,
            style: {
                background: "linear-gradient(308deg, rgba(102, 16, 242, 1) 0%, rgba(144, 19, 254, 1) 50%)",
              },
        }).showToast();
    }
 
    
})


