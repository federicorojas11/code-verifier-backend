var express = require("express");
var dotenv = require("dotenv");
// .env config
dotenv.config();
// create Express app
var app = express();
var port = process.env.PORT || 8000;
// define the first app route
app.get("/", function (req, res) {
    // send hello world
    res.send("Wellcome to API Restful Express + TS + Nodemon + Jest + Swagger + MONGOOSE");
});
app.get("/hello", function (req, res) {
    var name = req.query.name ? req.query.name : "anonimo";
    res.send(JSON.stringify({
        data: { message: "Hola, " + name },
    }));
});
app.get("/goodbye", function (req, res) {
    res.send(JSON.stringify({ data: { message: "Goodbye, world" } }));
});
// execute app and listen requests to PORT
app.listen(port, function () {
    console.log("Express app: Running at http://localhost:".concat(port));
});
