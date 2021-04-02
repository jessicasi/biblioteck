window.onload = setUpDropDowns;

function setUpDropDowns() {

    //Genre drop downs
    $.get("/genres", function (data) {
        var results = "<option disabled selected> Select Genre </option>";
        for (var i = 0; i < data.genres.length; i++) {
            var genre = data.genres[i];
            // console.log(genre);
            results += " <option value='" + genre.genre_id + "'>" + genre.genre_name + "</option>";
        }

        document.getElementById("genreFilter").innerHTML = results;
        results += " <option value='new'> Add New Genre </option>";

        document.getElementById("newItemGenreFilter").innerHTML = results;
    })

    //series drop downs
    $.get("/series", function (data) {
        var results = "<option disabled selected> Select Series </option>";
        for (var i = 0; i < data.series.length; i++) {
            var series = data.series[i];
            results += " <option value='" + series.series_id + "'>" + series.series_name + "</option>";
        }

        results += " <option value='new'> Add New Series </option>";
        document.getElementById("newItemSeriesFilter").innerHTML = results;
    })

    //author drop downs
    $.get("/authors", function (data) {
        var results = "<option disabled selected> Select Author </option>";
        for (var i = 0; i < data.authors.length; i++) {
            var authors = data.authors[i];
            results += " <option value='" + authors.author_id + "'>" + authors.author_name + "</option>";
        }

        results += " <option value='new'> Add New Author </option>";
        document.getElementById("newItemAuthorFilter").innerHTML = results;

    })
}

function modifyMovieDropDowns(genre_id, series_id, callback) {

    console.log("modify drop downs genre id : " + genre_id + "and series_id:  " + series_id);
    //Genre drop downs
    $.get("/genres", function (data) {
        var results = "<option disabled> Select Genre </option>";
        for (var i = 0; i < data.genres.length; i++) {
            var genre = data.genres[i];
            //console.log("cycle through genre.genre_id: " + genre.genre_id + " genre name: " + genre.genre_name);

            if (genre.genre_id == genre_id) {
                // console.log("this one matches");
                results += " <option value='" + genre.genre_id + "' selected>" + genre.genre_name + "</option>";
            } else {
                results += " <option value='" + genre.genre_id + "'>" + genre.genre_name + "</option>";
            }
        }
        document.getElementById("modGenre").innerHTML = results;
    })

    //series drop downs
    $.get("/series", function (data) {
        var results = "<option disabled> Select Series </option>";
        for (var i = 0; i < data.series.length; i++) {
            var series = data.series[i];
            // console.log("cycle though series.series_id " + series.series_id + "series name " + series.series_name);
            if (series.series_id == series_id) {
                //console.log("this one matches");
                results += " <option value='" + series.series_id + "' selected>" + series.series_name + "</option>";

            } else {

                results += " <option value='" + series.series_id + "'>" + series.series_name + "</option>";
            }
        }
        document.getElementById("modSeries").innerHTML = results;

    })

    callback(null);

}

function modifyBookDropDowns(genre_id, series_id, author_id, callback) {
    console.log("modify drop downs genre id : " + genre_id + "and series_id:  " + series_id);
    //Genre drop downs
    $.get("/genres", function (data) {
        var results = "<option disabled> Select Genre </option>";
        for (var i = 0; i < data.genres.length; i++) {
            var genre = data.genres[i];
            //console.log("cycle through genre.genre_id: " + genre.genre_id + " genre name: " + genre.genre_name);

            if (genre.genre_id == genre_id) {
                // console.log("this one matches");
                results += " <option value='" + genre.genre_id + "' selected>" + genre.genre_name + "</option>";
            } else {
                results += " <option value='" + genre.genre_id + "'>" + genre.genre_name + "</option>";
            }
        }
        document.getElementById("modBookGenre").innerHTML = results;
    })

    //series drop downs
    $.get("/series", function (data) {
        var results = "<option disabled> Select Series </option>";
        for (var i = 0; i < data.series.length; i++) {
            var series = data.series[i];
            // console.log("cycle though series.series_id " + series.series_id + "series name " + series.series_name);
            if (series.series_id == series_id) {
                //console.log("this one matches");
                results += " <option value='" + series.series_id + "' selected>" + series.series_name + "</option>";

            } else {

                results += " <option value='" + series.series_id + "'>" + series.series_name + "</option>";
            }
        }
        document.getElementById("modBookSeries").innerHTML = results;

    })

    //author drop downs
    $.get("/authors", function (data) {
        var results = "<option disabled> Select Author </option>";
        for (var i = 0; i < data.authors.length; i++) {
            var authors = data.authors[i];

            if (authors.author_id == author_id) {
                results += " <option value='" + authors.author_id + "' selected>" + authors.author_name + "</option>";
            } else {
                results += " <option value='" + authors.author_id + "'>" + authors.author_name + "</option>";
            }
        }

        document.getElementById("modBookAuthor").innerHTML = results;

    })

    callback(null);

}


function searchByBook() {
    var book = $("#searchItem").val();
    document.getElementById("searchItem").val = "";
    document.getElementById("ulBibliotek").innerHTML = "";
    document.getElementById("errorSearch").innerHTML = "";
    document.getElementById("results").style.display = "none";
    if (!book) {
        document.getElementById("results").style.display = "block";
        document.getElementById("errorSearch").innerHTML = "Enter a book title to search for";
    } else {

        $.get("/searchBook", {
            book: book
        }, function (data) {
            console.log("Back from the server with: ");
            console.log(data);
            //console.log(data.books);
            if (!data.books.length) {
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = "No books can be found";
            } else {
                var bookList = "<h2>Book Search Results: </h2>";
                for (var i = 0; i < data.books.length; i++) {
                    var book = data.books[i];
                    bookList += "<li><span class='bookName'>" + book.book_name + " </span> by: " + book.author_name + "</li>";
                }
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = bookList;
                }


        })
    }

}

function searchByMovie() {
    var movie = $("#searchItem").val();
    document.getElementById("searchItem").val = "";
    document.getElementById("ulBibliotek").innerHTML = "";
    document.getElementById("errorSearch").innerHTML = "";
    document.getElementById("results").style.display = "none";

    if (!movie) {
        document.getElementById("results").style.display = "block";
        document.getElementById("errorSearch").innerHTML = "Enter a movie title to search for";
    } else {
        $.get("/searchMovie", {
            movie: movie
        }, function (data) {
            if (!data.movie.length) {
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = "No movies can be found";
            } else {
                var movieList = "<h2>Movie Search Results: </h2>";
                for (var i = 0; i < data.movies.length; i++) {
                    var movie = data.movies[i];
                    movieList += "<li class='movieName'>" + movie.movie_name + "</li>";
                }
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = movieList;
                }

        })
    }
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

function getAllSeries(callback) {
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
        callback(null);
    })

}

function getAllAuthors(callback) {
    console.log("getting all authors");
    $.get("/authors", function (data) {
        console.log("Back from the server with authors: ");
        console.log(data);
        var results = "";
        for (var i = 0; i < data.authors.length; i++) {
            var authors = data.authors[i];
            results += " <option value='" + authors.author_id + "'>" + authors.author_name + "</option>";
        }
        results += " <option value='new'> Add New Author </option>";
        document.getElementById("newItemAuthorFilter").innerHTML = results;
        //document.getElementById("editItemAuthorFilter").innerHTML = results;
        callback(null);
    })
}


function filterByBook() {
    console.log("filtering Books...");
    document.getElementById("results").style.display = "none";
    document.getElementById("errorSearch").innerHTML = "";

    var genre_id = $("#genreFilter").val();
    var g = document.getElementById("genreFilter");
    var genre_text = g.options[g.selectedIndex].text;
    setSelectedIndex(document.getElementById("newItemGenreFilter"), "Select Genre");

    if (!genre_id) {
        document.getElementById("results").style.display = "block";
        document.getElementById("errorSearch").innerHTML = "Choose a Genre to Filter Books By";
    } else {
        $.get("/filterBooks", {
            genre_id: genre_id
        }, function (data) {
            if (!data.books.length) {
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = "No books can be found in that genre";
            } else {
                var bookList = "<h2>Results for " + genre_text + " Books: </h2>";
                for (var i = 0; i < data.books.length; i++) {
                    var book = data.books[i];
                    bookList += "<li><span class='bookName'>" + book.book_name + " </span> by: " + book.author_name + "</li>";
                }
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = bookList;
            }
        })
    }

}

function filterByMovie() {
    console.log("filtering Movies...");
    document.getElementById("results").style.display = "none";
    document.getElementById("errorSearch").innerHTML = "";
    var genre_id = $("#genreFilter").val();
    var g = document.getElementById("genreFilter");
    var genre_text = g.options[g.selectedIndex].text;
    setSelectedIndex(document.getElementById("newItemGenreFilter"), "Select Genre");
    if (!genre_id) {
        document.getElementById("results").style.display = "block";
        document.getElementById("errorSearch").innerHTML = "Choose a Genre to Filter Movies By";
    } else {
        $.get("/filterMovies", {
            genre_id: genre_id
        }, function (data) {
            if (!data.movies.length) {
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = "No movies can be found in that genre";
            } else {
                var movieList = "<h2>Results for " + genre_text + " Movies: </h2>";
                for (var i = 0; i < data.movies.length; i++) {
                    var movie = data.movies[i];
                    movieList += "<li class='movieName'>" + movie.movie_name + "</li>";
                }
                document.getElementById("results").style.display = "block";
                document.getElementById("ulBibliotek").innerHTML = movieList;
            }
        })
    }

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
    document.getElementById("errorAdd").innerHTML = "";
    document.getElementById("successAdd").innerHTML = "";


    var itemType = $("#addType").val();
    var itemName = $("#newItemName").val();
    var genre_id = $("#newItemGenreFilter").val();
    var series_id = $("#newItemSeriesFilter").val();

    document.getElementById("newItemName").value = "";
    setSelectedIndex(document.getElementById("newItemGenreFilter"), "Select Genre");
    setSelectedIndex(document.getElementById("newItemSeriesFilter"), "Select Series");


    if (!itemName) {
        document.getElementById("errorAdd").innerHTML = "Please enter Item Name";
    } else {

        if (itemType == 'book') {
            var author_id = $("#newItemAuthorFilter").val();
            var newBook = {
                genre_id: genre_id,
                book_name: itemName,
                author_id: author_id,
                series_id: series_id
            };
            setSelectedIndex(document.getElementById("newItemAuthorFilter"), "Select Author");

            $.post("/addBook", {
                newBook: newBook
            }, function (data) {
                console.log(data);
                if (data.success == true) {
                    document.getElementById("successAdd").innerHTML = "Book added";
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
                    document.getElementById("successAdd").innerHTML = "Movie added";
                }

            })

        }
    }

}


function newGenre() {
    //console.log("adding new genre");
    document.getElementById("errorAdd").innerHTML = "";
    document.getElementById("successAdd").innerHTML = "";
    var genre = $("#addNewGenre").val();

    document.getElementById("addNewGenre").value = "";

    if (!genre || genre == "New Genre") {
        document.getElementById("errorAdd").innerHTML = "Please enter a valid genre name";

    } else
        $.post("/addGenre", {
            genre: genre
        }, function (data) {
            if (data.duplicate) {
                document.getElementById("errorAdd").innerHTML = data.errorMessage;
            } else {
                getAllGenres(function () {
                    if (data.errorMessage) {
                        document.getElementById("errorAdd").innerHTML = data.errorMessage
                    } else {
                        document.getElementById("successAdd").innerHTML = data.successMessage
                        setSelectedIndex(document.getElementById("newItemGenreFilter"), genre);
                        document.getElementById("hiddenGenre").style.display = "none";
                    }
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
    document.getElementById("errorAdd").innerHTML = "";
    document.getElementById("successAdd").innerHTML = "";
    var series = $("#addNewSeries").val();
    document.getElementById("addNewSeries").value = "";

    if (!series || series == "New Series") {
        document.getElementById("errorAdd").innerHTML = "Please enter a valid series name";

    } else {
        $.post("/addSeries", {
            series: series
        }, function (data) {
            if (data.duplicate) {
                document.getElementById("errorAdd").innerHTML = data.errorMessage;

            } else {
                getAllSeries(function () {
                    if (data.errorMessage) {
                        document.getElementById("errorAdd").innerHTML = data.errorMessage
                    } else {
                        document.getElementById("successAdd").innerHTML = data.successMessage
                        setSelectedIndex(document.getElementById("newItemSeriesFilter"), series);
                        document.getElementById("hiddenSeries").style.display = "none";
                    }
                });
            }

        })

    }
}

function newAuthor() {
    document.getElementById("errorAdd").innerHTML = "";
    document.getElementById("successAdd").innerHTML = "";
    var author = $("#addNewAuthor").val();
    document.getElementById("addNewAuthor").value = "";

    if (!author || author == "New Author") {
        document.getElementById("errorAdd").innerHTML = "Please enter a valid author name";

    } else {

        $.post("/addAuthor", {
            author: author
        }, function (data) {
            if (data.duplicate) {
                document.getElementById("errorAdd").innerHTML = data.errorMessage;

            } else {
                getAllAuthors(function () {
                    if (data.errorMessage) {
                        document.getElementById("errorAdd").innerHTML = data.errorMessage
                    } else {
                        document.getElementById("successAdd").innerHTML = data.successMessage
                        setSelectedIndex(document.getElementById("newItemAuthorFilter"), author);
                        document.getElementById("hiddenNewAuthor").style.display = "none";
                    }
                });
            }

        })
    }
}

function viewAll() {
    console.log("viewing All...");
    document.getElementById("hiddenEdit").style.display = "none";
    document.getElementById("viewResults").style.display = "block";


    var to_view = $("#viewAllSelect").val();
    //console.log(genre_id);

    switch (to_view) {
        case "books":
            $.get("/viewAllBooks", function (data) {
                var bookList = "<h2>Books</h2>";
                type = 1;
                for (var i = 0; i < data.books.length; i++) {
                    var book = data.books[i];

                    bookList += "<p><span class='viewAllLabel'> Name:</span> " + book.book_name + "</p><p><span class='viewAllLabel'> By: </span>" + book.author_name + "</p>";
                    if (book.series_id != 21) {
                        bookList += "<p><span class='viewAllLabel'> Series: </span>" + book.series_name + "</p>";
                    }
                    bookList += "<p><a href='#hiddenEdit'><button onclick=\"modifyBook(" + book.book_id + "," + "'" + book.book_name + "'" + "," + book.series_id + "," + book.genre_id + "," + book.author_id + ")\">Modify</button></a></p><hr>"
                }
                document.getElementById("viewResults").innerHTML = bookList;

            });
            break;
        case "movies":
            $.get("/viewAllMovies", function (data) {
                var movieList = "<h2>Movies</h2>";
                for (var i = 0; i < data.movies.length; i++) {
                    var movie = data.movies[i];
                    movieList += "<p><span class='viewAllLabel'> Name: </span>" + movie.movie_name + "</p>";
                    if (movie.series_id != 21) {
                        movieList += " <p><span class='viewAllLabel'>Series: </span>" + movie.series_name + "</p>";
                    }
                    movieList += "<p><a href='#hiddenEdit'><button onclick=\"modifyMovie(" + movie.movie_id + "," + "'" + movie.movie_name + "'" + "," + movie.series_id + "," + movie.genre_id + ")\">Modify</button></a></p><hr>"
                }

                document.getElementById("viewResults").innerHTML = movieList;

            });
            break;
        case "genres":
            $.get("/genres", function (data) {
                var genreList = "<h2>Genres</h2>";
                type = 3;
                for (var i = 0; i < data.genres.length; i++) {
                    var genre = data.genres[i];

                    genreList += "<p>" + genre.genre_name + "</p><p><a href='#hiddenEdit'><button onclick=\"modify(" + genre.genre_id + "," + type + "," + "'" + genre.genre_name + "'" + ")\">Modify</button></a></p><hr>";
                }

                document.getElementById("viewResults").innerHTML = genreList;

            });
            break;
        case "series":
            $.get("/series", function (data) {
                var seriesList = "<h2>Series</h2>";
                var type = 4;
                for (var i = 0; i < data.series.length; i++) {
                    var series = data.series[i];

                    seriesList += "<p>" + series.series_name + "</p> <p> <a href='#hiddenEdit'><button onclick=\"modify(" + series.series_id + "," + type + "," + "'" + series.series_name + "'" + ")\">Modify</button></a></p><hr>";
                }

                document.getElementById("viewResults").innerHTML = seriesList;

            });
            break;
        case "authors":
            $.get("/authors", function (data) {
                var authorsList = "<h2>Authors</h2>";
                var type = 5;
                for (var i = 0; i < data.authors.length; i++) {
                    var authors = data.authors[i];

                    authorsList += "<p>" + authors.author_name + "</p><p><a href='#hiddenEdit'><button onclick=\"modify(" + authors.author_id + "," + type + "," + "'" + authors.author_name + "'" + ")\">Modify</button></a></p><hr>";
                }
                document.getElementById("viewResults").innerHTML = authorsList;

            });
            break;

    }

}

function modifyBook(book_id, book_name, series_id, genre_id, author_id) {
    document.getElementById("hiddenEdit").style.display = "block";
    var genre_id = genre_id;
    var series_id = series_id;
    var author_id = author_id;

    var mods = "<p class='text-center'>" + book_name + "<p>";
    mods += "<label class='col1'>Name</label><textarea rows='1' value= ' id='bookNameUpdate' class='col2'>" + book_name + "</textarea><br>"
    mods += "<label class='col1'>Genre</label> <select id='modBookGenre' class='col2'></select><br>";
    mods += "<label class='col1'>Series</label><select id='modBookSeries' class='col2'></select><br>";
    mods += "<label class='col1'>Author</label><select id='modBookAuthor' class='col2'></select><br>";
    modifyBookDropDowns(genre_id, series_id, author_id, function () {
        mods += "<div class='d-flex justify-content-center'><button class='button-right' onclick=\"updateBook(" + book_id + ")\">Update</button><button class='button-right' onclick=\"delBook(" + book_id + ")\">Delete</button></div>"
        document.getElementById("edit-form").innerHTML = mods;
    })
}

function modifyMovie(movie_id, movie_name, series_id, genre_id) {


    document.getElementById("hiddenEdit").style.display = "block";
    var genre_id = genre_id;
    var series_id = series_id;

    var mods = "<p class='text-center'> " + movie_name + "<p>";
    mods += "<label class='col1'>Name</label><input value= '" + movie_name + "' id='movieNameUpdate' class='col2'><br>"
    mods += "<label class='col1'>Genre</label><select id='modGenre' class='col2'></select><br>";
    mods += "<label class='col1'>Series</label><select id='modSeries' class='col2'></select><br>";
    modifyMovieDropDowns(genre_id, series_id, function () {
        mods += "<div class='d-flex justify-content-center'><button class='button-right'<button class='button-right' onclick=\"updateMovie(" + movie_id + ")\">Update</button><button class='button-right' onclick=\"delMovie(" + movie_id + ")\">Delete</button></div>"
        document.getElementById("edit-form").innerHTML = mods;
    })



}

function modify(id, type, name) {
    //types 1 = book, 2 = movie, 3 = genre, 4 = series, 5 = author

    document.getElementById("hiddenEdit").style.display = "block";
    var id = id;
    var type = type;
    var mods = "";
    var name = name;
    console.log(name);

    switch (type) {
        case 3:
            mods += "<p class='text-center'> Genre: " + name + " </p> <p><input value= '" + name + "' id='genreUpdate'></p>";
            mods += "<div class='d-flex justify-content-center'><button class='button-right' onclick=\"update(" + id + ',' + type + ")\">Update</button><button class='button-right' onclick=\"del(" + id + ',' + type + ")\">Delete</button></div>"
            document.getElementById("edit-form").innerHTML = mods;

            break;
        case 4:
            mods += "<p class='text-center'> Series: " + name + "  </p> <p><input value= '" + name + "' id='seriesUpdate'></p>";
            mods += "<div class='d-flex justify-content-center'><button class='button-right' onclick=\"update(" + id + ',' + type + ")\">Update</button><button class='button-right' onclick=\"del(" + id + ',' + type + ")\">Delete</button></div>"
            document.getElementById("edit-form").innerHTML = mods;
            break;
        case 5:
            mods += "<p class='text-center'>  Author: " + name + " Author: </p> <p><input value= '" + name + "' id='authorUpdate'></p>";
            mods += "<div class='d-flex justify-content-center'><button class='button-right' onclick=\"update(" + id + ',' + type + ")\">Update</button><button class='button-right' onclick=\"del(" + id + ',' + type + ")\">Delete</button></div>"
            document.getElementById("edit-form").innerHTML = mods;
            break;
    }
    //console.log(" this is the mod type: " + type + " this is the id" + id);
}

function updateMovie(movie_id) {

    var movie_id = movie_id
    var movie_name = $("#movieNameUpdate").val();
    var genre_id = $("#modGenre").val();
    var series_id = $("#modSeries").val();

    var movieUpdate = {
        movie_id: movie_id,
        movie_name: movie_name,
        genre_id: genre_id,
        series_id: series_id
    }

    $.post("/updateMovie", {
        movieUpdate: movieUpdate
    }, function (data) {
        if (data.errorMessage) {
            document.getElementById("errorMod").innerHTML = data.errorMessage;
        } else {
            document.getElementById("successMod").innerHTML = data.successMessage;
        }
        document.getElementById("hiddenEdit").style.display = "none";
        document.getElementById("ulModify").innerHTML = "";
        document.getElementById("ulModify").style.display = "none";


    })

}

function updateBook(book_id) {
    var book_id = book_id
    var book_name = $("#bookNameUpdate").val();
    var genre_id = $("#modBookGenre").val();
    var series_id = $("#modBookSeries").val();
    var author_id = $("#modBookAuthor").val();

    var bookUpdate = {
        book_id: book_id,
        book_name: book_name,
        genre_id: genre_id,
        series_id: series_id,
        author_id: author_id
    }

    $.post("/updateBook", {
        bookUpdate: bookUpdate
    }, function (data) {
        if (data.errorMessage) {
            document.getElementById("errorMod").innerHTML = data.errorMessage;
        } else {
            document.getElementById("successMod").innerHTML = data.successMessage;
        }
        document.getElementById("hiddenEdit").style.display = "none";
        document.getElementById("ulModify").innerHTML = "";
        document.getElementById("ulModify").style.display = "none";


    })


}

function update(id, type) {
    //types 1 = book, 2 = movie, 3 = genre, 4 = series, 5 = author
    var id = id;
    var type = type;


    switch (type) {
        case 3:
            var genre_name = $("#genreUpdate").val();
            var newGenre = {
                genre_name: genre_name,
                genre_id: id
            }
            $.post("/updateGenre", {
                newGenre: newGenre
            }, function (data) {
                if (data.errorMessage) {
                    document.getElementById("errorMod").innerHTML = data.errorMessage;
                } else {
                    document.getElementById("successMod").innerHTML = data.successMessage;
                }
                getAllGenres(function () {
                    document.getElementById("hiddenEdit").style.display = "none";
                    document.getElementById("ulModify").innerHTML = "";
                    document.getElementById("ulModify").style.display = "none";
                })

            })
            break;
        case 4:
            var series_name = $("#seriesUpdate").val();
            var newSeries = {
                series_name: series_name,
                series_id: id
            }
            $.post("/updateSeries", {
                newSeries: newSeries
            }, function (data) {
                if (data.errorMessage) {
                    document.getElementById("errorMod").innerHTML = data.errorMessage;
                } else {
                    document.getElementById("successMod").innerHTML = data.successMessage;
                }
                getAllSeries(function () {
                    document.getElementById("hiddenEdit").style.display = "none";
                    document.getElementById("ulModify").innerHTML = "";
                    document.getElementById("ulModify").style.display = "none";
                })

            })
            break;
        case 5:
            var author_name = $("#authorUpdate").val();
            var newAuthor = {
                author_name: author_name,
                author_id: id
            }
            $.post("/updateAuthor", {
                newAuthor: newAuthor
            }, function (data) {
                if (data.errorMessage) {
                    document.getElementById("errorMod").innerHTML = data.errorMessage;
                } else {
                    document.getElementById("successMod").innerHTML = data.successMessage;
                }
                getAllAuthors(function () {
                    document.getElementById("hiddenEdit").style.display = "none";
                    document.getElementById("ulModify").innerHTML = "";
                    document.getElementById("ulModify").style.display = "none";
                })

            })
            break;
    }
}

function delMovie(movie_id) {
    var movie_id = movie_id;

    $.post("/deleteMovie", {
        movie_id: movie_id
    }, function (data) {
        if (data.errorMessage) {
            document.getElementById("errorMod").innerHTML = data.errorMessage;
        } else {
            document.getElementById("successMod").innerHTML = data.successMessage;
        }
        document.getElementById("hiddenEdit").style.display = "none";
        document.getElementById("ulModify").innerHTML = "";
        document.getElementById("ulModify").style.display = "none";
    })
}

function delBook(book_id) {
    var book_id = book_id;

    $.post("/deleteBook", {
        book_id: book_id
    }, function (data) {
        if (data.errorMessage) {
            document.getElementById("errorMod").innerHTML = data.errorMessage;
        } else {
            document.getElementById("successMod").innerHTML = data.successMessage;
        }
        document.getElementById("hiddenEdit").style.display = "none";
        document.getElementById("ulModify").innerHTML = "";
        document.getElementById("ulModify").style.display = "none";
    })

}


function del(id, type) {

    //types 1 = book, 2 = movie, 3 = genre, 4 = series, 5 = author
    console.log("deleting: " + id + " " + type);

    switch (type) {
        case 3:
            var genre_name = $("#genreUpdate").val();
            var deleteGenre = {
                genre_name: genre_name,
                genre_id: id
            }
            $.post("/deleteGenre", {
                deleteGenre: deleteGenre
            }, function (data) {
                if (data.errorMessage) {
                    document.getElementById("errorMod").innerHTML = data.errorMessage;
                } else {
                    document.getElementById("successMod").innerHTML = data.successMessage;
                }
                getAllGenres(function () {
                    document.getElementById("hiddenEdit").style.display = "none";
                    document.getElementById("ulModify").innerHTML = "";
                    document.getElementById("ulModify").style.display = "none";


                })

            })
            break;
        case 4:
            var series_name = $("#seriesUpdate").val();
            var deleteSeries = {
                series_name: series_name,
                series_id: id
            }
            $.post("/deleteSeries", {
                deleteSeries: deleteSeries
            }, function (data) {
                if (data.errorMessage) {
                    document.getElementById("errorMod").innerHTML = data.errorMessage;
                } else {
                    document.getElementById("successMod").innerHTML = data.successMessage;
                }
                getAllSeries(function () {
                    document.getElementById("hiddenEdit").style.display = "none";
                    document.getElementById("ulModify").innerHTML = "";
                    document.getElementById("ulModify").style.display = "none";


                })

            })
            break;
        case 5:
            var author_name = $("#authorUpdate").val();
            var deleteAuthor = {
                author_name: author_name,
                author_id: id
            }
            $.post("/deleteAuthor", {
                deleteAuthor: deleteAuthor
            }, function (data) {
                if (data.errorMessage) {
                    document.getElementById("errorMod").innerHTML = data.errorMessage;
                } else {
                    document.getElementById("successMod").innerHTML = data.successMessage;
                }
                getAllAuthors(function () {
                    document.getElementById("hiddenEdit").style.display = "none";
                    document.getElementById("ulModify").innerHTML = "";
                    document.getElementById("ulModify").style.display = "none";
                })

            })
            break;
    }
}