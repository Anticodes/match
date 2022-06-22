import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import authEventHandler from "./games/auth.js";
import gameEventHandler from "./games/games.js";
import 'dotenv/config';

const port = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(port);
app.use(express.static("public"));
app.use("/assets", express.static("assets"));
console.log(`Server is running on ${port}`);

const onConnection = (socket) => {
    authEventHandler(io, socket);
    gameEventHandler(io, socket);
}

io.on("connection", onConnection);