const searchModel = require("../models/searchModel.js")

function getGenreList(req, res) {
    console.log("getting all genres controller ...")


    searchModel.getAllGenres(function (error, results) {
        res.json(results);
    });
}

function getSeriesList(req, res) {
    console.log("getting all series...")

    searchModel.getAllSeries(function (error, results) {
        res.json(results);
    });

}

function getAuthorList(req, res) {
    console.log("getting all authors...")

    searchModel.getAllAuthors(function (error, results) {
        res.json(results);
    });

}

function getAllBooks(req, res) {
    console.log("getting all books...")

    searchModel.viewBooks(function (error, results) {

        res.json(results);
    });

}

function searchBook(req, res) {
    console.log("getting filtered items...")

    var book = req.query.book;

    searchModel.searchByBook(book, function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });

}

function searchMovie(req, res) {
    console.log("getting filtered items...")

    var movie = req.query.movie;

    searchModel.searchByMovie(movie, function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });


}

function viewAllBooks(req, res) {

    console.log("viewing All Books controller")

    searchModel.viewBooks(function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });


}

function viewAllMovies(req, res) {

    searchModel.viewMovies(function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });


}

function viewAllSeries(req, res) {
    console.log("viewing All controller")

    searchModel.viewSeries(function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });
}

function viewAllAuthors(req, res) {
    console.log("viewing All controller")

    searchModel.viewAuthors(function (error, results) {

        console.log("results from the DB are:" + results);
        res.json(results);
    });
}

module.exports = {
    getGenreList: getGenreList,
    searchBook: searchBook,
    searchMovie: searchMovie,
    getSeriesList: getSeriesList,
    getAuthorList: getAuthorList,
    getAllBooks: getAllBooks,
    viewAllBooks: viewAllBooks,
    viewAllMovies: viewAllMovies,
    viewAllSeries: viewAllSeries,
    viewAllAuthors: viewAllAuthors
}