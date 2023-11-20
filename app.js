// app.js
// Main entry point for application

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser= require('body-parser');
const app = express();
const { getHomePage} = require('./routes/index');
const game = require('./routes/game');
const game_session = require('./routes/game_session');

const fs = require('fs');
const rawdata = fs.readFileSync('config.json'); //read in config.json
const config = JSON.parse(rawdata); //parse config.json

const appPort = config.app.port;
const dbHost = config.database.host;
const dbPort = config.database.port;
const dbName = config.database.name;
const dbUser = config.database.user;
const dbPassword = config.database.password;
// TODO: application port should come from config file
const port = appPort;

// TODO: database connection parameters should come from config file
//replace strings with parameters from config file (saftey)
const db = mysql.createConnection({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
	database: dbName})
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
});

global.db = db;

app.set('port', process.env.port || dbPort);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
	getHomePage(req, res, db);
  });
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game', game.getEdit);
app.post('/edit-game', game.postEdit);
app.get('/add-game-session', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
