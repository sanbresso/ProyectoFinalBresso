document.addEventListener("DOMContentLoaded", () => {
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

const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado){
    carrito = JSON.parse(carritoGuardado);
    renderizarCarrito();
}

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
    const producto = carrito.find(prod => prod.id === id);
    if(producto){
        producto.cantidad--;
        if (producto.cantidad === 0){
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

    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalProd.textContent = `Total: $${total.toFixed(2)}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito(){
    carrito = [];
    renderizarCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

const filtroMarcas = document.getElementById("filtro-marcas");
const filtroCategorias = document.getElementById("filtro-categorias");
const ordenar = document.getElementById("ordenar");
const catalogo = document.getElementById("catalogo");

const marcas = [...new Set(productos.map(prod => prod.marca))];
const categorias = [...new Set(productos.map(prod => prod.categoria))];

function crearCheckbox(id, value, label, container){
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.value = value;
    checkbox.addEventListener("change", aplicarFiltrosYOrden);

    const etiqueta = document.createElement("label");
    etiqueta.htmlFor = id;
    etiqueta.textContent = label;

    div.appendChild(checkbox);
    div.appendChild(etiqueta);
    container.appendChild(div);
}

marcas.forEach(marca => crearCheckbox(`marca-${marca}`, marca, marca, filtroMarcas));
categorias.forEach(cat => crearCheckbox(`cat-${cat}`, cat, cat, filtroCategorias));
ordenar.addEventListener("change", aplicarFiltrosYOrden);

function aplicarFiltrosYOrden(){
    const marcasSeleccionadas = Array.from(filtroMarcas.querySelectorAll("input:checked")).map(elem => elem.value);
    const categoriasSeleccionadas = Array.from(filtroCategorias.querySelectorAll("input:checked")).map(elem => elem.value);
    const orden = ordenar.value;

    let filtrados = productos.filter(prod => {
        const okMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(prod.marca);
        const okCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(prod.categoria);
        return okMarca && okCategoria;
    });

    if (orden === "menorPrecio"){
        filtrados.sort((a,b) => a.precio - b.precio);
    }else if(orden === "mayorPrecio"){
        filtrados.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(filtrados);
}

function mostrarProductos(lista) {
    catalogo.innerHTML ="";
    lista.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `<h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <p>Categoría: ${prod.categoria}</p>`;

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => agregarAlCarrito(prod.id));
        div.appendChild(boton);

        catalogo.appendChild(div); 
    });
}

mostrarProductos(productos);       
}); 