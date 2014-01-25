var config = {};
switch (process.env.NODE_ENV) {
	case 'development':
		config.sessionDatabaseUrl = 'mongodb://localhost/sessions';
		config.databaseUrl = 'mongodb://localhost/application';
		break;
	case 'production':
		break;

}



module.exports  = config;
