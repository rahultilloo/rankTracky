var port;
  if(process.env.NODE_ENV == 'development')
  {
port = 3000;
  }else{
port = 80;
  }
var d = new Date(),
month = d.getMonths(),
year = d.getFullYear(),
day = d.getDate();

var TrackModel = require('./app/models/trackModel');
var cronJob = require('cron').CronJob;
var que = []
new cronJob('* * * * * *', function(){
    console.log('You will see this message every second');
TrackModel.find({"positions.created": {"$ne": new Date(year+','+month+','+day) }},function(e,r){

console.log(r)

})

}, null, true, "America/Los_Angeles");


var locomotive = require('locomotive'),
        env = process.env.NODE_ENV || 'production',
        port = port,
        address = '0.0.0.0';
locomotive.boot(__dirname, env, function(err, server) {
        if(err) {
                throw err;
        }
        server.listen(port, address, function() {
                var addr = this.address();
                console.log('listening on http://%s:%d', addr.address, addr.port);
        });
});