import { obtenerCarritoStorage } from "./storage.js"

//Variables Checkout//

const checkoutFormulario = document.getElementById('checkout-form');
const checkoutNombre = document.getElementById('firstName');
const checkoutApellido = document.getElementById('lastName');
const checkoutEmail = document.getElementById('email');
const checkoutDir = document.getElementById('address');
const checkoutPais = document.getElementById('country');
const checkoutProvincia = document.getElementById('state');
const checkoutCP = document.getElementById('zip');
const $buttonMailto = document.querySelector('#trucazo')


//Funciones y métodos//

const sendEmail = async (body) => {

    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', settings);
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('carrito')) {
        const carrito = obtenerCarritoStorage();
        pintarCarritoCheckout(carrito);
    }
    if (checkoutFormulario) {
        checkoutFormulario.addEventListener('submit', (e) => {
            
            const carrito = obtenerCarritoStorage();
            
            
            e.preventDefault();

            // code fragment
            const body = {
                service_id: 'service_b8lfzma',
                template_id: 'template_1v2snr7',
                user_id: '3gclg2lklH9bUm4t9',
                template_params: {
                    'from_name': checkoutEmail.value,
                    'to_name':  checkoutNombre.value,
                    'to_lastname': checkoutApellido.value,
                    'dir': checkoutDir.value,
                    'country': checkoutPais.value,
                    'state': checkoutProvincia.value,
                    'zip': checkoutCP.value,
                    
                }
            };

            sendEmail(body);
        })
    }


})


const pintarCarritoCheckout = (carrito) => {
    const contenedor = document.getElementById('checkout-carrito');
    if (contenedor) {
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