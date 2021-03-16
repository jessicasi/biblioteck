const genreModel = require("../models/genreModel.js")

function getGenreList(req, res){
    console.log("getting all genres ...")

    genreModel.getAllGenres(function(results){
        res.json(results);
    });
}

function getFilterItems(req, res){
    console.log("getting filtered items...")

    var bookId = 1;

    genreModel.filterBooks(id,function(results){
        res.json(results);
    });

    var movieId = 1;

    genreModel.filterMovies(id, function(results){
        res.json(results);
    })
}
module.exports ={
    getGenreList: getGenreList,
    getFilterItems: getFilterItems
}