window.onload = setUpDropDowns;

function setUpDropDowns() {

    //Genre drop downs
    $.get("/genres", function (data) {
        var results = "";
        for (var i = 0; i < data.genres.length; i++) {
            var genre = data.genres[i];
            // console.log(genre);
            results += " <option value='" + genre.genre_id + "'>" + genre.genre_name + "</option>";
        }
        results += " <option value='new'> Add New Genre </option>";

        //console.log(results);
        document.getElementById("genreFilter").innerHTML = results;
        document.getElementById("newItemGenreFilter").innerHTML = results;
        //document.getElementById("editItemGenreFilter").innerHTML = results;
    })

    //series drop downs
    $.get("/series", function (data) {
        var results = "";
        for (var i = 0; i < data.series.length; i++) {
            var series = data.series[i];
            results += " <option value='" + series.series_id + "'>" + series.series_name + "</option>";
        }

        results += " <option value='new'> Add New Series </option>";
        document.getElementById("newItemSeriesFilter").innerHTML = results;
        // document.getElementById("editItemSeriesFilter").innerHTML = results;
    })

    //author drop downs
    $.get("/authors", function (data) {
        var results = "";
        for (var i = 0; i < data.authors.length; i++) {
            var authors = data.authors[i];
            results += " <option value='" + authors.author_id + "'>" + authors.author_name + "</option>";
        }

        results += " <option value='new'> Add New Author </option>";
        document.getElementById("newItemAuthorFilter").innerHTML = results;
        //document.getElementById("editItemAuthorFilter").innerHTML = results;
    })
}


function searchByBook() {
    var book = $("#searchItem").val();
    document.getElementById("searchItem").val = "";
    document.getElementById("ulBibliotek").innerHTML = "";

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
    var movie = $("#searchItem").val();
    document.getElementById("searchItem").val = "";
    document.getElementById("ulBibliotek").innerHTML = "";

    $.get("/searchMovie", {
        movie: movie
    }, function (data) {
        for (var i = 0; i < data.movie.length; i++) {
            var movie = data.movie[i];
            document.getElementById("ulBibliotek").innerHTML = "<li>" + movie.movie_name + "</li>";
        }

    })
}

function getAllGenres(callback) {
    console.log("getting all genres");
    $.get("/genres", function (data) {
        var results = "";
        for (var i = 0; i < data.genres.length; i++) {
            var genre = data.genres[i];
            results += " <option value='" + genre.genre_id + "'>" + genre.genre_name + "</option>";
        }

        results += " <option value='new'> Add New Genre </option>";
        document.getElementById("genreFilter").innerHTML = results;
        document.getElementById("newItemGenreFilter").innerHTML = results;
        //document.getElementById("editItemGenreFilter").innerHTML = results;
        callback(null);
    })
}

function getAllSeries() {
    console.log("getting all series");
    $.get("/series", function (data) {
        console.log("Back from the server with series: ");
        console.log(data);
        var results = "";
        for (var i = 0; i < data.series.length; i++) {
            var series = data.series[i];
            results += " <option value='" + series.series_id + "'>" + series.series_name + "</option>";
        }

        results += " <option value='new'> Add New Series </option>";
        document.getElementById("newItemSeriesFilter").innerHTML = results;
        // document.getElementById("editItemSeriesFilter").innerHTML = results;
    })

}

function getAllAuthors() {
    console.log("getting all authors");
    $.get("/authors", function (data) {
        console.log("Back from the server with authors: ");
        console.log(data);
        var results = "";
        for (var i = 0; i < data.authors.length; i++) {
            var authors = data.authors[i];
            results += " <option value='" + authors.author_id + "'>" + authors.author_name + "</option>";
        }
        document.getElementById("newItemAuthorFilter").innerHTML = results;
        //document.getElementById("editItemAuthorFilter").innerHTML = results;
    })

}


function filterByBook() {
    console.log("filtering Books...");

    var genre_id = $("#genreFilter").val();
    //console.log(genre_id);
    $.get("/filterBooks", {
        genre_id: genre_id
    }, function (data) {
        var bookList = "";
        for (var i = 0; i < data.books.length; i++) {
            var book = data.books[i];

            bookList += "<li>" + book.book_name + " " + book.author_name + "</li>";
        }
        document.getElementById("ulBibliotek").innerHTML = bookList;
    })

}

function filterByMovie() {
    console.log("filtering Movies...");

    var genre_id = $("#genreFilter").val();
    //console.log(genre_id);
    $.get("/filterMovies", {
        genre_id: genre_id
    }, function (data) {
        var movieList = "";
        for (var i = 0; i < data.movies.length; i++) {
            var movie = data.movies[i];
            movieList += "<li>" + movie.movie_name + "</li>";
        }
        document.getElementById("ulBibliotek").innerHTML = movieList;
    })

}

function showAuthor(divId, element) {
    document.getElementById(divId).style.display = element.value == 'book' ? 'block' : 'none';
}

function showNewGenre(divId, element) {
    document.getElementById(divId).style.display = element.value == 'new' ? 'block' : 'none';
}

function showNewSeries(divId, element) {
    document.getElementById(divId).style.display = element.value == 'new' ? 'block' : 'none';
}

function showNewAuthor(divId, element) {
    document.getElementById(divId).style.display = element.value == 'new' ? 'block' : 'none';
}


function addNewItem() {
    console.log("adding item");
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("newItemName").innerHTML = "";

    var itemType = $("#addType").val();
    var itemName = $("#newItemName").val();
    var genre_id = $("#newItemGenreFilter").val();
    var series_id = $("#newItemSeriesFilter").val();

    if (itemType == 'book') {
        var author_id = $("#newItemAuthorFilter").val();
        var newBook = {
            genre_id: genre_id,
            book_name: itemName,
            author_id: author_id,
            series_id: series_id
        };

        $.post("/addBook", {
            newBook: newBook
        }, function (data) {
            console.log(data);
            if (data.success == true) {
                document.getElementById("ulBibliotek").innerHTML = "Book added";
            }

        })
    } else {
        var newMovie = {
            genre_id: genre_id,
            movie_name: itemName,
            series_id: series_id
        };
        $.post("/addMovie", {
            newMovie: newMovie
        }, function (data) {
            console.log(data);
            if (data.success == true) {
                document.getElementById("ulBibliotek").innerHTML = "Movie added";
            }

        })

    }


}


function newGenre() {
    //console.log("adding new genre");
    document.getElementById("errorMessage").innerHTML = "";
    var genre = $("#addNewGenre").val();

    document.getElementById("addNewGenre").value = "";

    if (!genre || genre == "New Genre") {
        document.getElementById("errorMessage").innerHTML = "Please enter a valid genre name";

    } else
        $.post("/addGenre", {
            genre: genre
        }, function (data) {
            if (data.duplicate) {
                document.getElementById("errorMessage").innerHTML = data.message;
            } else {
                getAllGenres(function () {
                    setSelectedIndex(document.getElementById("newItemGenreFilter"), genre);
                    document.getElementById("hiddenGenre").style.display = "none";
                })
            }
        })

}

function setSelectedIndex(s, v) {
    console.log("made it to here" + s);
    for (var i = 0; i < s.options.length; i++) {
        console.log(s.options[i].text);
        if (s.options[i].text == v) {
            s.options[i].selected = true;
            return;
        }
    }
}

function newSeries() {
    document.getElementById("errorMessage").innerHTML = "";
    var series = $("#addNewSeries").val();
    document.getElementById("addNewSeries").value = "";

    if (!series || series == "New Series") {
        document.getElementById("errorMessage").innerHTML = "Please enter a valid series name";

    } else {
        $.post("/addSeries", {
            series: series
        }, function (data) {
            if (data.duplicate) {
                document.getElementById("errorMessage").innerHTML = data.message;

            } else {
                getAllSeries(function () {
                    setSelectedIndex(document.getElementById("newItemSeriesFilter"), series);
                    document.getElementById("hiddenSeries").style.display = "none";
                });
            }

        })

    }
}

function newAuthor() {
    document.getElementById("errorMessage").innerHTML = "";
    var author = $("#addNewAuthor").val();
    document.getElementById("addNewAuthor").value = "";

    if (!author || author == "New Author") {
        document.getElementById("errorMessage").innerHTML = "Please enter a valid author name";

    } else {

        $.post("/addAuthor", {
            author: author
        }, function (data) {
            if (data.duplicate) {
                document.getElementById("errorMessage").innerHTML = data.message;

            } else {
                getAllAuthors(function () {
                    setSelectedIndex(document.getElementById("newItemAuthorFilter"), author);
                    document.getElementById("hiddenNewAuthor").style.display = "none";
                });
            }

        })
    }
}

function viewAll() {
    console.log("viewing All...");

    var to_view = $("#viewAllSelect").val();
    //console.log(genre_id);

    switch (to_view) {
        case "books":
            $.get("/viewAllBooks", function (data) {
                var bookList = "";
                type = 1;
                for (var i = 0; i < data.books.length; i++) {
                    var book = data.books[i];

                    bookList += "<li> Name: " + book.book_name + " By: " + book.author_name;
                    if (book.series_id != 21) {
                        bookList += "Series: " + book.series_name;
                    }
                    bookList += "<button onclick='modify(" + book.book_id + "," + type +")'>Edit</button></li>"
                }
                document.getElementById("ulModify").innerHTML = bookList;

            });
            break;
        case "movies":
            $.get("/viewAllMovies", function (data) {
                var movieList = "";
                type = 2;
                for (var i = 0; i < data.movies.length; i++) {
                    var movie = data.movies[i];

                    movieList += "<li> Name: " + movie.movie_name;
                    if (movie.series_id != 21) {
                        movieList += " Series: " + movie.series_name;
                    }
                    movieList += "<button onclick='modify(" + movie.movie_id + "," + type + ")'>Modify</button> <button onclick='del(" + movie.movie_id + "," + type + ")'>Delete</button></li>"
                }
                document.getElementById("ulModify").innerHTML = movieList;

            });
            break;
        case "series":
            $.get("/series", function (data) {
                var seriesList = "";
                var type = 3;
                for (var i = 0; i < data.series.length; i++) {
                    var series = data.series[i];

                    seriesList += "<li> Series: " + series.series_name + "<button onclick='modify(" + series.series_id + "," + type + ")'>Modify</button> <button onclick='del(" + series.series_id + "," + type + ")'>Delete</button> </li>";
                }
             
                document.getElementById("ulModify").innerHTML = seriesList;

            });
            break;
        case "authors":
            $.get("/authors", function (data) {
                var authorsList = "";
                var type = 4;
                for (var i = 0; i < data.authors.length; i++) {
                    var authors = data.authors[i];
                    
                    authorsList += "<li> Author: " + authors.author_name + "<button onclick='modify(" + authors.author_id +","+ type +")'>Modify</button> <button onclick='del(" + authors.author_id +","+ type +")'>Delete</button> </li>";
                }
                document.getElementById("ulModify").innerHTML = authorsList;

            });
            break;

    }

}

function modify(id, type){

    //types 1 = book, 2 = movie, 3 = series, 4 = author
    var id = id;
    var type = type;

    console.log(" this is the mod type: " + type + " this is the id" + id);
}

function del(id, type){

    //types 1 = book, 2 = movie, 3 = series, 4 = author
    var id = id;
    var type = type;

    console.log(" this is the del type: " + type + " this is the id" + id);
}