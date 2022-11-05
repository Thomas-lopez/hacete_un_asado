const listadoItems = document.getElementById("listaItems")
const botonCarrito = document.getElementById("botonCarrito")
const inputBuscador = document.getElementById("inputBuscador")
const botonBuscar = document.getElementById("botonBuscar")

let productos = []
let carrito = []

localStorage.setItem("carrito", JSON.stringify(productos));

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
}

const buscarProducto = (string) => {

    let productoBuscado = productos.find(producto => producto.nombre === string);
    inputBuscador.value = ''
}

const eliminarProducto = (nombre) => {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = carrito.filter(item => item.nombre != nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const iniciarTienda = async () => {
    const resp = await fetch('../data/data.json')
    const data = await resp.json()

    data.forEach((producto) => {

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

iniciarTienda()

botonCarrito.addEventListener("click", () => {
    
    console.log(carrito)
    
    let swal_html = ``

    // si el carrito esta vacio
    if(carrito.length == 0){
        swal_html = swal_html + `
            El carrito esta vacio.
        `

        Swal.fire({
            title: "Carrito",
            html: swal_html,        
            confirmButtonText: "OK",
        })
    }
    // si el carrito tiene data
    else {
        swal_html = swal_html + `
            <table  class="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
        `

        carrito.forEach((producto) => {

            console.log(producto.nombre)

        })


        swal_html = swal_html + `
            <tr>
                <td>1</td>
                <td>Dakota Rice</td>
                <td>Niger</td>
                <td>$36,738</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Minerva Hooper</td>
                <td>Curaçao</td>
                <td>$36,738</td>
            </tr>
        `

        swal_html = swal_html + `
            </tbody>
            </table>
        `


        Swal.fire({
            title: "Carrito",
            html: swal_html,        
            confirmButtonText: "Hacer Perdido",
        })
        .then((result) => {
            Swal.fire({
                title: "Genial!",
                text: "Le vamo a estar mandando un mail, para enviarle los productos.", 
                icon: "success",
                confirmButtonText: "Aceptar",
            })
        })
    }

    
})

botonBuscar.addEventListener("click", () => buscarProducto(inputBuscador.value))
