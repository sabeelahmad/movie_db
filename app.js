const express = require('express');
const db = require('./db');
let app = express();

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
    res.send('By Name.');
    db.testquery();
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


// Submit routes
app.get('/form-movie', (req, res) => {
    res.send('form to submit here.');
});


app.listen(8080, () => {
    console.log('Listening at port 8080.');
});