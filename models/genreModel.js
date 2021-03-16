function getAllGenres(callback){
    //get all the genres from the DB

    //put genre function here

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

function filterBooks(bookId, callback){
    console.log("made it to filterering book model");
    var bookId;
    var results = {books: [{id: 1, name: "Anne of Green Gables", author: "Lucy Maude Montgomery"},
    {id: 1, name: "Anne of Green Gables", author: "Lucy Maude Montgomery"},
    {id: 1, name: "Anne of Green Gables", author: "Lucy Maude Montgomery"}]

    }
    callback(null, results);

}

function filterMovies(movieId, callback){
    console.log("made it to filterering movie model");
    var movieId;
    var results = {movies: [{id: 1, name: "The Santa Clause"},
    {id: 1, name: "The Santa Clause"},
    {id: 1, name: "The Santa Clause"},]

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
    getAllGenres: getAllGenres,
    filterBooks: filterBooks,
    filterMovies: filterMovies
}