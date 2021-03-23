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

    var sql = "SELECT genre_name, genre_id FROM genre ORDER BY genre_name ASC";

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
                    string = JSON.stringify(db_results.rows);

                    var results = {
                        success: true,
                        genres: db_results.rows
                    };

                   // console.log(results);
                    callback(null, results);

                }
            });
        }


    )
}

function getAllSeries(callback){
    console.log("building series lists");

    var sql = "SELECT series_name, series_id FROM series ORDER BY series_name ASC";

    pool.query(sql, function (err, result) {
            if (err) {
                console.log("unable to generate series list");
                console.log(err);
                callback(err, null);
            }
            pool.query(sql, function (err, db_results) {
                if (err) {
                    console.log("An error with the database occurred");
                    console.log(err);
                    callback(err, null);
                } else {
                    //console.log(db_results.rows);
                    string = JSON.stringify(db_results.rows);

                    var results = {
                        success: true,
                        series: db_results.rows
                    };

                   // console.log(results);
                    callback(null, results);

                }
            });
        }


    )
}

function getAllAuthors(callback){
    console.log("building authors lists");

    var sql = "SELECT author_name, author_id FROM author ORDER BY author_name ASC";

    pool.query(sql, function (err, result) {
            if (err) {
                console.log("unable to generate authors list");
                console.log(err);
                callback(err, null);
            }
            pool.query(sql, function (err, db_results) {
                if (err) {
                    console.log("An error with the database occurred");
                    console.log(err);
                    callback(err, null);
                } else {

                    string = JSON.stringify(db_results.rows);

                    var results = {
                        success: true,
                        authors: db_results.rows
                    };

                   // console.log(results);
                    callback(null, results);

                }
            });
        }


    )
}

function getAllBooks(callback){
    console.log("building book lists");

    var sql = "SELECT book_id, book_name FROM book ORDER BY book_name ASC ";

    pool.query(sql, function (err, result) {
        if (err) {
            console.log("unable to generate books list");
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
                    books: db_results.rows
                };

               // console.log(results);
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



/* function getAllMovies() {
    //Get all the movies from the DB

    //put function here

    //return results
}*/

module.exports = {
    getAllGenres: getAllGenres,
    searchByBook: searchByBook,
    searchByMovie: searchByMovie,
    getAllSeries:getAllSeries,
    getAllAuthors:getAllAuthors,
    getAllBooks:getAllBooks
}