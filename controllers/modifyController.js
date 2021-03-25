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

function addNewMovie(req, res) {
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

function updateGenre(req, res) {
    console.log("updating genre")

    var newGenre = req.body.newGenre;

    modifyModel.updatingGenre(newGenre, function (error, results) {
        if (results == 0) {
            var message = {
                message: "Error with Database, Genre not updated"
            };
        } else {
            var message = {
                message: "Genre Updated!"
            };
        }
        res.json(message);
    })
}

function updateSeries (req, res){
    console.log("updating series")

    var newSeries = req.body.newSeries;

    modifyModel.updatingSeries(newSeries, function (error, results) {
        if (results == 0) {
            var message = {
                message: "Error with Database, Series not updated"
            };
        } else {
            var message = {
                message: "Series Updated!"
            };
        }
        res.json(message);
    })
}

function updateAuthor(req, res){
    console.log("updating author")

    var newAuthor = req.body.newAuthor;

    modifyModel.updatingAuthor(newAuthor, function (error, results) {
        if (results == 0) {
            var message = {
                message: "Error with Database, Series not updated"
            };
        } else {
            var message = {
                message: "Author Updated!"
            };
        }
        res.json(message);
    })

}

function updateMovie(req, res){

    console.log("updating movie")

    var movieUpdate = req.body.movieUpdate;
 
    modifyModel.updatingMovie(movieUpdate, function (error, results) {
        if (results == 0) {
            var message = {
                message: "Error with Database, Movie not updated"
            };
        } else {
            var message = {
                message: "Movie Updated!"
            };
        }
        res.json(message);
    })

}

function updateBook(req, res){
    console.log("updating movie")

    var bookUpdate = req.body.bookUpdate;
 
    modifyModel.updatingBook(bookUpdate, function (error, results) {
        if (results == 0) {
            var message = {
                message: "Error with Database, Book not updated"
            };
        } else {
            var message = {
                message: "Book Updated!"
            };
        }
        res.json(message);
    })

}

function deleteBook(req, res){

    var book_id = req.body.book_id;
    modifyModel.deletingBook(book_id, function (error, results){
        if (results == 0) {
            var message = {
                message: "Error with Database, Book not deleted"
            };
            res.json(message);
        } else {
            var message = {
                message: "Book was successfully deleted"
            }
            res.json(message);
        }

    })

}

function deleteMovie(req, res){
    var movie_id = req.body.movie_id;
    modifyModel.deletingMovie(movie_id, function (error, results){
        if (results == 0) {
            var message = {
                message: "Error with Database, Movie not deleted"
            };
            res.json(message);
        } else {
            var message = {
                message: "Movie was successfully deleted"
            }
            res.json(message);
        }

    })
}

function deleteAuthor(req, res){
    console.log("check if author is in use");

    var author_id = req.body.deleteAuthor.author_id;
    var author_name = req.body.deleteAuthor.author_name;

    modifyModel.authorInUse(author_id, function (error, results) {
        if (results == 1) {
            var message = {
                in_use: "true",
                message: "Author: " + author_name + " is in use and cannot be deleted"
            };
            res.json(message);
        } else {
            modifyModel.deletingAuthor(author_id, function (error, results) {
                if (results == 0) {
                    var message = {
                        message: "Error with Database, Author not deleted"
                    };
                    res.json(message);
                } else {
                    var message = {
                        message: "Author was successfully deleted"
                    }
                    res.json(message);
                }

            })
        }
    })

}

function deleteGenre(req, res) {
    console.log("check if genre is in use");

    var genre_id = req.body.deleteGenre.genre_id;
    var genre_name = req.body.deleteGenre.genre_name;

    modifyModel.genreInUse(genre_id, function (error, results) {
        if (results == 1) {
            var message = {
                in_use: "true",
                message: "Genre: " + genre_name + " is in use and cannot be deleted"
            };
            res.json(message);
        } else {
            modifyModel.deletingGenre(genre_id, function (error, results) {
                if (results == 0) {
                    var message = {
                        message: "Error with Database, Genre not deleted"
                    };
                    res.json(message);
                } else {
                    var message = {
                        message: "Genre was successfully deleted"
                    }
                    res.json(message);
                }

            })
        }
    })

}

function deleteSeries(req, res){
    console.log("check if series is in use");

    var series_id = req.body.deleteSeries.series_id;
    var series_name = req.body.deleteSeries.series_name;

    modifyModel.seriesInUse(series_id, function (error, results) {
        if (results == 1) {
            var message = {
                in_use: "true",
                message: "Series: " + series_name + " is in use and cannot be deleted"
            };
            res.json(message);
        } else {
            modifyModel.deletingSeries(series_id, function (error, results) {
                if (results == 0) {
                    var message = {
                        message: "Error with Database, Series not deleted"
                    };
                    res.json(message);
                } else {
                    var message = {
                        message: "Series was successfully deleted"
                    }
                    res.json(message);
                }

            })
        }
    })


}


module.exports = {
    addNewBook: addNewBook,
    addNewGenre: addNewGenre,
    addNewSeries: addNewSeries,
    addNewAuthor: addNewAuthor,
    addNewMovie: addNewMovie,
    updateGenre: updateGenre,
    deleteGenre: deleteGenre,
    updateSeries:updateSeries,
    deleteSeries:deleteSeries,
    updateAuthor:updateAuthor,
    deleteAuthor:deleteAuthor,
    updateMovie:updateMovie,
    deleteMovie:deleteMovie,
    updateBook:updateBook,
    deleteBook:deleteBook

}