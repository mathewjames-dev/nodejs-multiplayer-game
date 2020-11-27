/***
 *
 * Back-end Route Authentication File
 *
 ***/

const AuthDatabase = require("../database/authDatabase");

class AuthenticationRouting {
    constructor(app) {
        this.app = app;
    }

    authenticationRouting() {
        this.authRegister();
        this.authLogin();
    }

    authRegister() {
        this.app.post('/auth/register', function (req, res) {
            let authDatabase = new AuthDatabase;

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
    }

    authLogin() {
        this.app.post('/auth/login', function (req, res) {
            let authDatabase = new AuthDatabase();

            // Check if the username and password match a user account.
            authDatabase.authenticateUser(req.body, function (user) {
                if (user) {
                    gameServer.game.createPlayer(req.body.socket, user)
                        .then(function (player) {
                            res.send(JSON.stringify({
                                status: 200,
                                message: "User successfully authenticated",
                                player: player,
                            }));
                        }).catch(function (err) {
                            console.log(err);
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
}

module.exports = AuthenticationRouting;