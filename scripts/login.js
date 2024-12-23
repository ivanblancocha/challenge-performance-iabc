import http from 'k6/http';
import { check } from 'k6';

// Función para generar el JWT
export function generateJWT(baseUrl, loginEndpoint, username, password) {
    const loginPayload = JSON.stringify({
        username: username,
        password: password,
    });

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = http.post(`${baseUrl}${loginEndpoint}`, loginPayload, { headers });

    check(response, {
        'Login exitoso': (res) => res.status === 200,
    });

    const jsonResponse = response.json();

    if (jsonResponse.accessToken) {
        console.log(`[Login] JWT generado: ${jsonResponse.accessToken}`);
        return jsonResponse.accessToken; // Devolver el token
    } else {
        console.error('[Login] Error: No se encontró el accessToken en la respuesta');
        throw new Error('No se pudo obtener el token de autenticación');
    }
}