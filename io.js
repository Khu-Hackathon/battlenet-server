module.exports = server => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        socket.on('hello', () => {
            console.log('hello');
        })
    })

    return io;
}