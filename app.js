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
    /* Basic tables that don't have data-integrity constraints */
    let movieTableData = [req.body.title, req.body.runtime, req.body.plot, req.body.releaseYear];
    let productionCompanyData = [req.body.pcName, req.body.pcAddr, req.body.pcOwner];
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
    let castData = [req.body.cast_str, req.body.cast_mgr];
    let actors = [];
    for(let counter = 0; counter < req.body.cast_str; counter++) {
        actors.push(req.body[`actor${counter}`]);
    }

    console.log(movieTableData);
    console.log(productionCompanyData);
    console.log(directorName);
    console.log(genres);
    console.log(actors);

    // Calling functions that work on db
    // Welcome to call back hell *_*
    let movieId = -1, pcId = -1, dirId = -1;
    db.createMovieRow(movieTableData, (id) => {
        movieId = id;
        db.createPCRow(productionCompanyData, (id) => {
            pcId = id;
            // Create association between movie and productioncompany
            db.associateMovieToProductionCompany([movieId, pcId]);
        });
        db.createDirectorRow(directorName,  (id) => {
            dirId = id;
            // Create association between movie and director
            db.associateMovieToDirector([movieId, dirId]);
        });
        // Add genres of movie to movie_genre table
        db.createMovieGenres(movieId, genres);
        // Create Cast Table
        castData.push(movieId);
        db.createCast(castData);
        // Add data to actors table
        db.createActors(movieId, actors);
    });
    res.render('submit');
});


app.listen(8080, () => {
    console.log('Listening at port 8080.');
});