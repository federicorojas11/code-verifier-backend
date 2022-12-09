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

app.get("/req", (req: any, res: any) => {
     // send hello world
     res.send("Request");
});

// execute app and listen requests to PORT
app.listen(port, () => {
     console.log(`Express app: Running at http://localhost:${port}`);
});
