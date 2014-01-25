var express = require('express'),
    util = require('util'),
    config = require('../config'),
    mongoStore = require('connect-mongo')(express),
    mongoose = require('mongoose'),
    passport = require('passport');


console.log(process.env.NODE_ENV)

module.exports = function() {


    //auto load helpers and logged in account

    // Warn of version mismatch between global "lcm" binary and local installation of Locomotive.
    if (this.version !== require('locomotive').version) {
        var msg = 'version mismatch between local (%s) and global (%s) Locomotive module';
        console.warn(util.format(msg, require('locomotive').version, this.version));
    }

    // Configure application settings.  Consult the Express API Reference for a
    // list of the available [settings](http://expressjs.com/api.html#app-settings).
    this.set('views', __dirname + '/../../app/views');
    this.set('view engine', 'ejs');

    // Register EJS as a template engine.
    this.engine('ejs', require('ejs-locals'));

    // Override default template extension.  By default, Locomotive finds
    // templates using the `name.format.engine` convention, for example
    // `index.html.ejs`  For some template engines, such as Jade, that find
    // layouts using a `layout.engine` notation, this results in mixed conventions
    // that can cuase confusion.  If this occurs, you can map an explicit
    // extension to a format.
    this.format('html', {
        extension: '.ejs'
    });

    // Register formats for content negotiation.  Using content negotiation,
    // different formats can be served as needed by different clients.  For
    // example, a browser is sent an HTML response, while an API client is sent a
    // JSON or XML response.
    /* this.format('xml', { engine: 'xmlb' }); */

    // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
    // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
    // middleware available as separate modules.
    this.use(express.logger());
    this.use(express.favicon());
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.cookieParser());
    this.use(express.bodyParser());
    this.use(express.session({
        secret: 'asdhwhnxxiou1mizxehdncfx3gx',
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        },
        store: new mongoStore({
            url: config.sessionDatabaseUrl,
            clear_interval: -1
        })
    }));
    this.use(express.methodOverride());
    this.use(passport.initialize());
    this.use(passport.session());
    this.datastore(require('locomotive-mongoose'));
    this.use(this.router);
   

}