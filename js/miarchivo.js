// Lista de productos:

const productos = [{
    id: 1,
    nombre: "Esponja anatómica | Pack x 12",
    precio: 586,
    marca: "Jaspe",
    categoria: "Esponjas"
},
{
    id: 2,
    nombre: "Trapo de Piso Algodón | Pack x 25",
    precio: 2211,
    marca: "Jaspe",
    categoria: "Trapo de Piso"
},
{
    id: 3,
    nombre: "Toallas Húmedas | 50 Unidades",
    precio: 79,
    marca: "Cottonbaby",
    categoria: "Toallas Húmedas"
},
{
    id: 4,
    nombre: "Insecticida Mata Todo | 400 cc",
    precio: 209,
    marca: "Júpiter",
    categoria: "Repelentes"
},
{
    id: 5,
    nombre: "Detergente Limon  | 1.25 ml",
    precio: 85,
    marca: "Júpiter",
    categoria: "Detergentes"
},
{
    id: 6,
    nombre: "Curitas Tradicionales (35 Unidades) | Pack x 6",
    precio: 534,
    marca: "Cottonbaby",
    categoria: "Curitas"
}
];

const contenedor = document.getElementById("catalogo");

let marcas = [];
productos.forEach(producto => {
    if (!marcas.includes(producto.marca)) {
        marcas.push(producto.marca);
    }
});

console.log(marcas);

let productosPorMarca = {};

marcas.forEach(marca => {
    productosPorMarca[marca] = productos.filter(p => p.marca === marca);
});

console.log(productosPorMarca);
