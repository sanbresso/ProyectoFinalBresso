import {productos} from './productos.js';
import {vaciarCarrito} from './carrito.js';
import {inicializarFiltros, aplicarFiltrosYOrden} from './filtros.js';
import {mostrarProductos} from './ui.js';
import {inicializarBuscador} from './navbar.js';

document.addEventListener("DOMContentLoaded", () => {
    const bienvenida = document.getElementById("bienvenida");
    const cerrarBienvenida = document.getElementById("cerrarBienvenida");

    bienvenida.classList.add("visible");
    document.body.classList.add("bloqueado");

    cerrarBienvenida.addEventListener("click", () => {
        bienvenida.classList.remove("visible");

        setTimeout(()=> {
            bienvenida.style.display = "none";
            document.body.classList.remove("bloqueado");
        }, 800);
    });

    mostrarProductos(productos);
    inicializarFiltros();
    inicializarBuscador();
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
});
