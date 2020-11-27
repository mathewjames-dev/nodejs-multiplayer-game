const Map = require("../game/map/map");
const AuthDatabase = require("../database/authDatabase");
const AuthenticationRouting = require("./authentication");

/***
 *
 * Back-end Route File
 * This will be utilized for all the App routing.
 *
 ***/

class Routes {
    constructor(app, express, __dirname) {
        this.app = app;
        this.express = express;
        this.rootDirectory = __dirname;

        // Specify front end client folder.
        this.app.use('/public', express.static(__dirname + '/public'));

        this.authentication = new AuthenticationRouting(this.app);
        this.authentication.authenticationRouting();
        this.getRouting();
    }

    getRouting() {
        // GET [/]
        let $this = this;

        this.app.get('/', function (req, res) {
            res.sendFile($this.rootDirectory + '/views/index.html');
        });
    }
}

module.exports = Routes;