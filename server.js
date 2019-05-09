var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	return res.send({error:true, message : 'hello world'});
});

var dbcon = mysql.createConnection({host:'localhost',user:'root',password:'',database:'bonitasoft_json' });
dbcon.connect();

app.get('/users',function(req,res){
dbcon.query('select * from people_data', function (error, results, fields){
	if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
	});

});

app.get('/users/:id',function (req, res){

	let user_id = req.params.id;
	if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

	dbcon.query('select * from people_data where id=?',user_id,function(error, results,fields){
		if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
	});
});

app.listen(3000,function(){
	console.log('Node app is on port 3000');
});

module.exports = app;