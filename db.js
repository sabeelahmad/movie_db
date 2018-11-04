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

// test query
function testquery() {
    connection.query('SELECT 1+1 AS solution', (err, results, fields) => {
        if(err) {
            // logging error
            console.log(err);
        } else {
            // logging rows and columns
            console.log(results);
            console.log(fields);
        }
    });
}

exports = module.exports = {
    testquery,
}
