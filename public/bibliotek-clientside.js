function searchByBook() {
    console.log("Searching by book...");
    var book = $("#book").val();
    //console.log("Book: " + book);

    $.get("/searchBook", {book:book}, function(data) {
        console.log("Back from the server with: ");
        console.log(data);
        //console.log(data.books);

        for (var i = 0; i < data.books.length; i++){
            var book = data.books[i];
            console.log(book);
            //$("#ulBibliotek").append("<li>" + book.book_name + " " + book.author_name + "</li>");
            document.getElementById("ulBibliotek").innerHTML = "<li>" + book.book_name + " " + book.author_name + "</li>";
        }

    })

}

function searchByMovie() {
    console.log("Searching by movie...");

    var movie = $("#movie").val();

    $.get("/searchMovie", {movie:movie}, function(data) {
        console.log("Back from the server with: ");
        console.log(data);
        //console.log(data.books);

        for (var i = 0; i < data.movie.length; i++){
            var movie = data.movie[i];
            console.log(movie);
            //$("#ulBibliotek").append("<li>" + book.book_name + " " + book.author_name + "</li>");
            document.getElementById("ulBibliotek").innerHTML = "<li>" + movie.movie_name + "</li>";
        }

    })
}