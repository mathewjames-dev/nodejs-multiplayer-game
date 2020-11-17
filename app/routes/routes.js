/***
 *
 * Back-end Route Component File
 *
 ***/
module.exports = function (app, express, __dirname) {
    // Telling the server what folder to use for the client front end / static files.
    app.use('/public', express.static(__dirname + '/public'));

    // Main homepage get route.
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });

    // Authentication routing.
    app.post('/auth/register', function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        /*res.send(JSON.stringify({
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null
        }));*/
    });
}