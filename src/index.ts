const express = require("express");
const dotenv = require("dotenv");

// .env config
dotenv.config();

// create Express app
const app = express();
const port = process.env.PORT || 8000;

// define the first app route
app.get("/", (req: any, res: any) => {
     // send hello world
     res.send(
          "Wellcome to API Restful Express + TS + Nodemon + Jest + Swagger + MONGOOSE"
     );
});

app.get("/hello", (req: any, res: any) => {
     const name = req.query.name ? req.query.name : "anonimo";
     res.send(
          JSON.stringify({
               data: { message: "Hola, " + name },
          })
     );
});

app.get("/goodbye", (req: any, res: any) => {
     res.send(JSON.stringify({ data: { message: "Goodbye, world" } }));
});

// execute app and listen requests to PORT
app.listen(port, () => {
     console.log(`Express app: Running at http://localhost:${port}`);
});
