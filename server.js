const { BADHINTS } = require('dns');
const express = require('express')
const path = require('path')
const { Pool } = require('pg');
//const { callbackify } = require('util');
const PORT = process.env.PORT || 5000
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//app.get('/', (req, res) => res.render('pages/index'));

app.get('/', getGenreLists);
app.get('/filter', filterItems);
app.listen(PORT, () => console.log(`Listening on ${PORT}`))




function getGenreLists(req, res){
    console.log("building genre lists");

    var sql="SELECT genre_name FROM genre";

    pool.query(sql, function (err, result){
        if (err){
            console.log("unable to generate genre list");
            console.log(err);
            callback(err, null);
        }

        var returned = JSON.stringify(result.rows);
        var parsedJSON = JSON.parse(returned);
        var dropdown = [];
        for (var i=0; i<parsedJSON.length; i++){
            dropdown.push(parsedJSON[i].genre_name);
        }
        res.render('pages/index', {dropdown});
    })

}

function filterItems(req, res) {
    console.log("made it to filter");
    var inputValue = req.body.genreFilter;
    console.log("Input Value" + inputValue);

}