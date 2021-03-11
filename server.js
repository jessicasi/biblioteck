const {
    BADHINTS
} = require('dns');
const express = require('express')
const path = require('path')
const {
    Pool
} = require('pg');
const PORT = process.env.PORT || 5000
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString
});


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//app.get('/', (req, res) => res.render('pages/index'));

app.get('/', getGenreLists);
//app.get('/filter', filterItems);
app.listen(PORT, () => console.log(`Listening on ${PORT}`))




function getGenreLists(req, res) {
    console.log("building genre lists");

    var sql = "SELECT genre_name, genre_id FROM genre";

    pool.query(sql, function (err, result) {
        if (err) {
            console.log("unable to generate genre list");
            console.log(err);
            callback(err, null);
        }

        var returned = JSON.stringify(result.rows);
        var parsedJSON = JSON.parse(returned);
        var dropdown = [];
        var ids = []
        for (var i = 0; i < parsedJSON.length; i++) {
            dropdown.push(parsedJSON[i].genre_name);
            ids.push(parsedJSON[i].genre_id);
        }
        res.render('pages/index', {
            dropdown, ids
        });
    })

}

/* // */

/* function getFilteredBooks(id, callback) {
    console.log("getting " + id + "From database");

    var sql = "SELECT b.book_id,b.book_name,b.author_id,b.genre_id,a.author_id,a.author_name FROM book b JOIN author a ON b.author_id = a.author_id WHERE b.genre_id = $1::int";
    var params = [id];

    pool.query(sql, params, function(err, result){
        if (err){
            console.log("An error with the database occurred");
            console.log(err);
            callback(err, null);
        }

        console.log("Found DB result: " + JSON.stringify(result.rows));
        callback(null, result.rows);
    })
} */