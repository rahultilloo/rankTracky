var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var URL = require('url');
var http = require('http')
var PagesController = new Controller();
var unirest = require('unirest');
var async = require('async');
PagesController.main = function() {
		var self = this;
	  self.title = ' '
	var self = this;
self.render();
}


PagesController.api = function() {
	var self = this;
	  self.title = 'Locomotive'
	var self = this;
	var domain = self.param('website')
	var keywords = self.param('keywords')
	var keywordArray = keywords.split(',') || [];
	var arr = [];
	for(var x = 0; x < 10; x++)
	{
		for(var xx = 0; xx < keywordArray.length; xx++)
		{
			var keyword = keywordArray[xx];
			arr.push({page : x, keyword:keyword,domain:domain});
		}
		
	}


var checkGoogle = function(obj,callback){
	  var r = '--referer "http://smallseotools.com/keyword-position/"'
var d = '--data "keyword='+obj.keyword+'&domain='+obj.domain+'&searchEngine=http%3A%2F%2Fwww.google.com%2F&page='+obj.page+'"';
var sock = '--socks5-hostname localhost:9050'
var endpoint = '"http://smallseotools.com/keywordpos_parser.php?action=check"'
var cmd = 'curl -v '+sock+' '+r+' '+d+' '+endpoint;

console.log('-----')
// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

child = exec(cmd, function (error, stdout, stderr) {
	console.log(stdout)
callback(null,{results:stdout,page:obj.page,keyword:obj.keyword,domain:obj.domain})
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
}

async.mapLimit(arr, 10, checkGoogle, function(err, results){
   self.res.send({type:'success',response:results})



});


}



module.exports = PagesController;
