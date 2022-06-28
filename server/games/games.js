import matchingEventHandler from "./matching/index.js";

const gameEventHandler = (io, socket) => {
    matchingEventHandler(io, socket);
};

export default gameEventHandler;