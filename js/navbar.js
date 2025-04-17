import { buscarProductos } from './productos.js';



export function inicializarBuscador() {
    const buscarInput = document.getElementById("search-navbar");
    const resultadoInput = document.getElementById("search-results");

    if (!buscarInput || !resultadoInput) return;

    buscarInput.addEventListener("input", function() {
        const query = this.value.trim();
        resultadoInput.innerHTML = "";
    
        if (query.length === 0) {
            resultadoInput.classList.add("hidden");
            return;
        }
    
        const resultados = buscarProductos(query);

        if (resultados.length === 0) {
            resultadoInput.innerHTML = `<li class = "px-4 py-2 text-sm text-gray-500 dark:text-gray-300">No se encontraron productos</li>`;
        } else {
            resultados.forEach(producto => {
                const li = document.createElement("li");
                li.textContent = producto.nombre;
                li.className = "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm text-gray-700 dark:text-white";
                resultadoInput.appendChild(li);
            });
        }

        resultadoInput.classList.remove("hidden");
    });

    document.addEventListener("click", function (input){
        if (!buscarInput.contains(input.target) && !resultadoInput.contains(input.target)){
            resultadoInput.classList.add("hidden");
        }
    });
}
