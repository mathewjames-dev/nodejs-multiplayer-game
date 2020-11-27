/***
 *
 * Back-end Database Component File
 *
 ***/
const bcrypt = require('bcrypt');
const Database = require('./database');

const saltRounds = 10;

class AuthDatabase extends Database {
    constructor() {
        super();
    }

    retrieveUser(username, callback) {
        let sql = "SELECT users.username as username, users.password as password, users.x as x, users.y as y, users.health as health, " +
            "maps.name as map_name, maps.location as map_location, " +
            "sprites.name as sprite_name, sprites.location as sprite_location, sprites.number_of_rows, " +
            "sprites.number_of_cols, sprites.tracking_down_row, sprites.tracking_up_row, sprites.tracking_left_row, sprites.tracking_right_row, sprites.total_frames, " +
            "sprites.sheet_width as sheet_width, sprites.sheet_height as sheet_height FROM users " +
            "INNER JOIN maps ON users.map_id = maps.id " +
            "INNER JOIN sprites ON users.sprite_id = sprites.id " +
            "WHERE username = ? LIMIT 1"
        this.connection.query(sql, [username], function (err, result, fields) {
            if (err) callback(false);
            callback(result);
        });
    }

    createUser(data, callback) {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            let sql = "INSERT INTO users (username, password) VALUES ('?', '?')";
            this.connection.query(sql, [data.username, hash] , function (err, result) {
                if (err) callback(err);

                callback(result);
            });
        });
    }

    authenticateUser(data, callback) {
        this.retrieveUser(data.username, function (user) {
            bcrypt.compare(data.password, user[0].password, function (error, response) {
                if (response) {
                    callback(user[0]);
                } else {
                    callback(false);
                }
            });
        }) 
    }
}

module.exports = AuthDatabase;