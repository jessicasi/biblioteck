const {
    Pool
} = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});


function filterByBook(genre_id, callback) {
    console.log("made it to filterering book model " + genre_id);

    var sql = "SELECT book_id,book_name, book.author_id, author_name FROM book JOIN author ON book.author_id = author.author_id WHERE book.genre_id = $1::int ORDER BY book_name ASC";
    //var sql = "SELECT book_id, book_name FROM book WHERE book_id = $1::int";
    var params = [genre_id];
    var string = "";
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            console.log(db_results.rows);
            string = JSON.stringify(db_results.rows);
            var results = {
                success: true,
                books: db_results.rows
            };

            //console.log(results);
            callback(null, results);

        }
    });
}




function filterByMovie(genre_id, callback) {
    console.log("made it to filterering movie model");

    var sql = "SELECT movie_id,movie_name FROM movie WHERE movie.genre_id = $1::int";
    //var sql = "SELECT book_id, book_name FROM book WHERE book_id = $1::int";
    var params = [genre_id];
    var string = "";
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            console.log(db_results.rows);
            string = JSON.stringify(db_results.rows);
            var results = {
                success: true,
                movies: db_results.rows
            };

            //console.log(results);
            callback(null, results);

        }
    });
}


module.exports = {
    filterByBook: filterByBook,
    filterByMovie: filterByMovie
}