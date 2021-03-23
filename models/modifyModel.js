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

function insertNewBook(newBook, callback) {
    //create new book
    console.log("inserting new book...");

    var sql = "INSERT INTO book(book_name, genre_id, author_id) VALUES($1::text, $2::int, $3::int)";
    var params = [newBook.book_name, newBook.genre_id, newBook.author_id];
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
    var sql = "INSERT INTO genre (genre_name) VALUES ($1::text)";
    var params = [genre];

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

function checkExisitingSeries(series, callback) {

    var sql = "SELECT series_name FROM series WHERE series_name = $1::text";
    var params = [series];

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

function addNewSeries(series, callback) {

    var sql = "INSERT INTO series (series_name) VALUES ($1::text)";
    var params = [series];

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

function checkExisitingAuthors(author, callback){
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

function addNewAuthor(author, callback){
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

function insertNewMovie() {
    //create new movie
}


module.exports = {
    insertNewBook: insertNewBook,
    insertNewMovie: insertNewMovie,
    checkExisitingGenres: checkExisitingGenres,
    addNewGenre: addNewGenre,
    checkExisitingSeries: checkExisitingSeries,
    addNewSeries: addNewSeries,
    checkExisitingAuthors:checkExisitingAuthors,
    addNewAuthor:addNewAuthor
}