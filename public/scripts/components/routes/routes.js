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

    // Get players inventory by username.
    async getPlayerInventory(username, cb) {
        Axios.get('/' + username + '/inventory')
            .then(function (res) {
                cb(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

module.exports = Routing;