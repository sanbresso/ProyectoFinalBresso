import {productos} from './productos.js';
import {vaciarCarrito} from './carrito.js';
import {inicializarFiltros, aplicarFiltrosYOrden} from './filtros.js';
import {mostrarProductos} from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
    inicializarFiltros();
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
});