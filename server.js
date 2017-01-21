var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

var app = express();
// Serve static content in "public"
app.use(express.static (__dirname + '/public'));
// parse application
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having
app.use(methodOverride('_method'))

// exphbs
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// mysql connect
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'movie_planner_db'
});

connection.connect(function(err) {
	if(err) {
		console.log('error connecting: ' + err.stack);
		return;
	};

	console.log('connected as id ' + connection.threadId);
});

app.get('/', function(req,res) {
	connection.query('SELECT * FROM movies;', function(err, data) {
		if (err) throw err;

		res.render('index', {movies: data});
	});
});

app.post('/create', function(req,res){
	connection.query('INSERT INTO movies (movie) VALUES (?)', [res.body.plan], function(err,result) {
		if (err) throw err;
		res.redirect('/'); 
	});
});

app.put('/update', function(req, res) {

	connection.query('UPDATE movies SET movie = ? WHERE id = ?', [req.body.movie, req.body.id], function(err,result){
		if (err) throw err;
		res.redirect('/');
	});
});

var port = 3000;
app.listen(port);










