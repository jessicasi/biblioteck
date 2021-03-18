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


function filterBooks(book, callback) {
    console.log("made it to filterering book model " + book);

    

}

function filterMovies(movieId, callback) {
    console.log("made it to filterering movie model");
    var movieId;
    var results = {
        movies: [{
                id: 1,
                name: "The Santa Clause"
            },
            {
                id: 1,
                name: "The Santa Clause"
            },
            {
                id: 1,
                name: "The Santa Clause"
            },
        ]

    }
    callback(null, results);
}


/* var id = req.query.id;
var type = req.query.filterType;

if (type == "book") {
    getFilteredBooks(id, function (err, result) {
        console.log("Back from the filtered function with result:", result);

        if (err || result == null || result.length != 1) {
            res.status(500).json({
                success: false,
                data: err
            });
        } else {

            var returned = JSON.stringify(result);
            var parsedJSON = JSON.parse(returned);
            var books = [];
            var authors = [];
            for (var i = 0; i < parsedJSON.length; i++) {
                books.push(parsedJSON[i].book_id);
                books.push(parsedJSON[i].book_name)
                authors.push(parsedJSON[i].author_id);
                authors.push(parsedJSON[i].author_name);

            }

            console.log(books);
            console.log(authors);

            res.render('pages/filteredBooks.ejs', {
                books,
                authors
            });
        }
    }); */
//}

module.exports = {
    filterBooks: filterBooks,
    filterMovies: filterMovies
}