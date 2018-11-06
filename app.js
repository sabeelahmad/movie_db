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
    db.test();
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
    /* Basic tables that don't have data-integrity constraints */
    let movieTableData = {
        title: req.body.title,
        runtime: req.body.runtime,
        plot: req.body.plot,
        releaseYear: req.body.releaseYear,
    };
    let productionCompanyData = {
        pcName: req.body.pcName,
        pcAddress: req.body.pcAddr,
        pcOwner: req.body.pcOwner,
    }
    let directorName = req.body.director;
    /* Data associated with integrity constraints, need to capture movie_id,
    pc_id, director_id first as they are foreign keys for following data */
    let genres = [];
    if(req.body.genreSelect1 !== undefined) {
        genres.push(req.body.genreSelect1);
    }
    if(req.body.genreSelect2 !== undefined) {
        genres.push(req.body.genreSelect2);
    }
    if(req.body.genreSelect3 !== undefined) {
        genres.push(req.body.genreSelect3);
    }
    if(req.body.genreSelect4 !== undefined) {
        genres.push(req.body.genreSelect4);
    }
    let actors = [];
    for(let counter = 0; counter < req.body.cast_str; counter++) {
        actors.push(req.body[`actor${counter}`]);
    }
    console.log(movieTableData);
    console.log(productionCompanyData);
    console.log(directorName);
    console.log(genres);
    console.log(actors);
    res.send('We are working on form submissions');
});


app.listen(8080, () => {
    console.log('Listening at port 8080.');
});