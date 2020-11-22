const Map = require("../game/map/map");
const AuthDatabase = require("../database/authDatabase");

/***
 *
 * Back-end Route Component File
 *
 ***/
module.exports = function (app, express, __dirname, game) {
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
        let authDatabase = new AuthDatabase();

        // Check if a user already exists with that username.
        authDatabase.retrieveUser(req.body.username, function (user) {
            // If user exists return 400 error.
            if (user) {
                res.send(JSON.stringify({
                    status: 400,
                    message: "User already exists!"
                }));
            } else {
                // If a user doesn't exist we create one and return a success.
                authDatabase.createUser(req.body, function (user) {
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
        let authDatabase = new AuthDatabase();

        // Check if the username and password match a user account.
        authDatabase.authenticateUser(req.body, function (user) {
            if (user) {
                // Get all the map data required for the front end.
                var map = new Map(user.name, user.location);
                var mapData = map.getMapData();

                map.getMapSounds()
                    .then(function (sounds) {
                        mapData.sounds = sounds;
                        game.addPlayer(req.body.socket, user, mapData);

                        res.send(JSON.stringify({
                            status: 200,
                            message: "User successfully authenticated",
                            user: user,
                            mapData: mapData
                        }));
                    });
            } else {
                res.send(JSON.stringify({
                    status: 400,
                    message: "User credentials incorrect!"
                }));
            }
        })
    });
}