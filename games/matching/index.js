const handleGame = (io, socket1, socket2) => {
    socket1.leave("matching:unlisted");
    socket2.leave("matching:unlisted");
    socket1.join(room.id);
    socket1.emit("matching:startGame", { id: room.id, username: socket2.username });
    socket2.emit("matching:startGame", { id: room.id, username: socket.username });
    const board = new Board(gridWidth, gridHeight, io, socket2.id);
    socket1.on("matching:newBoard", () => board.newBoard(socket1));
    socket2.on("matching:newBoard", () => board.newBoard(socket2));
}

const matchingEventHandler = (io, socket) => {
    socket.on("matching:joinLobby", (user) => {
        socket.join("matching:unlisted");
    })
    socket.on("matching:getLobby", async (boundaries) => {
        const people = (await io.in("matching:unlisted").fetchSockets()).filter(e => e.id != socket.id).map(e => ({ id: e.id, username: e.username })).slice(boundaries.start, boundaries.end);
        socket.emit("getLobby", people);
    })
    socket.on("matching:joinRoom", async (room) => {
        const socket2 = (await io.in(room.id).fetchSockets())[0];
        const opponentReady = socket2.rooms.has("matching:unlisted");
        if (opponentReady) {
            handleGame(io, socket, socket2);
        } else {
            socket.emit("matching:alreadyPlaying");
        }
    })
}

export default matchingEventHandler;