const Map = require("../game/map/map");
const AuthDatabase = require("../database/authDatabase");
const AuthenticationRouting = require("./authentication");
const PlayerDatabase = require("../database/player/player");

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
        // Get the players inventory details and items.
        this.app.get('/:username/inventory', async function (req, res) {
            let playerDatabase = new PlayerDatabase;
            // Check if the username and password match a user account.
            playerDatabase.getPlayerInventory(req.params.username, function (inventory) {
                if (inventory) {
                    let inventoryObj = {
                        items: []
                    };

                    for (let i = 0; i < inventory.length; i++) {
                        let item = inventory[i];
                        if (!item) continue;

                        if (!inventoryObj.max_size) inventoryObj.max_size = item.max_size;

                        inventoryObj.items.push({
                            item_name: item.name,
                            item_image: item.image
                        });
                    }


                    res.send(JSON.stringify({
                        status: 200,
                        inventory: inventoryObj,
                    }));
                } else {
                    res.status(400).send("Unable to get inventory!");
                }
            });
        });
    }
}

module.exports = Routes;