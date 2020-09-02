const app = require('express')();
const fs = require('fs'); // 배포

app.use(function (request, response, next) {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const server = require('http').createServer(app); // 로컬
// const server = require('https').createServer(
//     {
//         key: fs.readFileSync('/etc/nginx/ssl/server.key'),
//         cert: fs.readFileSync('/etc/nginx/ssl/server.crt'),
//         ca: fs.readFileSync('/etc/nginx/ssl/CA.pem'),
//     },
//     app,
// ); // 배포
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

    socket.on('send video', (msg) => {
        console.log(msg);
        console.log(msg.stream);
    });

    socket.on('join room', (msg) => {
        console.log(msg);
        socket.roomId = msg.roomId;
        socket.userId = msg.userId;
        socket.join(msg.roomId);
        socketIO.to(msg.roomId).emit('receive message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
        socketIO.to(socket.roomId).emit('receive message', {
            roomId: socket.roomId,
            userId: socket.userId,
            type: 'alert',
            contents: `${socket.userId}님이 퇴장하셨습니다`,
            rgstTm: '2020/08/07',
        });
    });

    socket.on('videoTest', (msg) => {
        console.log(msg);
        socketIO.to(msg.roomId).emit('receiveTest', msg);
    });

    socket.on('messageServer', (msg) => {
        console.log(msg);
        socketIO.to(msg.roomId).emit('message', msg);
    });
});
