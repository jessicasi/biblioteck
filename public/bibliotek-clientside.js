function searchByBook() {
    console.log("Searching by book...");
    var book = $("#book").val();
    console.log("Book: " + book);

    $.get("/filter", {book:book}, function (data) {
        console.log("Back from the server with: ");
        console.log(data);

        for (var i = 0; i < data.books.length; i++){
            var book = data.books[i];
            $("#ulBibliotek").append("<li>" + book.name + " " + book.author + "</li>");
        }

    })

}

function searchByMovie() {
    console.log("Searching by movie...");
}