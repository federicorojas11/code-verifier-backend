import server from "./src/server";
import { LogError, LogSuccess } from "./src/logs/logger";

const express = require("express");
const port: string | number = process.env.PORT || 8000;

// * .env
const dotenv = require("dotenv");
dotenv.config();

// * Execute SERVER
server.listen(port, () => {
     LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`);
});

server.on("error", (error) => {
     LogError(`[SERVER ERROR]: ${error}`);
});
