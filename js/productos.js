export const productos = [
    {
        id: 1,
        nombre: "Esponja anatómica | Pack x 12",
        precio: 586,
        marca: "Jaspe",
        categoria: "Esponjas",
        imagen: "img/esp_anat.webp"
    },
    {
        id: 2,
        nombre: "Trapo de Piso Algodón | Pack x 25",
        precio: 2211,
        marca: "Jaspe",
        categoria: "Trapo de Piso",
        imagen: "img/trapo_algodon.webp"
    },
    {
        id: 3,
        nombre: "Toallas Húmedas | 50 Unidades",
        precio: 79,
        marca: "Cottonbaby",
        categoria: "Toallas Húmedas",
        imagen: "img/toallas_humedas.jpeg"
    },
    {
        id: 4,
        nombre: "Insecticida Mata Todo | 400 cc",
        precio: 209,
        marca: "Júpiter",
        categoria: "Repelentes",
        imagen: "img/insecticida.webp"
    },
    {
        id: 5,
        nombre: "Detergente Limón | 1.25 ml",
        precio: 85,
        marca: "Júpiter",
        categoria: "Detergentes",
        imagen: "img/detergente_limon.webp"
    },
    {
        id: 6,
        nombre: "Curitas Tradicionales (35 Unidades) | Pack x 6",
        precio: 534,
        marca: "Cottonbaby",
        categoria: "Curitas",
        imagen: "img/curitas.jpeg"
    }
];

export function buscarProductos(query) {
    return productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query.toLowerCase())
    );
}
