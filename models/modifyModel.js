const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false}
});

function insertNewBook() {
    //create new book
}

function insertNewMovie() {
    //create new movie
}


module.exports = {
    insertNewBook: insertNewBook,
    insertNewMovie:insertNewMovie
}