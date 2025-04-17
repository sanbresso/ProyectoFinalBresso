import {productos} from "./productos.js";
import {mostrarProductos} from "./ui.js";

const filtroMarcas = document.getElementById("filtro-marcas");
const filtroCategorias = document.getElementById("filtro-categorias");
const ordenar = document.getElementById("ordenar");

const marcas = [...new Set(productos.map(prod => prod.marca))];
const categorias = [...new Set(productos.map(prod => prod.categoria))];

function crearCheckbox(id, value, label, container){
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.value = value;
    checkbox.addEventListener("change", aplicarFiltrosYOrden);

    const etiqueta = document.createElement("label");
    etiqueta.htmlFor = id;
    etiqueta.textContent = label;

    div.appendChild(checkbox);
    div.appendChild(etiqueta);
    container.appendChild(div);
}

function aplicarFiltrosYOrden(){
    const marcasSeleccionadas = Array.from(filtroMarcas.querySelectorAll("input:checked")).map(elem => elem.value);
    const categoriasSeleccionadas = Array.from(filtroCategorias.querySelectorAll("input:checked")).map(elem => elem.value);
    const orden = ordenar.value;

    let filtrados = productos.filter(prod => {
        const okMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(prod.marca);
        const okCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(prod.categoria);
        return okMarca && okCategoria;
    });

    if (orden === "menorPrecio"){
        filtrados.sort((a,b) => a.precio - b.precio);
    }else if(orden === "mayorPrecio"){
        filtrados.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(filtrados);
}

function inicializarFiltros(){
    marcas.forEach(marca => crearCheckbox(`marca-${marca}`, marca, marca, filtroMarcas));
    categorias.forEach(cat => crearCheckbox(`cat-${cat}`, cat, cat, filtroCategorias));
    ordenar.addEventListener("change", aplicarFiltrosYOrden);
}

export{aplicarFiltrosYOrden, inicializarFiltros};