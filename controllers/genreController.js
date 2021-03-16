const genreModel = requrie("../models/genreModel.js")

function getGenreList(req, res){
    console.log("getting all genres ...")

    genreModel.getAllGenres(function(results){
        res.json(results);
    });
}

module.exports ={
    getGenreList: getGenreList
}