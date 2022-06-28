import Board from "./board.js";
import { gridWidth, gridHeight } from "./constants.js";

const handleGame = (io, socket1, socket2) => {
    socket1.leave("matching:unlisted");
    socket2.leave("matching:unlisted");
    socket1.join(socket2.id);
    socket1.emit("matching:startGame", { id: socket2.id, username: socket2.username });
    socket2.emit("matching:startGame", { id: socket2.id, username: socket1.username });
    new Board(gridWidth, gridHeight, io, socket1, socket2);
};

const matchingEventHandler = (io, socket) => {
    socket.on("matching:joinLobby", () => {
        socket.join("matching:unlisted");
    });
    socket.on("matching:getLobby", async (boundaries, cb) => {
        const people = (await io.in("matching:unlisted").fetchSockets()).filter(e => e.id != socket.id).map(e => ({ id: e.id, username: e.username })).slice(boundaries.start, boundaries.end);
        cb(people);
    });
    socket.on("matching:joinRoom", async (room) => {
        const socket2 = (await io.in(room.id).fetchSockets())[0];
        const opponentReady = socket2.rooms.has("matching:unlisted");
        if (opponentReady) {
            handleGame(io, socket, socket2);
        } else {
            socket.emit("matching:alreadyPlaying");
        }
    });
};

export default matchingEventHandler;