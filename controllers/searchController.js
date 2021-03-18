const searchModel = require("../models/searchModel.js")

function getGenreList(req, res){
    console.log("getting all genres controller ...")


    searchModel.getAllGenres(function(error,results){
        res.json(results);
    });
}

function getSeriesList(req, res) {
    console.log("getting all series...")

    searchModel.getAllSeries(function(error,results){
        res.json(results);
    });
    
}

function getAuthorList(req, res){
    console.log("getting all authors...")

    searchModel.getAllAuthors(function(error,results){
        res.json(results);
    });

}

function getAllBooks(req, res){
    console.log("getting all books...")

    searchModel.getAllBooks(function(error,results){
        
        res.json(results);
    });

}

function searchBook(req, res){
    console.log("getting filtered items...")

    var book = req.query.book;

    searchModel.searchByBook(book,function(error, results){
        
        console.log("results from the DB are:" + results) ;
        res.json(results);
    });

}

function searchMovie(req, res){
    console.log("getting filtered items...")

    var movie = req.query.movie;

    searchModel.searchByMovie(movie,function(error, results){
        
        console.log("results from the DB are:" + results) ;
        res.json(results);
    });


}

module.exports ={
    getGenreList: getGenreList,
    searchBook:searchBook,
    searchMovie:searchMovie,
    getSeriesList:getSeriesList,
    getAuthorList:getAuthorList,
    getAllBooks:getAllBooks
}