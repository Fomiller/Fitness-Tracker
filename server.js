const express = require('express');
const mongoose = require('mongoose')
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoutsdb', {useNewUrlParser: true});

// require routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});