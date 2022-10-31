const div = document.getElementById("div")
const listadoItems = document.getElementById("listaItems")
const boton = document.getElementById("boton")
const inputBuscador = document.getElementById("inputBuscador")
const botonInput = document.getElementById("botonInpunt")


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
    let productoBuscado = productos.find(producto => producto.nombre === string);
    console.log(productoBuscado.nombre);
    inputBuscador.value = ''
}

boton.addEventListener("click", () => console.log(carrito))

botonInput.addEventListener("click", () => buscarProducto(inputBuscador.value))

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

        const li = document.createElement('li')
        li.innerHTML = `

            <div class="card" style="width: 18rem;">
                <img class="card-img-top text-align: center" src="${post.imagen}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${post.nombre}</h5>
                        <p class="card-text"> ${post.precio}</a>
                        <button id= ${post.id}> Comprar </button>
                    </div>
            </div>
        `
        listadoItems.append(li)
        
    })
}

pedirPosts()