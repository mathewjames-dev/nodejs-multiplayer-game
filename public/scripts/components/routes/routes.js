/***
 *
 * Routes Front-end File
 * This will be utilized to house the front-end routing.
 *
 ***/
const AuthRouting = require("./auth/authRouting");
const { default: Axios } = require("axios");

class Routing extends AuthRouting {
    constructor() {
        super();
    }
}

module.exports = Routing;