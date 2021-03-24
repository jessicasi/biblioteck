const modifyModel = require("../models/modifyModel.js")

function addNewBook(req, res) {

    console.log("adding new book ...")

    var newBook = req.body.newBook;
    //console.log("New Book Variable: " + newBook.genre_id + newBook.book_name + newBook.author_name);

    modifyModel.insertNewBook(newBook, function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });
}
function addNewMovie(req,res){
    console.log("adding new movie ...")

    var newMovie = req.body.newMovie;
    //console.log("New Book Variable: " + newBook.genre_id + newBook.book_name + newBook.author_name);

    modifyModel.insertNewMovie(newMovie, function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });

}


function addNewGenre(req, res) {
    console.log("adding new genre");
    //console.log(req);
    var genre = req.body.genre;

    modifyModel.checkExisitingGenres(genre, function (error, results) {
            //console.log(results);
            if (results == 1) {
                var message = {
                    duplicate: "true",
                    message: genre + " Genre Already Exists"
                };
                res.json(message);
            } else {
                modifyModel.addNewGenre(genre, function (error, results) {
                    if (results.success == 0) {
                        var message = {
                            message: "Error with Database, Genre not added"

                        };
                        res.json(message);
                    }
                    res.json(results);
                })
            }

        }

    )
}

function addNewSeries(req, res) {
    console.log("adding new series");

    var series = req.body.series;

    modifyModel.checkExisitingSeries(series, function (error, results) {
            if (results == 1) {
                var message = {
                    duplicate: "true",
                    message: series + " Series Already Exists"
                };
                res.json(message);
            } else {
                modifyModel.addNewSeries(series, function (error, results) {
                    if (results.sucess == 0) {
                        var message = {
                            message: "Error with Database, Series not added"
                        };
                        res.json(message);
                    } 
                    res.json(results);
                })
            }

        }

    )

}

function addNewAuthor(req, res) {
    console.log("adding new author");
    //console.log(req);
    var author = req.body.author;

    modifyModel.checkExisitingAuthors(author, function (error, results) {
            if (results == 1) {
                var message = {
                    duplicate: "true",
                    message: author + " Author Already Exists"
                };
                res.json(message);
            } else {
                modifyModel.addNewAuthor(author, function (error, results) {
                    if (results == 0) {
                        var message = {
                            message: "Error with Database, Author not added"
                        };
                    } else {
                        var message = {
                            message: "New Author Added!"
                        };
                    }
                    res.json(message);
                })
            }

        }

    )


}





module.exports = {
    addNewBook: addNewBook,
    addNewGenre: addNewGenre,
    addNewSeries: addNewSeries,
    addNewAuthor: addNewAuthor,
    addNewMovie :addNewMovie

}