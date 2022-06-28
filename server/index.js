import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import authEventHandler from "./games/auth.js";
import gameEventHandler from "./games/games.js";
import "dotenv/config";

const port = process.env.PORT;
const mode = process.env.NODE_ENV;

const app = express();
const server = createServer(app);
const io = new Server(server);

if (mode === "development") {
    app.use("/", express.static("develop"));
} else {
    app.use("/", express.static("public"));
}
app.use("/assets", express.static("assets"));

const onConnection = (socket) => {
    authEventHandler(io, socket);
    gameEventHandler(io, socket);
};

io.on("connection", onConnection);

server.listen(port);
console.log(`Server is running on ${port}`);