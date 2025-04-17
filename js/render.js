import { carrito, eliminarDelCarrito } from "./carrito.js";

function renderizarCarrito() {
    const sidebarCarrito = document.getElementById("contenido-carrito");
    const totalSidebar = document.getElementById("sidebar-total");
    const contadorCarrito = document.getElementById("contador-carrito");

    // Limpiar contenido anterior
    sidebarCarrito.innerHTML = "";

    if (carrito.length === 0) {
        sidebarCarrito.innerHTML = `<p class="text-gray-500 dark:text-gray-400">El carrito está vacío</p>`;
    } else {
        carrito.forEach(producto => {
            const item = document.createElement("div");
            item.className = "flex items-center gap-4 border-b border-gray-200 pb-4";

            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="w-14 h-14 object-cover rounded">
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${producto.nombre}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Cantidad: ${producto.cantidad}</p>
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>
            `;

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "text-red-600 text-sm hover:underline ml-2";
            botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));

            item.appendChild(botonEliminar);
            sidebarCarrito.appendChild(item);
        });
    }

    // Calcular y mostrar total
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalSidebar.textContent = `Total: $${total.toFixed(2)}`;

    // Actualizar contador visual del carrito
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    if (contadorCarrito) {
        if (totalProductos > 0) {
            contadorCarrito.textContent = totalProductos;
            contadorCarrito.classList.remove("hidden");
        } else {
            contadorCarrito.classList.add("hidden");
        }
    }

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export { renderizarCarrito };
