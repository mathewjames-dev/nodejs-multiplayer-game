/***
 *
 * Back-end Database Component File
 *
 ***/
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.uri = "mongodb://127.0.0.1:27017/" + process.env.DB_NAME;

        // Setup the connection to the database.
        this.connection = mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
            
        this.db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
}

module.exports = Database;