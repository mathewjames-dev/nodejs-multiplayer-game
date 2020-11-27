const Database = require("./database");

/***
 *
 * Back-end Database Component File
 *
 ***/
class MapDatabase extends Database {
    constructor() {
        super();
    }

    retrieveMapSounds(name, callback) {
        let sql = "SELECT map_sounds.name, map_sounds.location FROM maps LEFT JOIN map_sounds ON maps.id = map_sounds.map_id" +
            " WHERE maps.name = ?";
        this.connection.query(sql, [name], function (err, result, fields) {
            if (err) callback(false);

            callback(result);
        });
    }
}

module.exports = MapDatabase;