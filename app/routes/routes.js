/***
 *
 * Back-end Route Component File
 *
 ***/
module.exports = function (app, express, __dirname) {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });

    // Telling the server what folder to use for the client front end / static files.
    app.use('/public', express.static(__dirname + '/public'));
}