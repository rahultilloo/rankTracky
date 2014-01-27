var locomotive = require('locomotive'),
	Controller = locomotive.Controller;
var URL = require('url');
var http = require('http')
var PagesController = new Controller();
var unirest = require('unirest');
var async = require('async');
var TrackModel = require('../models/trackModel');
var AccountModel = require('../models/accountModel');

var Cookies = require( "cookies" )

PagesController.subscribe = function() {
var self = this;
console.log(self.param('stripeToken'));

}
PagesController.main = function() {
	var self = this;
	self.title = ' '
	self.render();
}
PagesController.logout = function() {
	var self = this;
	  self.req.logout();
  self.res.redirect('/');
}




PagesController.account = function() {
		var self = this;
	if(self.req.user == null || self.req.user == undefined)
	{
		self.redirect('/auth/google');
	}
var cookies = new Cookies( self.req, self.res )
var obj = JSON.parse(decodeURIComponent(cookies.get('track')));


async.series([
    function(callback){
       if(obj != undefined && obj.keywords != undefined && obj.domain != undefined)
{
	var TR = new TrackModel();
		TR.keywords = obj.keywords;
		TR.website = obj.domain;
		TR.gid = self.req.user.gid;
		TR.aid = self.req.user._id;
		TR.save(function(ee,rr){
			console.log(ee)
 callback(null, rr);
		})
}else{
 callback(null, null);
}
       
    },
    function(callback){
TrackModel.find({'aid':self.req.user._id},function(e,r){

		callback(e,r)
	
})

    }
],
// optional callback
function(err, results){
   console.log(results)
   if(results)
   {
 self.tracking = JSON.stringify(results[1]);
   }else{
   	 self.tracking = false;
   }
  
   self.render();
});



}

PagesController.add = function() {
	var self = this;
	var self = this;
	var domain = self.param('website');
	var keywords = self.param('keywords');
	AccountModel.findById(self.req.user._id,function(e,r){
		if(r)
	{
		var TR = new TrackModel();
		TR.keywords = keywords;
		TR.domain = domain;
		TR.gid = r.gid;
		TR.aid = r._id;
		TR.save(function(ee,rr){
			self.res.send({'type':'success','response':rr})
		})

	}
	})

}
PagesController.delete = function() {
	var self = this;
	var object = self.param('object');
	var id = self.param('id');
	if(object == 'website')
	{
TrackModel.findById(id).remove(function(e){

	if(e)
	{
		self.res.send({type:'error',response:e})
	}
			self.res.send({type:'success'})

})
	}



}

PagesController.api = function() {
	var self = this;
	var self = this;
	var domain = self.param('website')
	var keywords = self.param('keywords')
   var id  = self.param('id') || null
   var action  = self.param('action') || null

	if(keywords == undefined || domain == undefined)
	{
		return false;
	}
	var keywordArray = keywords.split(',') || [];

	var parsedURL = URL.parse(domain);
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

		// http://nodejs.org/api.html#_child_processes
		var sys = require('sys')
		var exec = require('child_process').exec;
		var child;

		child = exec(cmd, function(error, stdout, stderr) {

				if (stdout == 'SERVICE_UNAVAILABLE' || stdout 'Banned - Access Denied') {
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
		if(action == 'save')
		{

		}else{
		self.res.send({
			type: 'success',
			response: results
		})
		}




	});


}


module.exports = PagesController;