
exports.handler = function(err, req, res, next){
	var msg = err.message ? err.message : "Invalid request";
	res.send(500, { error: msg});
}

exports.notFound = function(req, res, next){
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
	res.sendfile('404.html', {root: './public'});
	return;
	}

	// respond with json
	if (req.accepts('json')) {
	res.send({ error: 'Not found' });
	return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
}