'use strict';

const express = require('express');
const indexRoute = require('./routes/indexRoute');
const app = express();

app.use('/games', indexRoute);
app.use('/', express.static('public'));
app.use(express.json());

app.set('port', process.env.PORT || 4000); //running the express app on port 4000, json server running on port 3500.

const server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

// npx json-server --watch db.json --port 3500
// nodemon app.js