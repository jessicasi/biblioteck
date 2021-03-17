const filterModel = require("../models/filterModel.js")

function filter(req, res){
    console.log("getting filtered items...")

    var book = req.query.book;

    filterModel.filterBooks(book,function(error, results){
        res.json(results);
        console.log("results from the DB are:" + results.book.name) ;
    });

    /* var movieId = 1;

    filterModel.filterMovies(id, function(results){
        res.json(results);
    }) 
} */
}

module.exports ={
    filter:filter
}
