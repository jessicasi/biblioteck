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

function getAllGenres(callback) {
    console.log("building genre lists");

    var sql = "SELECT genre_name, genre_id FROM genre";

    pool.query(sql, function (err, result) {
            if (err) {
                console.log("unable to generate genre list");
                console.log(err);
                callback(err, null);
            }
            pool.query(sql, function (err, db_results) {
                if (err) {
                    console.log("An error with the database occurred");
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log(db_results.rows);
                    string = JSON.stringify(db_results.rows);

                    var results = {
                        success: true,
                        genres: db_results.rows
                    };

                    console.log(results);
                    callback(null, results);

                }
            });
        }


    )
}


function searchByBook(book, callback) {
    var sql = "SELECT book_id,book_name, book.author_id, author_name FROM book JOIN author ON book.author_id = author.author_id WHERE book_name = $1::text";


    //var sql = "SELECT book_id,book_name, book.author_id, author_name FROM book JOIN author ON book.author_id = author.author_id WHERE book.genre_id = $1::int";
    //var sql = "SELECT book_id, book_name FROM book WHERE book_id = $1::int";
    var params = [book];
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

            console.log(results);
            callback(null, results);

        }
    });
}

function searchByMovie(movie, callback) {
    var sql = "SELECT movie_id,movie_name FROM movie WHERE movie_name = $1::text";

    var params = [movie];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            console.log(db_results.rows);

            var results = {
                success: true,
                movie: db_results.rows
            };

            console.log(results);
            callback(null, results);

        }
    });
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
    getAllGenres: getAllGenres,
    searchByBook: searchByBook,
    searchByMovie: searchByMovie
}