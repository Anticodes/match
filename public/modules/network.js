class NetworkHelper {

    login(username, cb) {
        this.socket = io.connect("http://localhost:8080");
        this.socket.on("connected", (args) => {
            this.user = new User(args.id, username);
            this.socket.emit("login", this.user.toMap());
            cb();
        });
    }

    joinLobby(namespace, cb) {
        this.socket.emit(`${namespace}:joinLobby`);
        cb(this.socket);
    }

    joinRoom(namespace, room) {
        this.socket.emit(`${namespace}:joinRoom`, room);
    }

    getLobby(namespace, start, end, cb) {
        this.socket.emit(`${namespace}:getLobby`, { start, end }, cb);
    }
}