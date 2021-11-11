const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');

// Get username and its associated room via the url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true // This ignores any of the characters such as ampersand which are not the actual query strings 
});

const socket = io();

// Emit an event on the server called joinRoom, which redirects a given user to the room they specified
socket.emit('joinRoom', {username, room});

// Each time something is sent with an id of {message}, socketio will output this to the console
socket.on('message', message => {
    outputMessage(message);

    // Each time a message appears in the application, scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Event listener to listen for the submission of a message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not allow anything to submit via the default action of a form

    const msg = e.target.elements.msg.value; // Get the currently targetted element called 'msg' from the form and get the value of the element 
    
    // Emit (send) a message called chatMessage to the server 
    socket.emit('chatMessage', msg);

    // After emitting chat message to the server, clear the input box and focus on the input box element
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// Ouput the specified message to the DOM
/* Create a new html div which contains the message text of client application connection, and append this div to the container "chat-messages" as a child div element
*/
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>  ${message.time}</span></p>
    <p class="text">
        ${message.textMessage}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);

}