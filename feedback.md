1. `k6 run scripts/login.js` falla por el error:
```
ERRO[0000] There were problems with the specified script configuration:
        - executor default: function 'default' not found in exports
```

Se solucionó modificando `export function generateJWT` a `export default function generateJWT`.

2. `k6 run scripts/performance.js`: falle por el error:
`ERRO[0000] SyntaxError: file:///C:/............../challenge-performance-iabc/scripts/add-product.js: Unexpected token (46:26)`

Al solucionarlo luego me topé con el error `ERRO[0001] TypeError: Value is not an object: undefined`, éste último no pude solucionarlo rápidamente.

3. Falta la parte 2, punto 2.