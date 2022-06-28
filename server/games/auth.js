const loginHandler = (user, socket) => {
    socket.username = user.username;
};

const logoutHandler = (id) => {
    id;
};

const authEventHandler = (io, socket) => {
    socket.emit("connected", { id: socket.id });
    socket.on("login", (user) => loginHandler(user, socket));
    socket.on("disconnect", () => logoutHandler(socket.id));
};

export default authEventHandler;