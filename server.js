const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.port || 3000; 

// Set the static folder for the main index page
app.use(express.static(path.join(__dirname, 'public')));

// Run the socketio dependency when a client connects to our chat application
io.on('connection', socket => {
    console.log("New websocket connection");
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
