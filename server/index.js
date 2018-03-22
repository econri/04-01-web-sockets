const port = 3000;

const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//подписываемся на событие соединения нового клиента и обрабатываем поступающие сообщения
io.sockets.on('connection', socket => {
    //сообщение о новом подключении
    console.log('new connection');

    //отслеживание события закрытия сокета
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    //изначальное имя пользователя, при подключении к серверу
    socket.username = "No-name";

    //функция, прослушивающая события изменение имени пользователя
    socket.on('change_username', data => {
        socket.username = data.username;
    });

    //функция, обрабатывающая поступление сообщений
    socket.on('new_message', data => {
        io.sockets.emit('new_chat_message', { message: data.message, username: socket.username })
    })
});

server.listen(port, () => {
    console.log(`server listen on port ${port}`)
});