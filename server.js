const express = require('express');
const mongoose = require('mongoose')
const logger = require("morgan");
// define port
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://Fomiller:527996Fomiller@ds233258.mlab.com:33258/heroku_wj77xb0k';
// create express app
const app = express();

// require models

// set up morgan
app.use(logger('dev'))

// set express to be able to use json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve public files
app.use(express.static('public'));


// set up mongoose database
mongoose.connect(MONGODB_URI);

// require routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

// start app
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});