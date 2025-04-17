import { productos } from './productos.js';
import { renderizarCarrito } from './render.js';

let carrito = [];

// Cargar carrito desde localStorage
const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado) {
    try {
        const data = JSON.parse(carritoGuardado);
        if (Array.isArray(data)) {
            carrito = data;
        }
    } catch (error) {
        carrito = [];
    }
}

// Agregar producto al carrito
export function agregarAlCarrito(productoId) {
    const producto = productos.find(prod => prod.id === productoId);
    if (!producto) return;

    const productoEnCarrito = carrito.find(prod => prod.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();

    // Feedback visual con SweetAlert
    Swal.fire({
        title: 'Producto agregado 🛒',
        text: producto.nombre,
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
    });
}

// Eliminar producto (una unidad)
export function eliminarDelCarrito(id) {
    const producto = carrito.find(prod => prod.id === id);
    if (producto) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
            carrito = carrito.filter(prod => prod.id !== id);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    }
}

// Vaciar todo el carrito
export function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// Exportar estado actual
export { carrito };
