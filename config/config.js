var config = {};
switch (process.env.NODE_ENV) {
	case 'development':
		config.sessionDatabaseUrl = 'mongodb://localhost/sessions';
		config.databaseUrl = 'mongodb://localhost/application';

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
		clientID : '#',
        clientSecret : '#',
    	callbackURL : '#'
	}
}

		break;
	case 'production':
		config.sessionDatabaseUrl = 'mongodb://localhost/sessions';
		config.databaseUrl = 'mongodb://localhost/application';

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
		clientID : '#',
        clientSecret : '#',
    	callbackURL : '#'
	}
}

		break;

}



module.exports  = config;
