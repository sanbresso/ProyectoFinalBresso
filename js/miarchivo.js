const productos = [{
    id: 1,
    nombre: "Esponja anatómica | Pack x 12",
    precio: 586,
    marca: "Jaspe",
    categoria: "Esponjas"
},
{
    id: 2,
    nombre: "Trapo de Piso Algodón | Pack x 25",
    precio: 2211,
    marca: "Jaspe",
    categoria: "Trapo de Piso"
},
{
    id: 3,
    nombre: "Toallas Húmedas | 50 Unidades",
    precio: 79,
    marca: "Cottonbaby",
    categoria: "Toallas Húmedas"
},
{
    id: 4,
    nombre: "Insecticida Mata Todo | 400 cc",
    precio: 209,
    marca: "Júpiter",
    categoria: "Repelentes"
},
{
    id: 5,
    nombre: "Detergente Limon  | 1.25 ml",
    precio: 85,
    marca: "Júpiter",
    categoria: "Detergentes"
},
{
    id: 6,
    nombre: "Curitas Tradicionales (35 Unidades) | Pack x 6",
    precio: 534,
    marca: "Cottonbaby",
    categoria: "Curitas"
}
];

let carrito = [];

function agregarAlCarrito(productoId){
    const producto = productos.find(prod => prod.id === productoId);
    const productoEnCarrito = carrito.find(prod => prod.id === productoId);

    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1});
    }

    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    const productoEnCarrito = carrito.find(prod => prod.id === id);

    if(productoEnCarrito){
        productoEnCarrito.cantidad--;

        if (productoEnCarrito.cantidad === 0){
            carrito = carrito.filter(prod => prod.id !== id);
        }
    }
    
    renderizarCarrito();
}

function renderizarCarrito(){
    const carritoDiv = document.getElementById("carrito");

    const totalProd = document.getElementById("total");
    carritoDiv.querySelectorAll("div").forEach(div => div.remove());

    carrito.forEach(producto => {
        const div = document.createElement("div");

        div.innerHTML = `<p>${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</p>`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar Producto";
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));

        div.appendChild(botonEliminar);
        carritoDiv.insertBefore(div, totalProd);
    });

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalProd.textContent = `Total: $${total.toFixed(2)}`;
}

const catalogo = document.getElementById("catalogo");

let marcas = [];
productos.forEach(producto => {
    if (!marcas.includes(producto.marca)) {
        marcas.push(producto.marca);
    }
});

console.log(marcas);

let productosPorMarca = {};

marcas.forEach(marca => {
    productosPorMarca[marca] = productos.filter(prod => prod.marca === marca);
});

console.log(productosPorMarca);

for (let marca in productosPorMarca) {
    const tituloMarca = document.createElement("h2");
    tituloMarca.textContent = marca;
    catalogo.appendChild(tituloMarca);

    const contenedorProductos = document.createElement("div");
    contenedorProductos.classList.add("contenedor-productos");

    productosPorMarca[marca].forEach(producto => {
        const contenedor = document.createElement("div");
        contenedor.classList.add("producto");

        contenedor.innerHTML = `<h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Categoría: ${producto.categoria}</p>
        `;

        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar al Carrito";
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id));
        contenedor.appendChild(botonAgregar);
        
        contenedorProductos.appendChild(contenedor);
    });

    catalogo.appendChild(contenedorProductos);
}

