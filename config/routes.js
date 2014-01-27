// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('passport');
var Authenticator = require('passport');

module.exports = function routes() {
	this.root('pages#main');

	/** Authentications **/
	this.match('api/track', "pages#api",{via : ['POST','GET']});
		this.match('api/add', "pages#add",{via : ['POST','GET']});
		this.match('api/delete', "pages#delete",{via : ['POST','GET']});

	this.match('subscribe', "pages#subscribe",{via : ['POST','GET']});

	this.match('account', "pages#account",{via : ['POST','GET']});

	this.match('logout', "pages#logout",{via : ['POST','GET']});



	this.match('auth', passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/'
		}), {
			via: 'post'
		});
		//Twitter Strategy
		this.match('auth/twitter', passport.authenticate('twitter')); this.match('auth/twitter/callback', passport.authenticate('twitter'));
		//Facebook Strategy
		this.match('auth/facebook', passport.authenticate('twitter')); this.match('auth/facebook/callback', passport.authenticate('twitter'));
		//Google Strategy
		this.match('auth/google', passport.authenticate('google', {
			accessType: 'offline',
				successRedirect: '/account',
			failureRedirect: '/',
			scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email']
		}),{via:['post','get']}); 

	this.match('auth/google/callback', passport.authenticate('google', {
			accessType: 'offline',
				successRedirect: '/account',
			failureRedirect: '/',
			scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email']
		}),{via:['post','get']}); 


	}