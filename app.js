const express = require('express');
const db = require('./db');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setting EJS as view engine
app.set('view engine', 'ejs');

// Serving static files from public folder
app.use(express.static(__dirname + '/public'));

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// Search Routes
app.get('/search-movie-name', (req, res) => {
    db.allMovies(function(rows) {
        let data = rows;
        res.render('movies', {data: data});
    });
});

app.get('/search-actor-name', (req, res) => {
    res.send('By Actor.');
});

app.get('/search-director-name', (req, res) => {
    res.send('By Director.');
});

app.get('/search-production-company', (req, res) => {
    res.send('By Production Company');
});

app.get('/new', (req, res) => {
    res.render('new');
});

// Submit routes
app.post('/new', (req, res) => {
    console.log(req.body);
    res.send('We are working on form submissions');
});


app.listen(8080, () => {
    console.log('Listening at port 8080.');
});