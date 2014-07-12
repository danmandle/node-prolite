child_process = require('child_process');

exports.nothing = function(req, res) {

	var SerialPort = require('serialport').SerialPort;

	var sp = new SerialPort('/dev/ttyUSB0');
	sp.on('open', function() {
	  sp.write('<ID01><PA>', function(err, result){
	    if(!err) {
	      sp.write('<ID01><PA>Hello World ', function(err, result) {
	        if(!err) {
	          console.log("yay!");
	          res.send('yay')
	        }
	      })
	    }
	  });
	});

};

exports.sendHello = function(req, res){

	var SerialPort = require("serialport").SerialPort
	var serialPort = new SerialPort("/dev/ttyUSB0", {
	  baudrate: 9600
	});

	serialPort.on("open", function () {
	  console.log('Serial Port open');
	  wakeUp();
	  setTimeout(function(){
	  	sendMessage('Hello World!')}, 5000);
	});

	function wakeUp(){
		serialPort.write("<ID01>\r\n", function(err, results) {
		  console.log('err ' + err);
		  console.log('results ' + results);
		});
	}

	function sendMessage(message){
		console.log("starting send message")
		serialPort.write("<ID01><PA> "+message+'\r\n', function(err, results) {
		  console.log('err ' + err);
		  console.log('results ' + results);

		  res.send(console.log('done'));
		});
	}
}

exports.sendMessage = function (req, res){

	var message = req.body.message;



	if(message.length > 1016){
		res.status(406);
		res.send('Message + Color + Functions are too long');
	}
	else{
		child_process.execFile('./sendMessage.sh', [message], [], function(err, stdout, stderr){
			console.log('ran command')
			if(err){
				console.log('ERROR',err)
				res.send(err)
			}
			// if(stdout)
			// 	console.log('stdout',stdout)
			// if(stderr)
			// 	console.log('stderr',stderr)
			if(!err){
				res.send('Message Sent!', message);
			}
		});
	}
}

exports.wake = function (req, res){
	child_process.execFile('./sendMessage.sh', [''], [], function(err, stdout, stderr){
		console.log('ran command')
		if(err){
			console.log('ERROR',err)
			res.send(err)
		}
		if(!err){
			res.send("Awoken");
		}
	});

}