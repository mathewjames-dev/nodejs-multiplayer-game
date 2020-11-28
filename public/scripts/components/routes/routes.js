/***
 *
 * Routes Front-end File
 * This will be utilized to house the front-end routing.
 *
 ***/
const AuthRouting = require("./auth/authRouting");

class Routing extends AuthRouting {
    constructor() {
        super();
    }
}

module.exports = Routing;