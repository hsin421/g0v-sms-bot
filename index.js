var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var app = express();
var adminContacts = require('./adminContacts.json');
var attendeeContacts = require('./attendeeContacts.json');
app.set('port', (process.env.PORT || 3333));
app.use(bodyParser.urlencoded({ extended: true }));

var accountSid = 'TWILIO-SID'; 
var authToken = 'TWILIO-AUTHTOKEN';

app.post('/sms', function(req, res) {
	console.log(req.body);
  var twilio = require('twilio');
  var client = require('twilio')(accountSid, authToken);
  var twiml = new twilio.TwimlResponse();
  if (req.body.Body.includes('To all:') && req.body.From === '+1' + "MAIN-ADMIN-PHONE-NUMBER (without +1)") {
  	var toAllMsg = req.body.Body.split(':')[1];
  	attendeeContacts.forEach((e) => {
  		client.messages.create({ 
	    to: "+1" + e.phone, 
	    from: "YOUR-TWILIO-NUMBER", 
	    body: toAllMsg, 
			}, function(err, message) { 
			    if (!err) {
			    	console.log('Message sent successfully to ' + e.name);
			    } else {
			    	console.log('Message failed to send to ' + e.name);
			    }
			});
  	})
 
  } else {
  	adminContacts.forEach((e) => {
  		if ('+1' + e.phone !== req.body.From) {
	  		client.messages.create({ 
		    to: "+1" + e.phone, 
		    from: "YOUR-TWILIO-NUMBER", 
		    body: req.body.Body + '\nFrom: ' + req.body.From, 
				}, function(err, message) { 
				    if (!err) {
				    	console.log('Message sent successfully to ' + e.name);
				    } else {
				    	console.log('Message failed to send to ' + e.name);
				    }
				});
	  	}
  	});
  	if (!adminContacts.some(e => ('+1' + e.phone) === req.body.From)) {
  		twiml.message('Your message is sent to rapid response team, thanks');
  	}
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/voice', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  // twiml.say('Thank you for calling g 0 v N Y C. If you have an emergency please text us directly. Goodbye!');
  twiml.say('你好 這裡是g 0 v n y c 語音系統 如果您有緊急需求 請直接傳簡訊給我們 謝謝', {voice: "alice", language: "zh-TW"});
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})