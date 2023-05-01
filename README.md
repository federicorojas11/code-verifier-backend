# API Restful MVC using TS Express + Mongoose & Swagger :electric_plug: :bulb:

##### > Importar el archivo con los endpoints "Code-verifier.postman_collection.json" en postman (opcional) <

#

#### Dependencias:

    express Framework de desarrollo de backend NodeJs del proyecto
    helmet: "^6.0.1", // Añadir una capa de seguridad a las solicitudes HTTP
    mongoose: "^6.8.4" // ODM - Biblioteca para conectar con mongodb
    @types/cors: "^2.8.13", // Tipado de librería cors
    @types/jest": "^29.2.4", // Testing
    @typescript-eslint/eslint-plugin:// Reglas de Typescript
    concurrently: "^7.6.0", // Multiples comandos simultaneameos con un script de consola (ver debajo)
    nodemon: "^2.0.20", // Compilar en tiempo real el archivo index.js en localhost para desarrollo
    webpack: "^5.75.0", // Minificador
    typescript: "^4.9.4"

#### :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond: :small_blue_diamond: :small_blue_diamond: :large_orange_diamond:

#### Scripts (seteados en package.json):

    "test": "jest", # Ejecutar tests de la ruta ./**tests** usando jest
    "build": "npx tsc", # Compilar el proyecto en dist/index.js
    "start": "node dist/index.js", // Ejecutar el archivo dist/index.js
    "dev": "concurrently \"npx tsc --watch\"  \"nodemon -q dist/index.js\"", # Compilar en localhost [tiempo real]
    "serve:coverage": "npm run test; cd coverage/lcov-report; npx serve" # Correr tests y mostrar resultados en el navegador
