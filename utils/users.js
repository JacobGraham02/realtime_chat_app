const users = [];

// Redirect the current user to their specified chat 
function userJoin(id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
}

// Return the current user in room
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves the chat room 
function userLeave(id) {
    const index = users.findIndex(user => user.user.id = id);

    if (index !== -1) {
        return users.splice(index, 1);
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}