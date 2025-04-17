import { agregarAlCarrito } from './carrito.js';

function mostrarProductos(lista) {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = ""; // Limpiar catálogo antes de renderizar

    lista.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <div class="card">
                <img src="${prod.imagen}" alt="${prod.nombre}" class="card-img">
                <div class="card-body">
                    <h3 class="card-title">${prod.nombre}</h3>
                    <p class="card-price">Precio: $${prod.precio}</p>
                    <p class="card-category">Categoría: ${prod.categoria}</p>
                    <button class="btn">Agregar al carrito</button>
                </div>
            </div>
        `;

        const boton = div.querySelector(".btn");
        boton.addEventListener("click", () => {
            agregarAlCarrito(prod.id);

            // SweetAlert al agregar producto
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `"${prod.nombre}" fue agregado al carrito`,
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
        });

        catalogo.appendChild(div);
    });
}

export { mostrarProductos };
