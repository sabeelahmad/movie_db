const mysql = require('mysql2');

// Creating connection to db
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbmsproject',
    password: '1234',
    database: 'dbmsproject'
});

// Connect to db
connection.connect();

// Fetch all movies
function allMovies(callback) {
    let query = `SELECT * FROM movie`;
    connection.query(query, (err, rows, columns) => {
        if(err) {
            // log it
            console.log(err);
        } else {
            console.log(rows);
            return callback(rows);
        }
    });
}

exports = module.exports = {
    allMovies,
}
