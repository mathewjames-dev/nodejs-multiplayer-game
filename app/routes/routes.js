const Map = require("../game/map");

/***
 *
 * Back-end Route Component File
 *
 ***/
module.exports = function (app, express, __dirname, database, game) {
    // Telling the server what folder to use for the client front end / static files.
    app.use('/public', express.static(__dirname + '/public'));

    // Main homepage get route.
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });

    /*
     * Authentication Routing
     */
    app.post('/auth/register', function (req, res) {       
        // Check if a user already exists with that username.
        database.retrieveUser(req.body.username, function (user) {
            // If user exists return 400 error.
            if (user) {
                res.send(JSON.stringify({
                    status: 400,
                    message: "User already exists!"
                }));
            } else {
                // If a user doesn't exist we create one and return a success.
                database.createUser(req.body, function (user) {
                    // If a user has been created return success.
                    if (user) {
                        res.send(JSON.stringify({
                            status: 200,
                            message: "User successfully created!"
                        }));
                    }
                });
            }
        });
    });

    app.post('/auth/login', function (req, res) {
        // Check if the username and password match a user account.
        database.authenticateUser(req.body, function (user) {
            if (user) {
                let map = new Map();
                let mapData = map.getMapData(user.location);

                game.addPlayer(req.body.socket, user, mapData);

                res.send(JSON.stringify({
                    status: 200,
                    message: "User successfully authenticated",
                    user: user,
                    mapData: mapData
                }));
            } else {
                res.send(JSON.stringify({
                    status: 400,
                    message: "User credentials incorrect!"
                }));
            }
        })
    });
}