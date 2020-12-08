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
                    res.status(400).send("User already exists!");
                } else {
                    // If a user doesn't exist we create one and return a success.
                    authDatabase.createUser(req.body, function (user) {
                        // If a user has been created return success.
                        if (user) {
                            res.status(200).send("User successfully created!");
                        }
                    });
                }
            });
        });
    }

    authLogin() {
        this.app.post('/auth/login', (req, res) => {
            let authDatabase = new AuthDatabase();

            // Check if the username and password match a user account.
            authDatabase.authenticateUser(req.body, (user) => {
                if (user) {
                    gameServer.game.addPlayer(req.body.socket, user)
                        .then((initPackage) => {
                            res.status(200).send(JSON.stringify({
                                message: "User successfully authenticated",
                                initPackage: initPackage,
                            }));
                        }).catch(function (err) {
                            console.log(err);
                        });
                } else {
                    res.status(400).send("User credentials incorrect!");
                }
            })
        });
    }
}

module.exports = AuthenticationRouting;