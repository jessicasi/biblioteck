const modifyModel = require("../models/modifyModel.js")

function addNewBook(req, res){

    console.log("adding new book ...")
    
    var newBook = req.body.newBook;
    //console.log("New Book Variable: " + newBook.genre_id + newBook.book_name + newBook.author_name);

    modifyModel.insertNewBook(newBook,function(error, results){
        
        console.log("results from the DB are:" + results) ;
        res.json(results);
    });
}





module.exports ={
    addNewBook: addNewBook

}