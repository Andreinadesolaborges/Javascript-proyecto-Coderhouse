import { obtenerCarritoStorage } from "./storage.js"

//Variables Checkout//

const checkoutFormulario = document.getElementById('checkout-form');
const checkoutNombre = document.getElementById('firstName');
const checkoutApellido = document.getElementById('lastName');
const checkoutEmail = document.getElementById('email');



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
            if (validarForm() == false) {
                return;
            }
            else {
                // code fragment
                const body = {
                    service_id: 'service_b8lfzma',
                    template_id: 'template_1v2snr7',
                    user_id: '3gclg2lklH9bUm4t9',
                    template_params: {
                        'from_name': checkoutEmail.value,
                        'to_name': checkoutNombre.value,
                        'to_lastname': checkoutApellido.value
                    }
                };
                sendEmail(body);
            }


        })
    }


})

const validarForm = () => {
    if (checkoutNombre.value.length == 0) {
        Toastify({
            text: "No has escrito un nombre.",
            duration: 3000,
            position: "center",
            style: {
                background: "linear-gradient(308deg, rgba(102, 16, 242, 1) 0%, rgba(144, 19, 254, 1) 50%)",
            },
        }).showToast();
        return false;
    }
    else if (checkoutEmail.value.length == 0) {
        Toastify({
            text: "No has escrito un email.",
            duration: 3000,
            position: "center",
            style: {
                background: "linear-gradient(308deg, rgba(102, 16, 242, 1) 0%, rgba(144, 19, 254, 1) 50%)",
            },
        }).showToast();
        return false;
    }
    else if (checkoutApellido.value.length == 0) {
        Toastify({
            text: "No has escrito un apellido.",
            duration: 3000,
            position: "center",
            style: {
                background: "linear-gradient(308deg, rgba(102, 16, 242, 1) 0%, rgba(144, 19, 254, 1) 50%)",
            },
        }).showToast();
        return false;
    }
    else if (checkoutApellido.value.length == 0) {
        Toastify({
            text: "No has escrito un apellido.",
            duration: 3000,
            position: "center",
            style: {
                background: "linear-gradient(308deg, rgba(102, 16, 242, 1) 0%, rgba(144, 19, 254, 1) 50%)",
            },
        }).showToast();
        return false;
    }
    else 
    {
        return true;
    }
}
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