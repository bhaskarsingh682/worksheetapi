require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
// PASSS : 1Nq@dc245
// DATABASE : commoncoresheets
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var Users    = require('./users/users.controller');
var  words = require('./words/words.controller');
app.get("", (req, res) => {
    res.send(
      "<html> <head></head><body style='margin:0px auto'><h1> Welcome To Droupons <a href='https://droupons.arivani.com/'>Home</a> </h1></body></html>"
    );
  });

// api routes
app.use('/users', Users);
app.use('/words', words )

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

