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
        this.setupRouting();
    }

    setupRouting() {
        this.getRouting();
        this.playerRouting();
    }

    // Main Get URLs.
    getRouting() {
        let $this = this;

        // GET [/]
        this.app.get('/', function (req, res) {
            res.render('index');
        });
    }

    // Player Related Routing (Player Route / API File Eventually?)
    playerRouting() {       
    }
}

module.exports = Routes;