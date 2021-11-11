const chatForm = document.getElementById("chat-form");

const socket = io();

// Each time something is sent with an id of {message}, socketio will output this to the console
socket.on('message', message => {
    outputMessage(message);
});

// Event listener to listen for the submission of a message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not allow anything to submit via the default action of a form

    const msg = e.target.elements.msg.value; // Get the currently targetted element called 'msg' from the form and get the value of the element 
    
    // Emit (send) a message called chatMessage to the server 
    socket.emit('chatMessage', msg);
});

// Ouput the specified message to the DOM
/* Create a new html div which contains the message text of client application connection, and append this div to the container "chat-messages" as a child div element
*/
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);

}