var locomotive = require('locomotive'),
	Controller = locomotive.Controller;
var URL = require('url');
var http = require('http')
var PagesController = new Controller();
var unirest = require('unirest');
var async = require('async');
PagesController.main = function() {
	var self = this;
	self.title = ' '
	self.render();
}


PagesController.api = function() {
	var self = this;
	self.title = 'Locomotive'
	var self = this;
	var domain = self.param('website')
	var keywords = self.param('keywords')
	if(keywords == undefined || domain == undefined)
	{
		return false;
	}
	var keywordArray = keywords.split(',') || [];

	var parsedURL = URL.parse(domain);
	console.log(parsedURL)
	if(parsedURL.hostname == undefined)
	{

		 self.res.send({'type':'error',response:'invalid domain'});
		return;
	}
	var arr = [];
	for (var x = 1; x < 11; x++) {
		for (var xx = 0; xx < keywordArray.length; xx++) {
			var keyword = keywordArray[xx];
			arr.push({
				page: x,
				keyword: keyword,
				domain: parsedURL.hostname
			});
		}

	}


	var checkGoogle = function(obj, callback) {
		var r = '--referer "http://smallseotools.com/keyword-position/"'
		var d = '--data "keyword=' + obj.keyword + '&domain=' + obj.domain + '&searchEngine=http%3A%2F%2Fwww.google.com%2F&page=' + obj.page + '"';
		var sock = '--socks5-hostname localhost:9050'
		var endpoint = '"http://smallseotools.com/keywordpos_parser.php?action=check"'
		var cmd = 'curl -v ' + sock + ' ' + r + ' ' + d + ' ' + endpoint;

		console.log('-----')
		// http://nodejs.org/api.html#_child_processes
		var sys = require('sys')
		var exec = require('child_process').exec;
		var child;

		child = exec(cmd, function(error, stdout, stderr) {

				if (stdout == 'SERVICE_UNAVAILABLE') {
					console.log('time to restart tor');
					var child2;
					var child2 = exec('killall -HUP tor', function(error2, stdout2, stderr2) {

						checkGoogle(obj, callback)
					})
				} else {

					callback(null, {
						results: stdout,
						page: obj.page,
						keyword: obj.keyword,
						domain: obj.domain
					})
					if (error !== null) {
						console.log('exec error: ' + error);
					}
				}
				});
		
	}

	async.mapLimit(arr, 10, checkGoogle, function(err, results) {
		self.res.send({
			type: 'success',
			response: results
		})



	});


}



module.exports = PagesController;