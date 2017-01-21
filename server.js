var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
//express server
var app = express();
// window port environment
var PORT = process.env.PORT || 3000;
var connection;
// parse application
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having
app.use(methodOverride('_method'));
// exphbs
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Serve static content in "public"
app.use(express.static (__dirname + '/public'));



// mysql connect

  if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    connection = mysql.createConnection({
  	host: 'localhost',
  	user: 'root',
  	password: 'utboot',
  	database: 'movie_planner_db'
  });
};

connection.connect(function(err) {
	if(err) {
		console.log('error connecting: ' + err.stack);
		return;
	};

	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
//GET movies data
app.get('/', function(req,res) {
	connection.query('SELECT * FROM movies;', function(err, data) {
		if (err) throw err;
		res.render('index', {movies: data});
	})
})
//  POST new movie data added
app.post('/create', function(req,res){
	connection.query('INSERT INTO movies (movie) VALUES (?);', [req.body.movie], function(err,result) {
		if (err) throw err;
		res.redirect('/'); 
	})
})
//  PUT new movie into list
app.put('/update', function(req,res){

    connection.query('UPDATE movies SET movie = ? WHERE id = ?', [req.body.movie, req.body.id], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});

// Starting our express server
app.listen(PORT, function() {
  console.log("App running through the " + PORT + " Like Drake!");
});







