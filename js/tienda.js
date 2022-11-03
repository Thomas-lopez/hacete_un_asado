const listadoItems = document.getElementById("listaItems")
const boton = document.getElementById("boton")
const inputBuscador = document.getElementById("inputBuscador")
const botonBuscar = document.getElementById("botonBuscar")


let productos = []
let carrito = []

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

    console.log(string);


    let productoBuscado = productos.find(producto => producto.nombre === string);

    console.log(productoBuscado);

    console.log(productoBuscado.nombre);
    inputBuscador.value = ''
}

boton.addEventListener("click", () => console.log(carrito))
botonBuscar.addEventListener("click", () => buscarProducto(inputBuscador.value))
localStorage.setItem("carrito", JSON.stringify(productos));

/* Eliminar producto */
const eliminar = (nombre) => {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = carrito.filter(item => item.nombre != nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

boton.addEventListener("click", () => {
    Swal.fire({
        title: "Genial!",
        text: "Has agregado el producto al carrito!",
        icon: "success",
        confirmButtonText: "Aceptar",
    });
}); 

const pedirPosts = async () => {
    const resp = await fetch('../data/data.json')
    const data = await resp.json()

    data.forEach((post) => {

        console.log(post)

        const itemTienda = document.createElement('div')
        itemTienda.classList.add('col-lg-3', 'card', 'm-2')

        itemTienda.innerHTML = `
            <img class="card-img-top img__tienda" src="${post.imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${post.nombre}</h5>
                <p class="card-text"> $${post.precio}</a>
                <button id= ${post.id} type="button" class="btn btn-outline-dark">Comprar</button>
            </div>
        `
        listadoItems.append(itemTienda)
        
    })
}

pedirPosts()