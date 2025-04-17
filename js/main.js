import { productos } from './productos.js';
import { vaciarCarrito, carrito } from './carrito.js';
import { inicializarFiltros, aplicarFiltrosYOrden } from './filtros.js';
import { mostrarProductos } from './ui.js';
import { inicializarBuscador } from './navbar.js';
import { renderizarCarrito } from './render.js';

document.addEventListener("DOMContentLoaded", () => {
    // Mostrar bienvenida
    const bienvenida = document.getElementById("bienvenida");
    const cerrarBienvenida = document.getElementById("cerrarBienvenida");

    bienvenida.classList.add("visible");
    document.body.classList.add("bloqueado");

    cerrarBienvenida.addEventListener("click", () => {
        bienvenida.classList.remove("visible");
        setTimeout(() => {
            bienvenida.style.display = "none";
            document.body.classList.remove("bloqueado");
        }, 800);
    });

    // Inicializar funcionalidades
    mostrarProductos(productos);
    inicializarFiltros();
    inicializarBuscador();
    renderizarCarrito();

    // Sidebar carrito: abrir y cerrar
    const cartBtn = document.getElementById('cart-btn');
    const sidebar = document.getElementById('sidebar-carrito');
    const cerrarSidebarBtn = document.getElementById('cerrar-sidebar');

    if (cartBtn && sidebar && cerrarSidebarBtn) {
        cartBtn.addEventListener('click', () => {
            sidebar.classList.remove('translate-x-full');
            sidebar.classList.add('translate-x-0');
        });

        cerrarSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('translate-x-full');
        });
    }

    // Vaciar carrito
    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);

    // Finalizar compra
    document.getElementById("btn-comprar").addEventListener("click", () => {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

        if (carritoGuardado.length === 0) {
            Swal.fire({
                title: 'Tu carrito está vacío 🛒',
                text: 'Aún no has agregado productos al carrito.',
                icon: 'info',
                confirmButtonText: 'Cerrar y continuar comprando',
                customClass: {
                    confirmButton: 'swal2-confirm bg-yellow-400 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-500'
                },
                buttonsStyling: false
            }).then(() => {
                sidebar.classList.remove("translate-x-0");
                sidebar.classList.add("translate-x-full");
            });

            return;
        }

        const contenidoResumen = document.getElementById("contenido-resumen");
        contenidoResumen.innerHTML = "";

        carritoGuardado.forEach(producto => {
            const item = document.createElement("div");
            item.className = "flex items-center gap-4 border-b pb-3";
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="w-14 h-14 object-cover rounded">
                <div class="flex-1">
                    <p class="font-medium text-gray-800 dark:text-gray-200">${producto.nombre}</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">Cantidad: ${producto.cantidad}</p>
                    <p class="text-gray-900 dark:text-white font-semibold text-sm">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>
            `;
            contenidoResumen.appendChild(item);
        });

        const total = carritoGuardado.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
        const totalFinal = document.createElement("p");
        totalFinal.className = "text-right font-bold text-gray-900 dark:text-white mt-4";
        totalFinal.textContent = `Total: $${total.toFixed(2)}`;
        contenidoResumen.appendChild(totalFinal);

        document.getElementById("modal-resumen").classList.remove("hidden");

        document.getElementById("cerrar-modal").addEventListener("click", () => {
            document.getElementById("modal-resumen").classList.add("hidden");
        });

        document.getElementById("confirmar-compra").addEventListener("click", () => {
            localStorage.removeItem("carrito");
            carrito.length = 0;
            renderizarCarrito();
            document.getElementById("modal-resumen").classList.add("hidden");
            sidebar.classList.remove("translate-x-0");
            sidebar.classList.add("translate-x-full");

            Swal.fire({
                title: '¡Gracias por tu compra!',
                text: 'Tu pedido ha sido registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2563eb'
            });
        });
    });

    // Dropdown filtros
    const btnFiltro = document.getElementById("btn-filtro");
    const dropdownFiltro = document.getElementById("dropdown-filtro");

    btnFiltro.addEventListener("click", () => {
        dropdownFiltro.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!btnFiltro.contains(e.target) && !dropdownFiltro.contains(e.target)) {
            dropdownFiltro.classList.add("hidden");
        }
    });

    const btnLimpiarFiltros = document.getElementById("btn-limpiar-filtros");
    btnLimpiarFiltros.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll('#filtro-marcas input[type="checkbox"], #filtro-categorias input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
        aplicarFiltrosYOrden();
        dropdownFiltro.classList.add("hidden");
    });

    // Dropdown ordenar
    const btnOrdenar = document.getElementById("btn-ordenar");
    const dropdownOrdenar = document.getElementById("dropdown-ordenar");

    btnOrdenar.addEventListener("click", () => {
        dropdownOrdenar.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!btnOrdenar.contains(e.target) && !dropdownOrdenar.contains(e.target)) {
            dropdownOrdenar.classList.add("hidden");
        }
    });

    document.querySelectorAll('.orden-opcion').forEach(btn => {
        btn.addEventListener('click', () => {
            let selectOrden = document.getElementById("ordenar");
    
            // Si no existe el <select>, lo creamos virtualmente
            if (!selectOrden) {
                selectOrden = document.createElement("input");
                selectOrden.type = "hidden";
                selectOrden.id = "ordenar";
                document.body.appendChild(selectOrden);
            }
    
            // Asignar valor y aplicar orden
            selectOrden.value = btn.dataset.orden;
            aplicarFiltrosYOrden();
            dropdownOrdenar.classList.add("hidden");
        });
    });
    
});
