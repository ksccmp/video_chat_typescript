const app = require('express')();
const server = require('http').createServer(app);
const port = 4000;
const socketIO = require('socket.io')(server);

server.listen(port, () => {
    console.log('채팅 서버 실행!');
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('send message', (msg) => {
        console.log(msg);
        socketIO.to(msg.roomId).emit('receive message', msg);
    });

    socket.on('join room', (msg) => {
        console.log(msg);
        socket.roomId = msg.roomId;
        socket.userId = msg.userId;
        socket.join(msg.roomId);
        socketIO.to(msg.roomId).emit('receive message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.Id} disconnected`);
        socketIO.to(socket.roomId).emit('receive message', {
            roomId: socket.roomId,
            userId: socket.userId,
            type: 'alert',
            contents: `${socket.userId}님이 퇴장하셨습니다`,
            rgstTm: '2020/08/07',
        });
    });
});
