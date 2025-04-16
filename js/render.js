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

export {renderizarCarrito};