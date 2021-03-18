const filterModel = require("../models/filterModel.js")

function filterBooks(req, res){
    console.log("getting filtered books...")
    
    var genre_id = req.query.genre_id;

    filterModel.filterByBook(genre_id,function(error, results){
        
        console.log("results from the DB are:" + results) ;
        res.json(results);
    });

}


function filterMovies(req, res){
    console.log("getting filtered movies...")

    var genre_id = req.query.genre_id;

    filterModel.filterByMovie(genre_id,function(error, results){
        
        console.log("results from the DB are:" + results) ;
        res.json(results);
    });

}

module.exports ={
    filterBooks:filterBooks,
    filterMovies:filterMovies
}
