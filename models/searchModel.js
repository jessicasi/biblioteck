const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false}
});

function getAllGenres(callback){
    //get all the genres from the DB

    //put genre function here

    console.log("building genre lists");

    var sql = "SELECT genre_name, genre_id FROM genre";

    pool.query(sql, function (err, result) {
        if (err) {
            console.log("unable to generate genre list");
            console.log(err);
            callback(err, null);
        }

        var returned = JSON.stringify(result.rows);
        var parsedJSON = JSON.parse(returned);
        var dropdown = [];
        var ids = []
        for (var i = 0; i < parsedJSON.length; i++) {
            dropdown.push(parsedJSON[i].genre_name);
            ids.push(parsedJSON[i].genre_id);
        }
          
    })

    var results = {
        genres: [
            {id:1, name:"comedy"},
            {id:2, name:"fantasy"},
            {id:3, name:"holiday"}
        ]
    }
    //return genres
    callback(results);

}

/* function getAllBooks() {
    //Get all the books from the DB

    //put function here

    //return results
}*/

/* function getAllMovies() {
    //Get all the movies from the DB

    //put function here

    //return results
}*/

module.exports = {
    getAllGenres: getAllGenres
}