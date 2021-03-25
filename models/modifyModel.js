const {
    Pool
} = require("pg");
const { updateAuthor } = require("../controllers/modifyController");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

function insertNewBook(newBook, callback) {
    //create new book
    console.log("inserting new book...");

    var sql = "INSERT INTO book(book_name, genre_id, series_id, author_id) VALUES($1::text, $2::int, $3::int, $4::int)";
    var params = [newBook.book_name, newBook.genre_id, newBook.series_id, newBook.author_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            var results = {
                success: true
            };
            console.log(results);
            callback(null, results);
        }
    });

}

function insertNewMovie(newMovie, callback) {
    console.log("inserting new movie")

    var sql = "INSERT INTO movie(movie_name, genre_id, series_id) VALUES($1::text, $2::int, $3::int)";
    var params = [newMovie.movie_name, newMovie.genre_id, newMovie.series_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            var results = {
                success: true
            };
            console.log(results);
            callback(null, results);
        }
    });

    
}

function checkExisitingGenres(genre, callback) {

    var sql = "SELECT genre_name FROM genre WHERE genre_name = $1::text";
    var params = [genre];

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database 1 occurred");
            console.log(err);
            callback(err, null);
        } else {
            //console.log(db_results.rowCount);
            callback(null, db_results.rowCount);
        }
    });
}

function addNewGenre(genre, callback) {

    console.log("modify model" + genre);
    var sql = "INSERT INTO genre (genre_name) VALUES ($1::text)";
    var params = [genre];

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database ccurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }

    })

}

function checkExisitingSeries(series, callback) {
    console.log("checking for exsiting series name: " + series);

    var sql = "SELECT series_name FROM series WHERE series_name = $1::text";
    var params = [series];

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            //console.log(db_results.rowCount);
            callback(null, db_results.rowCount);
        }
    });

}

function addNewSeries(series, callback) {

    var sql = "INSERT INTO series (series_name) VALUES ($1::text)";
    var params = [series];

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database ccurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }

    })
}

function checkExisitingAuthors(author, callback) {
    var sql = "SELECT author_name FROM author WHERE author_name = $1::text";
    var params = [author];

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database 1 occurred");
            console.log(err);
            callback(err, null);
        } else {
            //console.log(db_results.rowCount);
            callback(null, db_results.rowCount);
        }
    });
}

function addNewAuthor(author, callback) {
    var sql = "INSERT INTO author (author_name) VALUES ($1::text)";
    var params = [author];

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database 1 occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function updatingBook(bookUpdate, callback){

    console.log("updating the book with " + bookUpdate.book_name + "and " + bookUpdate.book_id)
    var sql = "UPDATE book SET book_name = $1::text, genre_id = $2::int, series_id = $3::int, author_id = $4::int WHERE book_id = $5::int";
    var params = [bookUpdate.book_name, bookUpdate.genre_id, bookUpdate.series_id, bookUpdate.author_id, bookUpdate.book_id]

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function updatingGenre(newGenre, callback){
    console.log("updating the genre with " + newGenre.genre_name + "add " + newGenre.genre_id)
    var sql = "UPDATE genre SET genre_name = $1::text WHERE genre_id = $2::int";
    var params = [newGenre.genre_name, newGenre.genre_id]

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })
}

function updatingSeries(newSeries, callback){

    console.log("updating the genre with " + newSeries.series_name + "add " + newSeries.series_id)
    var sql = "UPDATE series SET series_name = $1::text WHERE series_id = $2::int";
    var params = [newSeries.series_name, newSeries.series_id]

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })
}

function updatingAuthor(newAuthor, callback){
    console.log("updating the author with " + newAuthor.author_name + "add " + newAuthor.author_id)
    var sql = "UPDATE author SET author_name = $1::text WHERE author_id = $2::int";
    var params = [newAuthor.author_name, newAuthor.author_id]

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function updatingMovie(movieUpdate, callback){
    console.log("updating the movie with " + movieUpdate.movie_name + "and " + movieUpdate.movie_id)
    var sql = "UPDATE movie SET movie_name = $1::text, genre_id = $2::int, series_id = $3::int WHERE movie_id = $4::int";
    var params = [movieUpdate.movie_name, movieUpdate.genre_id, movieUpdate.series_id, movieUpdate.movie_id]

    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function deletingMovie(movie_id, callback){

    var sql = "DELETE FROM movie WHERE movie_id = $1::int";
    var params = [movie_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })


}
function deletingBook(book_id, callback){

    var sql = "DELETE FROM book WHERE book_id = $1::int";
    var params = [book_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function authorInUse(author_id, callback){
    console.log("modify model author in use function");

    console.log("author_id is: " + author_id);
    
    var sql = "SELECT book_name FROM book WHERE book.author_id = $1::int";
    var params = [author_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            console.log(db_results.rowCount);
            callback(null, db_results.rowCount);
        }
    })

}

function seriesInUse(series_id, callback){
    console.log("modify model series in use function");

    console.log("series_id is: " + series_id);
    
    var sql = "SELECT book_name FROM book WHERE book.series_id = $1::int UNION SELECT movie_name FROM movie WHERE movie.series_id = $1::int ";
    var params = [series_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            console.log(db_results.rowCount);
            callback(null, db_results.rowCount);
        }
    })

}

function genreInUse(genre_id, callback){
    console.log("modify model genre in use function");
    
    var sql = "SELECT book_name FROM book WHERE book.genre_id = $1::int UNION SELECT movie_name FROM movie WHERE movie.genre_id = $1::int "
    var params = [genre_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            console.log(db_results.rowCount);
            callback(null, db_results.rowCount);
        }
    })

}

function deletingGenre(genre_id, callback){
    console.log("deleteing genre model");

    var sql = "DELETE FROM genre WHERE genre_id = $1::int";
    var params = [genre_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function deletingSeries(series_id, callback){
    console.log("deleteing series model");

    var sql = "DELETE FROM series WHERE series_id = $1::int";
    var params = [series_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}

function deletingAuthor(author_id, callback){

    console.log("deleteing author model");

    var sql = "DELETE FROM author WHERE author_id = $1::int";
    var params = [author_id];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            callback(null, db_results.rowCount);
        }
    })

}


module.exports = {
    insertNewBook: insertNewBook,
    insertNewMovie: insertNewMovie,
    checkExisitingGenres: checkExisitingGenres,
    addNewGenre: addNewGenre,
    checkExisitingSeries: checkExisitingSeries,
    addNewSeries: addNewSeries,
    checkExisitingAuthors: checkExisitingAuthors,
    addNewAuthor: addNewAuthor,
    updatingGenre:updatingGenre,
    genreInUse:genreInUse,
    deletingGenre:deletingGenre,
    updatingSeries:updatingSeries,
    seriesInUse:seriesInUse,
    deletingSeries:deletingSeries,
    updatingAuthor:updatingAuthor,
    authorInUse:authorInUse,
    deletingAuthor:deletingAuthor,
    updatingMovie:updatingMovie,
    deletingMovie:deletingMovie,
    updatingBook:updatingBook,
    deletingBook:deletingBook
}