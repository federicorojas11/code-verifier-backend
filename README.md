# code-verifier-backend

API Restful Express + TS + Swagger + MONGOOSE

**Dependencias npm del proyecto:**
"dependencies": {
"dotenv": "^16.0.3", // Usar variables de entorno en archivo .env para uso en la aplicación, como por ejemplo API keys

    "express": "^4.18.2" // Framework de desarrollo de backend NodeJs del proyecto
    },


    "devDependencies": {

    "@types/express": "^4.17.14", // Tipado TS de librería express

    "@types/jest": "^29.2.4", // Tipado TS de librería jest

    "@types/node": "^18.11.11", // Tipado TS de librería node

    "@typescript-eslint/eslint-plugin": "^5.46.0", // Define reglas de Typescript del proyecto

    "concurrently": "^7.6.0", // Ejecutar multiples comandos simultaneamente de la consola, con un comando

    "eslint": "^8.29.0", // Define reglas de estilo del lenguaje que usamos (js/ts)

    "eslint-config-standard-with-typescript": "^23.0.0",

    "eslint-plugin-import": "^2.26.0",

    "eslint-plugin-n": "^15.6.0",

    "eslint-plugin-promise": "^6.1.1",

    "nodemon": "^2.0.20", // Renderizar en tiempo real el proyecto escuchando al archivo index.js (localhost)

    "serve": "^14.1.2", // Usado para ejecutar y visualizar tests en el navegador

    "supertest": "^6.3.3",

    "ts-jest": "^29.0.3", // jest ts library

    "ts-node": "^10.9.1", // node ts library

    "typescript": "^4.9.4",

    "webpack": "^5.75.0", // Optimizar la compilación del proyecto unificando los archivos y reduciendo su tamaño minificando el código

    "webpack-cli": "^5.0.1",

    "webpack-node-externals": "^3.0.0",

    "webpack-shell-plugin": "^0.5.0"
    }

**Scripts ejecutables:**
"scripts": {
"test": "jest", // Ejecutar tests de la ruta ./**tests** usando jest

    "build": "npx tsc", // Compilar el proyecto en dist/index.js

    "start": "node dist/index.js", // Renderizar el archivo index.js compilado

    "dev": "concurrently \"npx tsc --watch\"  \"nodemon -q dist/index.js\"", // Escuchar los cambios del proyecto y renderizarlos en tiempo real con nodemon

    "serve:coverage": "npm run test; cd coverage/lcov-report; npx serve" // Correr tests y renderizarlos en el navegador
    },

**Variables de entorno**:
PORT=8000

_(puede cambiarse el puerto por el deseado)_
