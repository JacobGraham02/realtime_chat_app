const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.port || 3000; 

// Set the static folder for the main index page
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'JaGra Bot';

// Run the socketio dependency when a client connects to our chat application
io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {
        // Create the specific room user by pushing a new user Object with the below 3 paremters onto an array
        const user = userJoin(socket.id, username, room);

        socket.join(user.room); 
        // Emit a message to a single client when they connect to application
        // emit sends a message only to the single client that is connected
        socket.emit('message', formatMessage(botName,'Welcome to JaGra')); 

        // Broadcast when a user connects to the application
        // broadcast.emit sends a message to every client except for the currently connected one
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    });
    // Listen for any outgoing messages with an id of chatMessage. We want this method to send a reponse back to everybody containing the chatMessage text
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        console.log(user);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
     // Runs when client disconnects and sends a message to each client that is connected to the application
     socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
