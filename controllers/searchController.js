const searchModel = require("../models/searchModel.js")

function getGenreList(req, res){
    console.log("getting all genres ...")

    searchModel.getAllGenres(function(error,results){
        res.json(results);
    });
}


module.exports ={
    getGenreList: getGenreList,
}