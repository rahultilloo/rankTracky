var config = {};
switch (process.env.NODE_ENV) {
	case 'development':
		config.sessionDatabaseUrl = 'mongodb://localhost/serpSession';
		config.databaseUrl = 'mongodb://localhost/serpChecker';

config.publishers = {
	Twitter : {
		consumerKey : '#',
		consumerSecret : '#',
		callbackURL : '#'
	},
	Facebook : {
		clientID : '#',
		clientSecret : '#',
		callbackURL : '#'
	},
	Google : {
		clientID : '960742250624-636rq45ajr9kqt80lp64s9hh0nsbggtk.apps.googleusercontent.com',
        clientSecret : 'ZlnTLd3Gl_6eqxkU3jUaFlVk',
    	callbackURL : '/auth/google/callback'
	}
}

		break;
	case 'production':
		config.sessionDatabaseUrl = 'mongodb://127.0.0.1/serpSession';
		config.databaseUrl = 'mongodb://127.0.0.1/serpChecker';

config.publishers = {
	Twitter : {
		consumerKey : '#',
		consumerSecret : '#',
		callbackURL : '#'
	},
	Facebook : {
		clientID : '#',
		clientSecret : '#',
		callbackURL : '#'
	},
	Google : {
		clientID : '960742250624-636rq45ajr9kqt80lp64s9hh0nsbggtk.apps.googleusercontent.com',
        clientSecret : 'ZlnTLd3Gl_6eqxkU3jUaFlVk',
    	callbackURL : '/auth/google/callback'
	}
}

		break;

}



module.exports  = config;
