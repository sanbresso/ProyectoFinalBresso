import { productos } from './productos.js';
import { renderizarCarrito } from './render.js';

let carrito = [];

const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    try {
        carrito = JSON.parse(carritoGuardado);
        if (!Array.isArray(carrito)) {
            carrito = [];
        }
    } catch (error) {
        carrito = [];
    }
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(prod => prod.id === productoId);
    if (!producto) return; // Validación por si no se encuentra el producto

    const productoEnCarrito = carrito.find(prod => prod.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar cambios
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    const producto = carrito.find(prod => prod.id === id);
    if (producto) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
            carrito = carrito.filter(prod => prod.id !== id);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar cambios
    }
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar cambios
    renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.getElementById('cart-btn');
    const sidebar = document.getElementById('sidebar-carrito');
    const cerrarSidebarBtn = document.getElementById('cerrar-sidebar');

    cartBtn.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-full');
        sidebar.classList.add('translate-x-0');
    });

    cerrarSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('translate-x-full');
    });

    lucide.createIcons();
});

export { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito };