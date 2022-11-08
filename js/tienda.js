const listadoItems = document.getElementById("listaItems")
const botonCarrito = document.getElementById("botonCarrito")
const inputBuscador = document.getElementById("inputBuscador")
const botonBuscar = document.getElementById("botonBuscar")
const carritoNoPop = document.getElementById("CarritoNoPopUP")

let productos = []
let carrito = []

carrito = JSON.parse(localStorage.getItem("carrito")) || []

const comprarProducto = (producto) => {
    let productoExsiste = carrito.find(item => item.id === producto.id)
    if (productoExsiste !== undefined) {
        productoExsiste.precio = productoExsiste.precio + producto.precio
        productoExsiste.cantidad = productoExsiste.cantidad + 1
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const buscarProducto = (string) => {

    let productoBuscado = productos.filter(producto => producto.nombre === string);
    inputBuscador.value = ''
    renderizarTienda(productoBuscado)
}

const eliminarProducto = (nombre) => {
    carrito = carrito.filter(item => item.nombre != nombre);
    iniciarCarrito()
}

const iniciarTienda = async () => {
    const resp = await fetch('../data/data.json')
    const data = await resp.json()
    renderizarTienda (data)
    productos = data
}

iniciarTienda()

botonCarrito.addEventListener("click", () => {
    iniciarCarrito()
}) 

const limpiarCarrito = () => {
    carritoNoPop.innerHTML = "";
}

const iniciarCarrito = async() => {
    let cantidadProductos = 0
    let precioTotal = 0
    limpiarCarrito()

    if(carrito.length == 0){
        const itemCarrito = document.createElement('div')
        itemCarrito.classList.add('texto__info')
        itemCarrito.innerHTML = 'carrito vacio'
        carritoNoPop.append(itemCarrito)
        setTimeout(limpiarCarrito, 3000)
    } 
    else{
        carrito.forEach((producto) => {
            const itemCarrito = document.createElement('div')
            itemCarrito.classList.add('texto__info')
            
            itemCarrito.innerHTML = `
            <table  class="table table-responsive texto__info" style="color:white">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="texto__info">${producto.nombre}</td>
                    <td class="texto__info">${producto.cantidad}</td>
                    <td class="texto__info">${producto.precio}</td>
                    <td class="texto__info"><button id="${"btnQuitar" + producto.id}"class="btn btn-outline-light"> <i class="bi bi-trash"></i> </button></td>
                </tr>
                </tbody>
            `
            carritoNoPop.append(itemCarrito)
            let botonQuitarItemCarrito = document.getElementById("btnQuitar" + producto.id)
            
            botonQuitarItemCarrito.addEventListener("click", () => {
            

                Swal.fire({
                    title: "Genial!",
                    text: "Vas a eliminar "+producto.nombre+" del carrito!", 
                    icon: "warning",
                    confirmButtonText: "Aceptar",
                })
                eliminarProducto(producto.nombre)
            });
        })

        const botonesCarrito = document.createElement('div')
        carritoNoPop.append(botonesCarrito)
        botonesCarrito.innerHTML = 
        ` <button type="button" class="btn btn-outline-light " id="botonAceptar"> Realizar compra </button>`
        const botonAceptar = document.getElementById("botonAceptar")

        botonAceptar.addEventListener("click", (event) => {
            event.preventDefault()
            Swal.fire({
                title: "GRACIAS POR SU COMPRA",
                text: "Se ha realizado con éxito", 
                icon: "success",
                confirmButtonText: "Aceptar",

            })
            localStorage.clear()
            
            carrito = [] 
            limpiarCarrito()
        })
        

    }
}
let renderizarTienda = (productos) =>{
    listadoItems.innerHTML= ""
    productos.forEach((producto) => {

        const itemTienda = document.createElement('div')
        itemTienda.classList.add('col-lg-3', 'card', 'm-2')

        itemTienda.innerHTML = `
            <img class="card-img-top img__tienda" src="${producto.imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text"> $${producto.precio}</a>
                <button id= ${producto.id} type="button" class="btn btn-outline-dark">Comprar</button>
            </div>
            
        `
        listadoItems.append(itemTienda)

        let botonComprar = document.getElementById(producto.id)

        botonComprar.addEventListener("click", () => {

            limpiarCarrito()

            Swal.fire({
                title: "Genial!",
                text: "Has agregado "+producto.nombre+" al carrito!", 
                icon: "success",
                confirmButtonText: "Aceptar",
            })
            comprarProducto(producto)
        });
    })
}
botonBuscar.addEventListener("click", () => buscarProducto(inputBuscador.value))