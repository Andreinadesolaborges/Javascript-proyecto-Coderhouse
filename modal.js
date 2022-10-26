import { eliminarProductoCarrito } from "./carrito.js";
import { pintarCarritoCheckout } from "./checkoutActions.js";
import { obtenerCarritoStorage } from "./storage.js";


const modalCarrito = document.getElementById("carrito-contenedor")
const continuarCheckout = document.getElementById("btn-continuar")


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


continuarCheckout.addEventListener('click', (e) => {
    const carrito = obtenerCarritoStorage ();

    carrito.length > 0 ? checkout() : mensajeCarritoVacio();

    

})

const checkout = () => {
    window.location="checkout.html";
}

const mensajeCarritoVacio = () => {
    Toastify({
        text: "No hay productos en el carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(308deg, rgba(102, 16, 242, 1) 0%, rgba(144, 19, 254, 1) 50%)",
          },
    }).showToast();
}
