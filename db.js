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
    let sql = `SELECT * FROM production_company`;
    connection.query(sql, (err, rows, cols) => {
        console.log(rows);
        console.log(rows.length);
    });
}

// Create movie table and store movieid
function createMovieRow(data, cb) {
    let sql = `INSERT INTO movie (title, runtime, plot, release_year) VALUES (?, ?, ?, ?)`
    connection.query(sql, data, (err, rows, cols) => {
        if(err) {
            console.log(err);
        } else {
            return cb(rows.insertId);
        }
    });
}

// Create pc table and store pcid
function createPCRow(data, cb) {
    // Check if company already exists
    let checkSql = 'SELECT * FROM production_company WHERE pc_name = ? AND pc_address = ? AND pc_owner = ?';
    connection.query(checkSql, data, (err, rows, cols) => {
        if(err) {
            console.log(err);
        } else {
            if(rows.length === 0) {
                // Insert into pc table
                let sql = `INSERT INTO production_company(pc_name, pc_address, pc_owner) VALUES(?, ?, ?)`;
                connection.query(sql, data, (err, rows, cols) => {
                    if(err) {
                        console.log(err);
                    } else {
                        return cb(rows.insertId);
                    }
                });
            } else {
                // get row ka id
                return cb(rows[0].pc_id);
            }
        }
    });
}

// Create director table and store directorid
function createDirectorRow(data, cb) {
    // Check if director already exists
    let checkSql = 'SELECT * FROM director WHERE director_name = ?';
    connection.query(checkSql, data, (err, rows, cols) => {
        if(err) {
            console.log(err);
        } else {
            if(rows.length === 0) {
                // Insert into pc table
                let sql = `INSERT INTO director(director_name) VALUES(?)`;
                connection.query(sql, data, (err, rows, cols) => {
                    if(err) {
                        console.log(err);
                    } else {
                        return cb(rows.insertId);
                    }
                });
            } else {
                // get row ka id
                return cb(rows[0].director_id);
            }
        }
    });    
}

// Create movie genre table
function createMovieGenres(id, data) {
    for(let i = 0; i < data.length; i++) {
        let sql = `INSERT INTO movie_genre(movie_id, genre) VALUES(?, ?)`;
        connection.query(sql, [id, data[i]], (err, rows, cols) => {
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
            }
        });
    }
}

// Create producedby table
function associateMovieToProductionCompany(data) {
    let sql = `INSERT INTO produced_by(movie_id, pc_id) VALUES (?, ?)`;
    connection.query(sql, data, (err, rows, cols) => {
        if(err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    });
}

// Create directyby table
function associateMovieToDirector(data) {
    let sql = `INSERT INTO directed_by(movie_id, director_id) VALUES (?, ?)`;
    connection.query(sql, data, (err, rows, cols) => {
        if(err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    });
}

// Create castofmovie table
function createCast(data) {
    let sql = `INSERT INTO cast_of_movie(cast_strength, casting_manager, movie_id) VALUES (?, ?, ?)`;
    connection.query(sql, data, (err, rows, cols) => {
        if(err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    })
}
// Create actors table
function createActors(id, data) {
    for(let i = 0; i < data.length; i++) {
        let sql = `INSERT INTO cast_actor(movie_id, actor_name) VALUES(?, ?)`;
        connection.query(sql, [id, data[i]], (err, rows, cols) => {
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
            } 
        });
    }
}

exports = module.exports = {
    test,
    createMovieRow,
    createPCRow,
    createDirectorRow,
    associateMovieToProductionCompany,
    associateMovieToDirector,
    createMovieGenres,
    createCast,
    createActors,
}
