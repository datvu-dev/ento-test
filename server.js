
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var INSTALLS_FILE = path.join(__dirname, 'installs.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as an API server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest number of installs.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// get the latest number of installs.
app.get('/api/installs', function(req, res) {
  fs.readFile(INSTALLS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }

    res.json(JSON.parse(data));
  });
});

// update the number of installs
app.post('/api/installs', function(req, res) {
  fs.readFile(INSTALLS_FILE, function(err, data) {
    if (err) {
      console.error(err);
    }

    var installs = JSON.parse(data);

    var newInstall = {
      id: Date.now()
    };

    installs.push(newInstall);

    fs.writeFile(INSTALLS_FILE, JSON.stringify(installs, null, 4), function(err) {
      if (err) {
        console.error(err);
      }

      res.json(installs);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
