var express = require('express'),
	bodyparser = require('body-parser'),
	mysql = require('mysql'),
	methodOverride = require('method-override');

var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var con = mysql.createConnection({
	host: '127.8.138.2:3306',
	user: 'adminuWSasdC',
	password: 'xWfnmqY9w9i1',
	database: 'todo'
});
/*
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'node'
});
*/

//MIDDLEWARES

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride());

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');


//ROUTING

app.get('/getdata', function(req, res){
	con.query('SELECT description FROM todo;', function(err, results, fields){
		if(err) throw err;
		res.send(JSON.stringify(results));
	});
});

app.post('/add_data', function(req, res){

	console.log('inside post');
	var data = {
		description: req.body.text
	}
	con.query('INSERT INTO todo SET ?', data, function(err, result){
		if(err){
			res.setHeader('Content-Type', 'application/json');
			req.body.status = 'Fail';
			res.end(JSON.stringify(req.body));
		}
		else{
			res.setHeader('Content-Type', 'application/json');
			req.body.status = 'Success';
			res.end(JSON.stringify(req.body));
		}
	});
});

app.delete('/delete_data/:desc', function(req, res){
	var desc = req.params.desc;
	var sql = "DELETE FROM todo WHERE description = '" + desc + "'";
	con.query(sql, function(err, result){
		if(!err){
			req.body.status = 'Deleted';
			res.end(JSON.stringify(req.body));
		}
	});
	
});

app.get('*', function(req, res){
	res.render('index');
});


//SERVER START

app.listen(port, ipaddress, function(){
	console.log("Server started on port " + port + "...");
});