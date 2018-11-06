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

//test query
function test() {
    let sql = `INSERT INTO movie(runtime, release_year, plot, title) VALUES ('02:34', 2018, 'gibberish', 'testMovie')`;
    connection.query(sql, (err, rows, cols) => {
        console.log(rows);
        console.log(cols);
        console.log(rows.insertId); //capturing id
    });
}

exports = module.exports = {
    test,
}
