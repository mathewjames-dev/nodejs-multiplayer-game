/***
 *
 * Auth Routing Front-end File
 * This will be utilized to house the authentication routing.
 *
 ***/
const { default: Axios } = require("axios");

class AuthRouting {
    constructor() {

    }

    async register(data, cb) {
        Axios.post('/auth/register', data)
            .then(function (res) {
                cb(res.data)
            }).catch(function (error) {
                console.log(error);
            });
    }

    async login(data, cb) {
        Axios.post('/auth/login', data)
            .then(function (res) {
                cb(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

module.exports = AuthRouting;