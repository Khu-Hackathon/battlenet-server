module.exports = server => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    let room = [];
    let masterId = '';

    io.on('connection', (socket) => {
        socket.on("joinMaster", (data) => {
            console.log('master joined');
            socket.join(data[0]);
            room.push(data[1]);
            masterId = socket.id;
            socket.emit("enterMaster", data[1]);
        })

        socket.on("joinGuest", (data) => {
            console.log('guest joined');
            socket.join(data[0]);
            room.push(data[1]);
            socket.emit("candidates", room);
            console.log(masterId);
            io.to(masterId).emit("enterMaster", data[1]);
        })

        socket.on("start", (data) => {
            io.to(data).emit("startTest");
        })

        socket.on("end", (data) => {
            socket.emit("endTest");
        })

        result = {};
        socket.on("collect", data => {
            result[data[0]] = data[1];
        })

        socket.emit("getResult", result);
    })

    return io;
}