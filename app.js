import {carritoIndex} from "./carrito.js";
import {alert} from "./alerta.js";
//Clases y constructores//

class Producto {
    constructor(id, nombre, precio, stock, color, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = Number(precio);
        this.stock = stock;
        this.color = color;
        this.img = img;
    }
    actualizarStock(cantidad) {
        this.stock = this.stock - cantidad;
    }
    sumarStock(cantidad){
        this.stock = this.stock + cantidad;
    }
}

//Variables//
const inventarioProductos = [];
inventarioProductos.push(new Producto(1, "Sony Auricular", 19999, 5, "Negro", "img/audifonos-1.png"));
inventarioProductos.push(new Producto(2, "Sony Auricular", 30999, 3, "Blanco", "img/audifonos-2.png"));
inventarioProductos.push(new Producto(3, "Lenovo Auricular", 14999, 7, "Gris", "img/audifonos-3.png"));
inventarioProductos.push(new Producto(4, "Sony Auricular", 24999, 2, "Rosa", "img/audifonos-4.png"));
inventarioProductos.push(new Producto(5, "JBL Auricular", 25999, 4, "Negro", "img/audifonos-5.png"));
inventarioProductos.push(new Producto(6, "Apple Airpods", 30999, 10, "Blanco", "img/audifonos-6.png"));

const verificarStock = (producto, cantidad) => {

    if (producto.stock >= cantidad) {
        let index = inventarioProductos.indexOf(producto);
        inventarioProductos[index].actualizarStock(cantidad);
        return true;
    }
    else {
        return false;
    }

}

const ordenarMenorMayor = () => {
    inventarioProductos.sort((a, b) => a.precio - b.precio);
}
const ordenarMayorMenor = () => {
    inventarioProductos.sort((a, b) => b.precio - a.precio);
}

function sortMenor() {
    ordenarMenorMayor();
    actualizarListaProductos();
}

function sortMayor() {
    ordenarMayorMenor();
    actualizarListaProductos();
}

const mostrarProductos = (inventarioProductos) => {
    const contenedorProductos = document.getElementById('containerProductos')

    inventarioProductos.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('col-12')
        div.classList.add('col-md-4')
        div.classList.add('text-center')
        div.classList.add('p-3')
        div.innerHTML = `<div class="card">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="titulo">${producto.nombre} ${producto.color}</h3>
                <p class="descripcion">Descripción:  Disfruta de tu música en detalle con menos ruidos de fondo gracias a los
                auriculares.</p>
                <p class="precio">$ ${producto.precio}</p>
                <button class="btn btn-outline-dark" id=boton${producto.id}>Comprar</button>
            </div>
        </div>`
        contenedorProductos.appendChild(div)

        const boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', () => {
            carritoIndex(producto.id)
            alert(`Se agrego el producto ${producto.nombre} ${producto.color}`, 'success')
            scroll(0, 0);
            setTimeout(function () {
                // Closing the alert
                $('#alert').alert('close');
            }, 2000);
        })
    })
}

const actualizarListaProductos = () => {

    const contenedorProductos = document.querySelectorAll('#containerProductos div')

    contenedorProductos.forEach(producto => {
        producto.remove();
    })

    mostrarProductos(inventarioProductos);

}

let buscador = document.getElementById("miInput");

buscador.onkeyup = () => {
    var input, filter, section, div, h3, i;
    input = document.getElementById("miInput");
    filter = input.value.toUpperCase();
    section = document.getElementById("containerProductos");
    div = section.getElementsByTagName("div");
    var productosHallados = 0;

    for (i = 0; i < div.length; i++) {
        h3 = div[i].getElementsByTagName("h3")[0];
        if (h3) {
            var palabrasEnFiltro = filter.split(' ');
            var hallado = 0;
            for (var filtro of palabrasEnFiltro) {
                if (h3.innerHTML.toUpperCase().indexOf(filtro) > -1) {
                    hallado++;
                }
            }
            if (hallado === palabrasEnFiltro.length) {
                div[i].style.display = "";
            } else {
                div[i].style.display = "none";
            }
        }
    }
}


mostrarProductos(inventarioProductos);

export {inventarioProductos}