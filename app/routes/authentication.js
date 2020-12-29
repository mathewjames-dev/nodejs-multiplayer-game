/***
 *
 * Back-end Route Authentication File
 *
 ***/

const AuthQueries = require("../database/authQueries");

class AuthenticationRouting {
    constructor(app) {
        this.app = app;
    }

    authenticationRouting() {
        this.authRegister();
        this.authLogin();
    }

    authRegister() {
        this.app.post('/auth/register', async (req, res) => {
            let authQueries = new AuthQueries;

            // Check if a user already exists with that username.
            authQueries.retrieveUser(req.body.username)
                .then((user) => {
                    // If user exists return 400 error.
                    if (user) {
                        res.status(400).send("User already exists!");
                    } else {
                        // If a user doesn't exist we create one and return a success.
                        authQueries.createUser(req.body, (user) => {
                            // If a user has been created return success.
                            if (user > 0) {
                                res.status(200).send("User successfully created!");
                            } else {
                                res.status(400).send("Something went wrong here..");
                            }
                        });
                    }
                });
        });
    }

    authLogin() {
        this.app.post('/auth/login', (req, res) => {
            let authQueries = new AuthQueries;

            // Check if the username and password match a user account.
            authQueries.authenticateUser(req.body, (user) => {
                if (user) {
                    gameServer.game.addPlayer(req.body.socket, user)
                        .then((initPackage) => {
                            res.status(200).send(JSON.stringify({
                                message: "User successfully authenticated",
                                initPackage: initPackage,
                            }));
                        }).catch(function (err) {
                            console.log("ERROR:" + err);
                        });
                } else {
                    res.status(400).send("User credentials incorrect!");
                }
            })
        });
    }
}

module.exports = AuthenticationRouting;