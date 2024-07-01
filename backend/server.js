const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join', ({ name, avatar, group }) => {
        console.log(`User ${name} with avatar ${avatar} joined group ${group}`);
        socket.join(group);
        socket.userData = { name, avatar, group };
        io.to(group).emit('onlineUsers', getOnlineUsers(group));
    });

    socket.on('joinGroup', (newGroup) => {
        const { name, group: oldGroup } = socket.userData;
        console.log(`User ${name} is switching from group ${oldGroup} to group ${newGroup}`);
        socket.leave(oldGroup);
        socket.join(newGroup);
        socket.userData.group = newGroup;
        io.to(oldGroup).emit('onlineUsers', getOnlineUsers(oldGroup));
        io.to(newGroup).emit('onlineUsers', getOnlineUsers(newGroup));
    });

    socket.on('sendMessage', (message) => {
        const { name, group } = socket.userData;
        console.log(`User ${name} sent message to group ${group}: ${message.message}`);
        io.to(group).emit('message', message);
    });

    socket.on('disconnect', () => {
        const { name, group } = socket.userData;
        console.log(`User ${name} disconnected from group ${group}`);
        io.to(group).emit('onlineUsers', getOnlineUsers(group));
    });
});

const getOnlineUsers = (group) => {
    const clients = io.sockets.adapter.rooms.get(group) || new Set();
    const users = [];
    clients.forEach((socketId) => {
        const clientSocket = io.sockets.sockets.get(socketId);
        if (clientSocket) {
            users.push(clientSocket.userData);
        }
    });
    return users;
};

server.listen(5000, () => {
    console.log('listening on *:5000');
});
