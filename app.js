//Clases y constructores//

class Producto {
    constructor (id, nombre, precio, stock, color){
        this.id= id;
        this.nombre= nombre;
        this.precio= Number(precio);
        this.stock= stock;
        this.color = color;
    }
    actualizarStock(cantidad){
        this.stock= this.stock - cantidad;
    }
}

//Variables//
const inventarioProductos = [];
inventarioProductos.push(new Producto (1, "Sony Auricular", 19999, 5,"Negro"));
inventarioProductos.push(new Producto (2, "Sony Auricular", 30999, 3,"Blanco"));
inventarioProductos.push(new Producto (3, "Lenovo Auricular", 14999, 7,"Gris"));

const mostrarLista = () => {
    let array = [];
    inventarioProductos.forEach(producto => array.push(producto.nombre + " " + producto.color + " $"+ producto.precio + " - " + producto.stock + " disponibles."));
    alert("Lista de precios:"+"\n"+array.join("\n"))
}

const verificarStock = (producto, cantidad) => {
    
    if (producto.stock >= cantidad)
    {
        let index = inventarioProductos.indexOf(producto);
        console.log(index);
        inventarioProductos[index].actualizarStock(cantidad);
        console.log(inventarioProductos[index].stock);
        return true;
    }
    else {
    alert("No hay stock suficiente de este producto.");
        return false;
    }
    
}

const calcularEnvio = (subtotal) => {
    
    let envioGratis = 40000;
    let precioEnvio = 1200;

    if (subtotal >= envioGratis)
    {
        alert("Tenés envio gratis.");
    }
    else if (subtotal!=0){
        alert("El costo del envío es $" + precioEnvio);
        subtotal += precioEnvio;
    }

    return subtotal;
}

const ordenarMenorMayor = () => {
    inventarioProductos.sort((a,b)=> a.precio - b.precio);
}

const agregarCarrito = () => {
    let continuarComprando;
    let productoSeleccionado = "";
    let colorSeleccionado = "";
    let productoCantidad = 0;
    let subtotal = 0;

    do {
        mostrarLista ();
        productoSeleccionado = prompt ("¿Querés comprar alguno de los productos?", "Ej.: Sony Auricular");
        colorSeleccionado = prompt ("¿De qué color?", "Ej.: Negro");
        productoCantidad = parseInt(prompt("¿Cuántos querés comprar?"));

        while (Number.isNaN(productoCantidad)) {
            productoCantidad = parseInt(prompt ("¿Cuántos querés comprar?"));
        }

        let arrayFiltrado = inventarioProductos.filter (producto => producto.nombre == productoSeleccionado);

        console.log(arrayFiltrado);

        const producto = arrayFiltrado.find(producto => producto.color === colorSeleccionado);

        if (producto) { 

            let hayStock = verificarStock(producto, productoCantidad);

            if (hayStock){
                subtotal += producto.precio * productoCantidad;
                alert ("El subtotal es: $" + subtotal);
            }

        } else {
            alert('El producto no se encuentra en el catálogo.')
        }


        continuarComprando = confirm('Desea agregar otro producto?');
        
    } while (continuarComprando)

    let total = calcularEnvio(subtotal);
    if (total!=0)
    {
        alert("El total de tu compra es $" + total);
    }
}

function iniciarApp () {
    alert("Inicia simulador de compra");
    if (confirm("¿Querés ordenar la lista de productos del más barato al más caro?"))
    {
        ordenarMenorMayor()
    };
    agregarCarrito();
}