import { productos } from "./productos.js";
import { mostrarProductos } from "./ui.js";

const filtroMarcas = document.getElementById("filtro-marcas");
const filtroCategorias = document.getElementById("filtro-categorias");

const marcas = [...new Set(productos.map(prod => prod.marca.trim()))];
const categorias = [...new Set(productos.map(prod => prod.categoria.trim()))];

function crearCheckbox(id, value, label, container) {
  const div = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.value = value.trim();
  checkbox.className = "mr-2";
  checkbox.addEventListener("change", aplicarFiltrosYOrden);

  const etiqueta = document.createElement("label");
  etiqueta.htmlFor = id;
  etiqueta.textContent = label.trim();

  div.appendChild(checkbox);
  div.appendChild(etiqueta);
  container.appendChild(div);
}

function aplicarFiltrosYOrden() {
  const marcasSeleccionadas = Array.from(
    filtroMarcas.querySelectorAll("input:checked")
  ).map(elem => elem.value);

  const categoriasSeleccionadas = Array.from(
    filtroCategorias.querySelectorAll("input:checked")
  ).map(elem => elem.value);

  const ordenInput = document.getElementById("ordenar");
  const orden = ordenInput ? ordenInput.value : "default";

  let filtrados = productos.filter(prod => {
    const okMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(prod.marca.trim());
    const okCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(prod.categoria.trim());
    return okMarca && okCategoria;
  });

  if (orden === "menorPrecio") {
    filtrados.sort((a, b) => a.precio - b.precio);
  } else if (orden === "mayorPrecio") {
    filtrados.sort((a, b) => b.precio - a.precio);
  }

  mostrarProductos(filtrados);
}

function inicializarFiltros() {
  marcas.forEach(marca =>
    crearCheckbox(`marca-${marca}`, marca, marca, filtroMarcas)
  );
  categorias.forEach(cat =>
    crearCheckbox(`cat-${cat}`, cat, cat, filtroCategorias)
  );
}

export { aplicarFiltrosYOrden, inicializarFiltros };
