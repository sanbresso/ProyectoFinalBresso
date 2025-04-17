import { carrito, eliminarDelCarrito } from "./carrito.js";

function renderizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    const totalProd = document.getElementById("total");

    // Limpiar los elementos anteriores del carrito
    carritoDiv.querySelectorAll("div").forEach(div => div.remove());

    // Renderizar productos
    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}</p>`;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar Producto";
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));
        div.appendChild(botonEliminar);

        carritoDiv.insertBefore(div, totalProd);
    });

    // Calcular y mostrar el total
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalProd.textContent = `Total: $${total.toFixed(2)}`;

    // Guardar el carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar la cantidad total de productos
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    document.getElementById("total-productos").textContent = `Productos en el carrito: ${totalProductos}`;
}

export { renderizarCarrito };
