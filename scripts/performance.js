import { generateJWT } from './login.js';
import { addProduct } from './add-product.js';

export const options = {
    scenarios: {
        constant_50_tps: {
            executor: 'constant-arrival-rate',
            rate: 50, // 50 TPS
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 50,
            maxVUs: 100,
        },
        constant_100_tps: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 TPS
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 100,
            maxVUs: 200,
            startTime: '1m',
        },
    },
};

export function setup() {
    const BASE_URL = 'https://dummyjson.com';
    const LOGIN_ENDPOINT = '/auth/login';
    const USERNAME = 'emilys';
    const PASSWORD = 'emilyspass';

    // Generar el token utilizando la función de login
    const token = generateJWT(BASE_URL, LOGIN_ENDPOINT, USERNAME, PASSWORD);
    return { token, BASE_URL };
}

export default function (data) {
    const { token, BASE_URL } = data;

    // Agregar un producto con el token generado
    addProduct(token, BASE_URL);
}