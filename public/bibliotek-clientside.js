function searchByBook() {
    console.log("Searching by book...");
    var book = $("#book").val();
    //console.log("Book: " + book);

    $.get("/searchBook", {
        book: book
    }, function (data) {
        console.log("Back from the server with: ");
        console.log(data);
        //console.log(data.books);

        for (var i = 0; i < data.books.length; i++) {
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

    $.get("/searchMovie", {
        movie: movie
    }, function (data) {
        //console.log("Back from the server with: ");
        // console.log(data);
        //console.log(data.books);

        for (var i = 0; i < data.movie.length; i++) {
            var movie = data.movie[i];
            //console.log(movie);
            //$("#ulBibliotek").append("<li>" + book.book_name + " " + book.author_name + "</li>");
            document.getElementById("ulBibliotek").innerHTML = "<li>" + movie.movie_name + "</li>";
        }

    })
}

function getAllGenres() {
    console.log("getting all genres");
    $.get("/genres", function (data) {
        //console.log("Back from the server with: ");
        //console.log(data);

        var results = "";
        for (var i = 0; i < data.genres.length; i++) {
            var genre = data.genres[i];
            // console.log(genre);
            results += " <option value='" + genre.genre_id + "'>" + genre.genre_name + "</option>";
        }

        //console.log(results);
        document.getElementById("genreBookFilter").innerHTML = results;
        document.getElementById("genreMovieFilter").innerHTML = results;
        document.getElementById("newItemGenreFilter").innerHTML = results;
    })
}

function filterByBook() {
    console.log("filtering Books...");

    var genre_id = $("#genreBookFilter").val();
    //console.log(genre_id);
    $.get("/filterBooks", {
        genre_id: genre_id
    }, function (data) {
        var bookList = "";
        for (var i = 0; i < data.books.length; i++) {
            var book = data.books[i];
            //console.log(book);
            //$("#ulBibliotek").append("<li>" + book.book_name + " " + book.author_name + "</li>");
           bookList += "<li>" + book.book_name + " " + book.author_name + "</li>";
        }
        document.getElementById("ulBibliotek").innerHTML = bookList;
    })

}

function filterByMovie() {
    console.log("filtering Movies...");

    var genre_id = $("#genreMovieFilter").val();
    //console.log(genre_id);
    $.get("/filterMovies", {
        genre_id: genre_id
    }, function (data) {
    var movieList = "";
        for (var i = 0; i < data.movies.length; i++) {
            var movie = data.movies[i];
            //console.log(book);
            //$("#ulBibliotek").append("<li>" + book.book_name + " " + book.author_name + "</li>");
             movieList += "<li>" + movie.movie_name + "</li>";
        }
        document.getElementById("ulBibliotek").innerHTML = movieList;
    })

}

function showAuthor(divId, element) {
    document.getElementById(divId).style.display = element.value == 'book' ? 'block' : 'none';
}

function addNewItem() {
    console.log("adding item");

    var itemType = $("#addType").val();
    var itemName = $("#newItemName").val();
    var itemGenre = $("#newItemGenreFilter").val();



    if (itemType == 'book') {
        var authorName = $("#newItemAuthor").val();
        var newBook = {genre_id: itemGenre,
            book_name: itemName,
            author_name: authorName};

            console.log(newBook);
            $.post("/addBook", {newBook: newBook}, function (data) {
                console.log(data);
                if (data.success == true){
                    document.getElementById("ulBibliotek").innerHTML = "Book added";
                }

        })
    }

}