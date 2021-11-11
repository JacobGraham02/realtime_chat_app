const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.port || 3000; 

// Set the static folder for the main index page
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'JaGra Bot';

// Run the socketio dependency when a client connects to our chat application
io.on('connection', socket => {
    // Emit a message to a single client when they connect to application
    // emit sends a message only to the single client that is connected
    socket.emit('message', formatMessage(botName,'Welcome to JaGra')); 

    // Broadcast when a user connects to the application
    // broadcast.emit sends a message to every client except for the currently connected one
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    // Runs when client disconnects and sends a message to each client that is connected to the application
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });

    // Listen for any outgoing messages with an id of chatMessage. We want this method to send a reponse back to everybody containing the chatMessage text
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('User', msg));
    });
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
