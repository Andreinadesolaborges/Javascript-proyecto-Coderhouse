const carritoCompras = [];

const carritoIndex = (productoID) => {
    const contenedorCarrito = document.getElementById ("carrito-contenedor")
    const contenedorSubtotal = document.getElementById("carrito-subtotal")
    console.log(contenedorSubtotal) 

    const renderProductosCarrito = ()=> {
        let producto = inventarioProductos.find(producto => producto.id == productoID)
    
        if(carritoCompras.indexOf(producto) == -1)
        {
            producto.stock = 1;
            carritoCompras.push(producto)
            let div = document.createElement("div")
            div.classList.add("productoEnCarrito")
            div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
            <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
            <button id="eliminar${producto.id}" class="btn btn-dark">
            <i class="bi bi-trash-fill"></i></button>`
            contenedorCarrito.appendChild(div)
        }
        else if (carritoCompras.indexOf(producto) > -1)
        {
           carritoCompras[carritoCompras.indexOf(producto)].sumarStock(1)

           let modificacionPrecio = document.getElementById(`precio${producto.id}`)
           let precioActualizado = carritoCompras[carritoCompras.indexOf(producto)].precio * carritoCompras[carritoCompras.indexOf(producto)].stock
           modificacionPrecio.innerHTML = `${producto.nombre} ${producto.color} $${precioActualizado}`
           let modificacionCantidad = document.getElementById(`cantidad${producto.id}`)
           modificacionCantidad.innerHTML = `Cantidad: ${carritoCompras[carritoCompras.indexOf(producto)].stock}`
        }
        
    }

    const renderSubtotal = () => {
        
       let subtotal = 0;
       carritoCompras.forEach(producto => {
       console.log (producto)
       subtotal = subtotal + producto.precio * producto.stock
       console.log (subtotal);
       });
       contenedorSubtotal.innerHTML = `<h5>Subtotal: $ ${subtotal}</h5>`
    }

    renderProductosCarrito()
    renderSubtotal()
}