/***
 *
 * Back-end Auth Database Component File
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
        let sql = "SELECT users.username as username, users.password as password, users.firstLogin as firstLogin, users.x as x, users.y as y, users.health as health, users.maxHealth as maxHealth," +
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

    async createUser(data, callback) {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            var user = {
                username: data.username,
                password: hash
            };
            var $this = this;
            let sql = "INSERT INTO users SET ?";

            this.connection.query(sql, user, (err, result) => {
                if (err) callback(err);
                let invSql = "INSERT INTO inventory SET ?";
                this.connection.query(invSql, { user_id: result.insertId, max_size: 8 }, (err, inventory) => {
                    if (err) callback(err);
                    callback(inventory);
                })
            });
        });
    }

    authenticateUser(data, callback) {
        this.retrieveUser(data.username, function (user) {
            if (user.length > 0) {
                bcrypt.compare(data.password, user[0].password, (error, response) => {
                    if (response) {
                        callback(user[0]);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }
        }) 
    }
}

module.exports = AuthDatabase;