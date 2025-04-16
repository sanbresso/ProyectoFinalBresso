import {productos} from './productos.js';
import {renderizarCarrito} from './render.js';

let carrito = [];

const carritoGuardado = localStorage.getItem("carrito");
if (carritoGuardado){
    try {
         carrito = JSON.parse(carritoGuardado);
         if(!Array.isArray(carrito)){
            carrito = [];
         }   
    } catch (error){
        carrito = [];
    }
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

function vaciarCarrito(){
    carrito = [];
    renderizarCarrito();
}

export {carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito};