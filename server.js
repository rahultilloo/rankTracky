var port;
  if(process.env.NODE_ENV == 'development')
  {
port = 3000;
  }else{
port = 80;
  }

var locomotive = require('locomotive'),
        env = process.env.NODE_ENV || 'production',
        port = port,
        address = '0.0.0.0';
console.log("Locomotive Booting");
locomotive.boot(__dirname, env, function(err, server) {
        if(err) {
                throw err;
        }
        server.listen(port, address, function() {
                var addr = this.address();
                console.log('listening on http://%s:%d', addr.address, addr.port);
        });
});