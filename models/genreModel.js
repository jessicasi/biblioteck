function getAllGenres(callback){
    //get all the genres from the DB

    //put genre function here

    var results = {
        genres: [
            {id:1, name:"comedy"},
            {id:2, name:"fantasy"},
            {id:3, name:"holiday"}
        ]
    }
    //return genres
    callback(results);

}

module.exports = {
    getAllGenres: getAllGenres
}