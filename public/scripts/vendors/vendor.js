// Setting jQuery and io variables to be global so that we can use elsewhere and within other files.
global.jQuery = require('./jquery/jquery');
global.io = require('./socket.io/socket.io');
global.socket = io();