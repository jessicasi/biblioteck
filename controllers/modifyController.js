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

function addNewGenre(req, res) {
    console.log("adding new genre");
    //console.log(req);
    var genre = req.body.genre;

    //console.log(genre);

    //check for exisiting genre

    modifyModel.checkExisitingGenres(genre, function (error, results) {
            //console.log(results);
            if (results == 1) {
                var message = {
                    message: "Genre Already Exists"
                };
                res.json(message);
            } else {
                modifyModel.addNewGenre(genre, function (error, results) {
                    if (results == 0) {
                        var message = {
                            message: "Error with Database, Genre not added"
                        };
                    } else {
                        var message = {
                            message: "New Genre Added!"
                        };
                    }
                    res.json(message);
                })
            }
           
        }

    )
}

function addNewSeries(req, res){
    console.log("adding new series");
    //console.log(req);
    var series = req.body.series;

    //console.log(genre);

    //check for exisiting genre

    modifyModel.checkExisitingSeries(series, function (error, results) {
            //console.log(results);
            if (results == 1) {
                var message = {
                    message: "Series Already Exists"
                };
                res.json(message);
            } else {
                modifyModel.addNewSeries(series, function (error, results) {
                    if (results == 0) {
                        var message = {
                            message: "Error with Database, Series not added"
                        };
                    } else {
                        var message = {
                            message: "New Series Added!"
                        };
                    }
                    res.json(message);
                })
            }
           
        }

    )

}

function addNewAuthor(req, res){
    console.log("adding new author");
    //console.log(req);
    var author = req.body.author;

    //console.log(genre);

    //check for exisiting genre

    modifyModel.checkExisitingAuthors(author, function (error, results) {
            //console.log(results);
            if (results == 1) {
                var message = {
                    message: "Author Already Exists"
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
    addNewSeries:addNewSeries,
    addNewAuthor:addNewAuthor

}