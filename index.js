var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000
var status = 0;

////////////////
//// PAGES /////
////////////////

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// will match requests to /about
app.get('/master', function (req, res) {
  res.sendFile(__dirname + '/public/pages/master.html');
});

app.use(express.static('public'));

////////////////
/// COMMANDS ///
////////////////

io.on('connection', function(socket){

    // deal with status
    console.log('connected!');

    socket.on('get_status', function (fn) {
      fn(status);
    }); 

    // set status
    socket.on('set_status', function(msg) {
      status = msg;
      io.emit('status_change', status);
    });

    socket.on('inc', function(msg){
         console.log('inc message: ' + msg);
         io.emit('inc', msg);
      });

    socket.on('dec', function(msg){
         console.log('dec message: ' + msg);
         io.emit('dec', msg);
      });

   socket.on('bell', function(msg){
       console.log('bell message: ' + msg);
       io.emit('bell', msg);
    });

    socket.on('synth', function(msg){
       console.log('synth msg: ' + msg);
       io.emit('synth', msg);
    });

});

http.listen(port, function(){
  console.log('listening on:');
  console.log(port);
});

