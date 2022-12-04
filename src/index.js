const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
var morgan = require('morgan');
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db')

// Connect to DB
db.connect();

const app = express();
const port = 3002;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
