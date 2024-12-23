import http from 'k6/http';
import { check } from 'k6';

// Producto base almacenado directamente en el script
const baseProduct = {
    title: "Default Product",
    description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    sku: "RCH45Q1A",
    weight: 2,
    dimensions: {
        width: 23.17,
        height: 14.43,
        depth: 28.01,
    },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "Low Stock",
    reviews: [],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
    meta: {
        createdAt: "2024-05-23T08:56:21.618Z",
        updatedAt: "2024-05-23T08:56:21.618Z",
        barcode: "9164035109868",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    ],
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
};

// Función para agregar un producto al endpoint /products/add
export function addProduct(token, baseUrl) {
    const PRODUCTS_ENDPOINT = '/products/add';

    // Generar un título único
    const randomTitle = `Product-${Math.random().toString(36).substring(7)}`;
    const productData = { ...baseProduct, title: randomTitle };

    // Convertir el producto en un string JSON
    const payload = JSON.stringify(productData);

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const response = http.post(`${baseUrl}${PRODUCTS_ENDPOINT}`, payload, { headers });

    // Validar la respuesta del endpoint
    check(response, {
        'Respuesta válida (201)': (res) => res.status === 201,
    });

    const jsonResponse = response.json();
    check(jsonResponse, {
        'Título coincide': (res) => res.title === randomTitle,
        'Precio está presente': (res) => res.price !== undefined,
    });

    console.log(`[addProduct] Producto creado: ${jsonResponse.title}`);
}