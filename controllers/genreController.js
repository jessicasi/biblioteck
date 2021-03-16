const genreModel = require("../models/genreModel.js")

function getGenreList(req, res){
    console.log("getting all genres ...")

    genreModel.getAllGenres(function(error,results){
        res.json(results);
    });
}

function filter(req, res){
    console.log("getting filtered items...")

    var book = req.query.book;

    genreModel.filterBooks(book,function(error, results){
        res.json(results);
    });

    /* var movieId = 1;

    genreModel.filterMovies(id, function(results){
        res.json(results);
    }) 
} */
}
module.exports ={
    getGenreList: getGenreList,
    filter: filter
}