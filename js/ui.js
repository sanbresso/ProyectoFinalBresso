import { vaciarCarrito } from './carrito.js';

function mostrarProductos(lista) {
    const catalogo = document.getElementById("catalogo");
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

export {mostrarProductos};