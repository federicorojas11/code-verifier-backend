const express = require("express");
const dotenv = require("dotenv");

// .env config
dotenv.config();

// create Express app
const app = express();
const port = process.env.PORT || 8000;

app.get("/goodbye", (req: any, res: any) => {
     res.send(JSON.stringify({ data: { message: "Goodbye, world" } }));
});

// execute app and listen requests to PORT
app.listen(port, () => {
     console.log(`Express app: Running at http://localhost:${port}`);
});
