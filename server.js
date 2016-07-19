var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
// var mailgunApiKey = 'key-8a6f961d68ed6c16ac83dfaf60b96001'
// var mailgunDomain = 'sandbox1783d6090dde4d9f96975ffc132f7e2a.mailgun.org'
// var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain });
//TODO!!!! FIX
// var TWILIO_ACCOUNT_SID = "ACe79d77e7c4ba09bf36b0fd4b75681bff"
// var TWILIO_AUTH_TOKEN = "f236b24df4564cb72a9c2126066a778f"
// var twilio = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
var http = require('http').Server(app);
// var io = require('socket.io')(http)
// var unirest = require("unirest");
var Firebase = require('firebase');
var fs = require('fs')
// var users = require('./server/users')
//
// var lcbPost = unirest("POST", "https://wslcb.mjtraceability.com/serverjson.asp");
// lcbPost.headers({
//   "cache-control": "no-cache",
//   "content-type": "application/json"
// });
// lcbPost.type("json");

app.set('views', __dirname + '/app');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(request, response) {
    response.render('index.html');
});

function placeholder(req, res, next) { return res.send("Endpoint Not Yet Implemented.")}
// app.post('/api/looneytunes/create', fbc.createLooneyTune);

// WTS
// var wts = require('./server/wts.js');
// app.post('/api/v0/wts/create', wts.create)
// app.get('/api/v0/wts/get/:ubi', wts.get)

// Response Formatter

// app.get('/api/response-formatter', pnResponseFormatter.format)

// var inbound_transfers = require('./server/inbound_transfers.js');
// app.get('/server/inbound_transfers/:sessionid/:location', inbound_transfers.get)
// Sync Check
var sync_check = require('./server/sync_check.js');
app.get('/api/sync_check/:sessionid', sync_check.get)

// Inventory Manifest
var manifests = require('./server/manifests.js');
app.post('/api/manifests/create', manifests.create)
app.get('/api/manifests/:sessionid', manifests.get)

// Plants
// var plants = require('./server/plants.js');
// app.get('/api/plants/:sessionid', plants.get)

// Vehicles
// var vehicles = require('./server/vehicles.js');
// app.get('/api/vehicles/:sessionid', vehicles.get)

// Employees
// var employees = require('./server/employees.js');
// app.get('/api/employees/:sessionid', employees.get)

// Inventory
// var inventory = require('./server/inventory.js');
// app.get('/api/inventory/:sessionid', inventory.get)

// Post Wrapper
var postWrapper = require('./server/post-wrapper.js')
app.post('/api/post-wrapper', postWrapper.post)

// Vendors
var vendors = require('./server/vendors.js');
        // vendors.refresh()
app.get('/api/vendors', vendors.get);
app.get('/api/vendors/:ubi', vendors.get);

// LABS
var labs = require('./server/labs.js');


// AUTH TODO: MOVE TO OWN FILE
app.post('/api/auth/v0/signIn', function(req, res) {
    console.log(req.body);
    var lcbRequest = {
        "API": "4.0",
        "action": "login",
        "username": req.body.username,
        "password": req.body.password,
        "license_number": req.body.license_number
    };

    request({
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,   // <--Very important!!!
        body: lcbRequest
    }, function (error, response, body){
        res.send(body);
    });

    // res.send(req.body)

});



var mongoose = require('mongoose');
mongoose.connect('mongodb://robot:suzi99@ds061355.mongolab.com:61355/potnet');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB Connected');
});
var hport = process.env.PORT || 5000;
var sport = process.env.PORT || 8000;
http.listen(sport, function() {
    console.log("Listening on " + sport);
});
