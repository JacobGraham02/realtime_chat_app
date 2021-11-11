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

module.exports = {
    userJoin,
    getCurrentUser
}