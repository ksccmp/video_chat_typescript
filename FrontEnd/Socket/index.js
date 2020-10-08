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
//         // key: fs.readFileSync('/etc/nginx/ssl/server.key'), // 사설 인증서
//         // cert: fs.readFileSync('/etc/nginx/ssl/server.crt'),
//         // ca: fs.readFileSync('/etc/nginx/ssl/CA.pem'),
//         key: fs.readFileSync('/etc/letsencrypt/live/ksccmp.iptime.org/privkey.pem'), // letsencrpyt 인증서
//         cert: fs.readFileSync('/etc/letsencrypt/live/ksccmp.iptime.org/fullchain.pem'),
//         ca: fs.readFileSync('/etc/letsencrypt/live/ksccmp.iptime.org/cert.pem'),
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

    socket.on('join room', (msg) => {
        const date = new Date();
        msg.rgstTm = date;

        console.log(msg);
        socket.roomId = msg.roomId;
        socket.userId = msg.userId;
        socket.rgstTm = date;
        socket.join(msg.roomId);
        socketIO.to(msg.roomId).emit('receive message', msg);
    });

    socket.on('disconnect', () => {
        const date = new Date();
        console.log(`${socket.id} disconnected`);
        socketIO.to(socket.roomId).emit('receive message', {
            roomId: socket.roomId,
            userId: socket.userId,
            type: 'disconnect',
            contents: `${socket.userId}님이 퇴장하셨습니다`,
            rgstTm: date,
        });

        socketIO.to(socket.userId).emit('self message', {
            roomId: socket.roomId,
            start: socket.rgstTm,
            end: date,
        });

        socketIO.to(socket.roomId).emit('receive video', {
            type: 'disconnect',
            roomId: socket.roomId,
            hostId: socket.userId,
            senderId: socket.userId,
        });
    });

    socket.on('send video', (msg) => {
        console.log(msg);
        socketIO.to(msg.roomId).emit('receive video', msg);
    });

    socket.on('join page', (msg) => {
        console.log(msg);
        socket.join(msg.userId);
    });
});
