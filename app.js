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
inventarioProductos.push(new Producto (4, "Sony Auricular", 24999, 2,"Rosa"));
inventarioProductos.push(new Producto (5, "JBL Auricular", 25999, 4,"Negro"));
inventarioProductos.push(new Producto (6, "Apple Airpods", 30999, 10,"Blanco"));


const mostrarLista = () => {
    let array = [];
    inventarioProductos.forEach(producto => array.push(producto.nombre + " " + producto.color + " $"+ producto.precio + " - " + producto.stock + " disponibles."));
    alert("Lista de precios:"+"\n"+array.join("\n"))
}

const mostrarListaArray = (arrayFiltrado) => {
    let array = [];
    arrayFiltrado.forEach(producto => array.push(producto.nombre + " " + producto.color + " $"+ producto.precio + " - " + producto.stock + " disponibles."));
    alert("Lista de productos:"+"\n"+array.join("\n"))
}

const verificarStock = (producto, cantidad) => {
    
    if (producto.stock >= cantidad)
    {
        let index = inventarioProductos.indexOf(producto);
        inventarioProductos[index].actualizarStock(cantidad);
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

const buscar = () => {
    let opcion = prompt ("¿Qué acción quieres realizar?" + "\n" + "(A)Buscar por nombre" + "\n" + "(B)Buscar por color" + "\n" + "(C)Buscar por precio", "Ej.: A");
    
    switch(opcion.toUpperCase()){
        case("A"):
            let nombre = prompt("Buscador por nombre", "Ej.: Sony Auricular");
            let arrayFiltrado = inventarioProductos.filter (producto => producto.nombre.toUpperCase() == nombre.toUpperCase());
            
            if (arrayFiltrado.length > 0)
            {
                alert ("Se encontraron " + arrayFiltrado.length + " productos con ese nombre.");
                mostrarListaArray (arrayFiltrado);
            }
            else 
            {
                alert ("No se encontró ese producto en el inventario.");  
            }
            break;
        case ("B"):
            let color = prompt("Buscador por color", "Ej.: Negro");
            let arrayFiltradoColor = inventarioProductos.filter (producto => producto.color.toUpperCase() == color.toUpperCase());
            
            if (arrayFiltradoColor.length > 0)
            {
                alert ("Se encontraron " + arrayFiltradoColor.length + " productos con ese color.");
                mostrarListaArray (arrayFiltradoColor);
            }
            else 
            {
                alert ("No se encontró ese producto en el inventario.");  
            }
            break;
        case ("C"):
            let precio = parseInt(prompt("Buscador por precio", "Ej.: 14999"));
            let arrayFiltradoPrecio = inventarioProductos.filter (producto => producto.precio == precio);
            
            if (arrayFiltradoPrecio.length > 0)
            {
                alert ("Se encontraron " + arrayFiltradoPrecio.length + " productos con ese precio.");
                mostrarListaArray (arrayFiltradoPrecio);
            }
            else 
            {
                alert ("No se encontró ese producto en el inventario.");  
            }
           break;
        default:
            alert("No es una opción.");
            break;
    }
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
            productoCantidad = parseInt(prompt ("No es un número válido ¿Cuántos querés comprar?"));
        }

        let arrayFiltrado = inventarioProductos.filter (producto => producto.nombre.toUpperCase() == productoSeleccionado.toUpperCase());

        const producto = arrayFiltrado.find(producto => producto.color.toUpperCase() === colorSeleccionado.toUpperCase());

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

    let opcion = prompt ("¿Qué acción quieres realizar?" + "\n" + "(A)Buscar un producto" + "\n" + "(B)Comprar un producto de una lista" + "\n" + "(C)Salir del simulador", "Ej.: A");
    
    switch(opcion.toUpperCase()){
        case("A"):
            alert("Buscador de productos.");
            buscar();
            break;
        case ("B"):
            alert("Inicia simulador de compra.");
            if (confirm("¿Querés ordenar la lista de productos del más barato al más caro?"))
            {
                ordenarMenorMayor();
            };
            agregarCarrito();
            break;
        case ("C"):
           return;
        default:
            alert("No es una opción.");
            break;
    }
}