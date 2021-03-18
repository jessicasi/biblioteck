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

    var sql = "INSERT INTO author (author_name) VALUES($1::text) ";

    var params = [newBook.author_name];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database 1 occurred");
            console.log(err);
            callback(err, null);
        } else {
            var sql2 = "INSERT INTO book(book_name, genre_id, author_id) VALUES($1::text, $2::int, lastval())";
            var newParams = [newBook.book_name, newBook.genre_id];
            pool.query(sql2,newParams, function (err, db_results) 
            { if (err) { console.log("An error with the database 2 occurred");
            console.log(err);
            callback(err, null);
            }
            else { var results = 
                { success: true };
                console.log(results);
                callback(null, results);
            }
                });
           

        }
    }); 
}

function insertNewMovie() {
    //create new movie
}


module.exports = {
    insertNewBook: insertNewBook,
    insertNewMovie: insertNewMovie
}