const express = require('express');
const morgan = require('morgan');
const mongodb = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const app = express();
const dbUri = 'mongodb+srv://root:xJCpCBu5YmI9WRSX@prachee.ezmax.mongodb.net/prachee-database?retryWrites=true&w=majority';

//connect to database
mongodb.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        app.listen('5000');
        console.log('listening to port 5000');
    })
    .catch((error) => console.log(error));

// template engine
app.set('view engine', 'ejs');

// middleware morgan to log requests
app.use(morgan('dev'));

//middleware for static files
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true })); // require to get data posted from html form

app.get('/', (req, res) => {
    res.redirect('/blogs');
    //res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/aboutus', (req, res) => {
    res.redirect('/about');
});

// blog routes
app.use('/blogs', blogRoutes);

// position matters, if url request does not match with any above routes then used
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});