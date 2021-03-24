const express = require('express')
const path = require('path')
require('dotenv').config();
const PORT = process.env.PORT || 5000

//controllers
const searchController = require("./controllers/searchController");
const filterController = require("./controllers/filterController");
const modifyController = require("./controllers/modifyController");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({
    extended: true
})); // support url encoded bodies
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.sendFile(path.join(__dirname+ '/public/bibliotek.html')));

app.get("/genres", searchController.getGenreList)
app.get("/series", searchController.getSeriesList)
app.get("/authors", searchController.getAuthorList)
app.get("/filterBooks", filterController.filterBooks)
app.get("/searchBook", searchController.searchBook)
app.get("/searchMovie", searchController.searchMovie)
app.get("/filterMovies", filterController.filterMovies)
app.get("/allBooks", searchController.getAllBooks)
app.get("/viewAllBooks", searchController.viewAllBooks)
app.get("/viewAllMovies", searchController.viewAllMovies)

//POST
app.post("/addBook", modifyController.addNewBook);
app.post("/addMovie", modifyController.addNewMovie);
app.post("/addGenre", modifyController.addNewGenre);
app.post("/addSeries", modifyController.addNewSeries)
app.post("/addAuthor", modifyController.addNewAuthor)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

//example: app.get("/books", bookController.definedfunctioname)

