const express = require('express');
const bodyParser = require('body-parser');
const layout = require('express-ejs-layouts');
const morgan = require('morgan'); // logger
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session"); // session stuff
const cookieParser = require('cookie-parser'); // cookie parser

require('dotenv').config();

const app = express();

// database
mongoose.connect(process.env.db_ip, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('connected to mongodb yahoo !'));

// passport
require("./config/passport")(passport); // -> passport.js
app.use(session({ secret: "super secret", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(express.static(__dirname + '/public/css')); // -> css folder
app.use(express.static(__dirname + '/public/js')); // -> js folder
app.use(morgan('dev')); // logs every request to console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', process.env.port || 3000); // set port
app.set('views', __dirname + '/views'); // link views folder
app.set('view engine', 'ejs'); // config ejs
app.use(layout);
app.use(cookieParser());

// routes
require('./routes/homePage')(app); // homePage.js
require('./routes/artistPage')(app); // artistPage.js
require('./routes/songPage')(app); // songPage.js
require('./routes/about')(app); // about.js
require('./routes/register')(app, passport); // register.js
require('./routes/login')(app, passport); // login.js
require('./routes/profile')(app); // profile.js
require('./routes/addSong')(app); // addSong.js
require('./routes/updateDeleteSong')(app); // updateDeleteSong.js
require('./routes/fanRoute')(app); // fanRoute.js


// server listening
app.listen(3000, () => console.log('listening on 3000'));
