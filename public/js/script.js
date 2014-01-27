var CreditCards = function()
{
  var self = this;
  self.form = {cvc:ko.observable(),cc:ko.observable(),expM:ko.observable(),expY:ko.observable()};
  self.all = ko.observableArray([]);
  self.single = ko.observable([]);

}
var WebsiteModels = function(app)
{
  var self = this;
  self.all = ko.observableArray([])
    self.single = ko.observable({});

}
var Track = function(app)
{
  var self = this;
  self.all = ko.observableArray([]);
  self.single = ko.observable({domain:'',keywords:''});
}
var Models = function(app)
{
  var self = this;
  self.Track = new Track();
    self.Websites = new WebsiteModels();


}
var WebsitesViewModels = function(app)
{
  var self = this;
    self.graph = function(singleWebsite)
{
  console.log(singleWebsite)
    app.Models.Websites.single(singleWebsite);

}
  self.delete = function(singleWebsite)
  {
    app.Models.Websites.single(singleWebsite);
    $.post('/api/delete',{object : 'website',id:singleWebsite._id},function(results){
   if(results.type == "success")
   {
   app.Models.Websites.all.remove(singleWebsite);
   }
    })
  }
   self.add = function(singleWebsite)
  {
    console.log(singleWebsite)
    app.Models.Websites.single(singleWebsite);

  }
}
var ViewModels = function(app)
{
  var self = this;
  self.Track = new Track(app);
  self.Websites = new WebsitesViewModels(app); 
}
var APP = function() {
	var self = this;
  self.ViewModels = new ViewModels(self);
  self.Models = new Models(self);
};
function http(str)
{
    var tarea = str;
    if (tarea.indexOf("http://")==0 && tarea.indexOf("https://")==0) {
        return false
    }
}

$(document).ready(function(){
  console.log(window.tracking)
var app = new APP()
ko.applyBindings(app); 
app.Models.Websites.all(window.tracking);



  var trackDomain = null;
if($.cookie("track"))
{
   trackDomain = JSON.parse($.cookie("track"));
  // $.cookie("track", null);
}
if(trackDomain)
{
  app.Models.Track.single({domain:trackDomain.website,keywords:trackDomain.keywords}) 
  $.cookie("track", null);
}






	$(".loader").hide();
	$('.tags').tagsInput({
		        	"width": "75%",
		        	"height": "70px",
		        	'defaultText':''
	        	});
	$("#submit").on('click',function(e){
		var self = $(this)
		if(self.hasClass('disabled'))
		{
			return false;
		}
	   var website = $.trim($('input[name="website"]').val());
		var keywords = $.trim($('input[name="keywords"]').val());
if(website == '' || keywords == '')
{
	alert('Missing parameters')
	return false;
}
if(http(website) == false)
{
	alert('Needs to be a valid url')
	return;
}


		self.addClass('disabled')
			$(".loader").show();
			$(".button-icon").hide();
		e.preventDefault();
	
	$.post('/api',{website:website,keywords:keywords},function(r){

			$(".loader").hide();
			$(".button-icon").show();
			self.removeClass('disabled');
			if(r.type == 'error')
			{

alert(r.response);
				return;
			}


		app.all(r.response)
	})

	})
})
