# Pruebas de Performance con K6
Este proyecto contiene scripts para realizar pruebas de performance utilizando K6, enfocados en el endpoint `https://dummyjson.com/products/add`.
A continuación, se explica cómo instalar, configurar y ejecutar las pruebas, así como interpretar los resultados.

## 🚀 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- Node.js (para la gestión de dependencias y configuración del entorno).
- K6 (herramienta principal para las pruebas de carga).
## Instalación de K6
1. Para MacOS con Homebrew:
   brew install k6
2. Para Linux usando APT:
   sudo apt update
   sudo apt install k6
3. Para Windows:
   Descarga el ejecutable desde K6 Releases (https://github.com/grafana/k6/releases) y añade la ruta a las variables de entorno.

## 📂 Estructura del Proyecto

```plaintext
├── report/                  # Carpeta para reportes generados manualmente
├── results/                 # Carpeta para guardar los resultados de las pruebas
├── scripts/                 # Scripts principales del proyecto
│   ├── login.js             # Script para generar un token JWT
│   ├── add-product.js       # Script para agregar productos al endpoint
│   ├── performance.js       # Plan de pruebas principal con escenarios de carga
├── package.json             # Archivo de configuración de Node.js
```
## 🧪Ejecución de las Pruebas
1. Generar el token JWT
   Ejecuta el script `login.js`:
   ```
   k6 run scripts/login.js
   ```
2. Ejecutar las pruebas de performance
   Ejecuta el plan de prueba definido en `performance.js`:
   ```
   k6 run scripts/performance.js
   ```
3. Exportar los resultados
   Puedes exportar los resultados de las pruebas como JSON para su posterior análisis:
   ```
   k6 run --out json=results/results.json scripts/performance.js
   ```
## 📊 Interpretación de los resultados
Los resultados generados por K6 incluyen métricas clave como:
- TPS (Transacciones por Segundo): Validar que el sistema soporte la carga esperada.
- Duración de las solicitudes: Analizar tiempos de respuesta promedio y máximos.
- Errores: Identificar el porcentaje de fallas en las solicitudes.
Ejemplo de métrica generada:
checks.........................: 53.38% ✓ 14419 out of 27007http_req_duration..............: avg=176.43ms min=151.51ms med=162.85ms max=262mshttp_req_failed................: 46.60%  ✗ 4196 out of 9003
Generar reportes
Simplificado para personas no técnicas:Crea un reporte en Word o PDF destacando:1. Resumen general de la prueba.2. Gráficos de rendimiento (TPS, tiempos de respuesta).3. Conclusiones (¿cumple con los requisitos?).

## 📄Notas finales
1. Uso de títulos únicos: Cada producto creado debe tener un título único. Esto se gestiona automáticamente en el script `add-product.js`.
2. Reintentos en caso de fallos: Si una prueba falla, asegúrate de revisar el token JWT y las configuraciones de la API.