
/*
 * GET home page.
 */
// exports.index = function(req, res){
//   res.render('index', {root: './public'});
// };


// Passport Auth
// app/routes.js
module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index.ejs'); 
	});
	 
	// SIGN UP
	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.session.messages = ('signupMessage') });
	});
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));	
	
	// LOGIN
	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.session.messages = ('signupMessage') }); 
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// =====================================
		// FACEBOOK ROUTES =====================
		// =====================================
		// route for facebook authentication and login
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));
	
	// LOG OUT
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

exports.users = function(db) {
	return function(req, res) {
		var collection = db.get('user');
		collection.find({}, {}, function(e, docs){
			res.render('users.jade', {
				"users" : docs
			});
		});
	};
};


