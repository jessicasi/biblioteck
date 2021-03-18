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



function searchByBook(book, callback) {
    var sql = "SELECT book_id,book_name, book.author_id, author_name FROM book JOIN author ON book.author_id = author.author_id WHERE book_name = $1::text";


    //var sql = "SELECT book_id,book_name, book.author_id, author_name FROM book JOIN author ON book.author_id = author.author_id WHERE book.genre_id = $1::int";
    //var sql = "SELECT book_id, book_name FROM book WHERE book_id = $1::int";
    var params = [book];
    var string="";
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        } else {
            //console.log("Found DB result: " + JSON.stringify(db_result.rows));
            //callback(null, db_result.rows);
            console.log(db_results.rows);
            string= JSON.stringify(db_results.rows);
            //console.log(JSON.stringify(db_results.rows));
            //console.log(JSON.parse(string));

           /*  for (var index in db_results.rows) {
                
                string += '<li>\'' + index + '\' : \'' + data[index] + '\'</li>';
            
            }*/

            var results = {
                success:true,
                books:db_results.rows
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
                success:true,
                movie:db_results.rows
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
    searchByBook:searchByBook,
    searchByMovie:searchByMovie
}