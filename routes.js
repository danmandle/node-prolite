exports.routes = function (app){
	app.get('/', function(req, res){res.render('index.ejs')});
	app.get('/nothing', require('./controllers/sendMessages.js').nothing);
	app.get('/sendHello', require('./controllers/sendMessages.js').sendHello);
	app.post('/sendMessage', require('./controllers/sendMessages.js').sendMessage);
	app.get('/wake', require('./controllers/sendMessages.js').wake);
}