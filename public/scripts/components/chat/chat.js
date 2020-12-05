/***
 *
 * Front-end Chat Class
 *
 ***/

var chatText = document.getElementById('chat-text');
var chatInput = document.getElementById('chat-input');
var chatForm = document.getElementById('chat-form');
var typing = false;

// Function for when the chat submit has been clicked.
chatForm.onsubmit = (e) => {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Call sendMsgToServer socket function, with form text value as argument
    socket.emit('sendMsgToServer', { username: game.player.username, text: chatInput.value });
    chatInput.value = "";
}

// Add a chat block to the list view and scroll to the bottom upon successful message receive.
socket.on('broadcastMessage', (data) => {
    console.log('CLIENT: Received chat message.');
    chatText.innerHTML += '<div class="chatCell">' + data.username + ': ' + data.text + '</div>';
    chatText.scrollTop = chatText.scrollHeight;
});

// Add a global event listener for when the dom has been loaded.
document.addEventListener('DOMContentLoaded', () => {

    // Focus event listener for the chat input. Once focused we set the global typing variable to true.
    document.getElementById('chat-input').addEventListener('focus', function () {
        typing = true;
    });

    // When the user is not focused on the chat we can set the global typing variable to false.
    document.getElementById('chat-input').addEventListener('blur', function () {
        typing = false;
    });
});

// Event listener for a key up event.
document.onkeyup = (event) => {

    // User pressed the enter key.
    if (event.keyCode === 13) {

        // If the user isn't typing.
        if (!typing) {
            // Focus on the chat input.
            chatInput.focus();
        } else {
            // User did send a message, unfocus the chat input.
            chatInput.blur();
        }
    }
}
