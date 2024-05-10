const express  = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const app = express();

const routes = require('./routes');
app.use('/', routes);

app.set('views',  './views');
app.set('view engine', 'ejs');
app.set('PORT', process.env.PORT || 3000);


app.use(express.static('public/scripts'));

app.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./resources/data.json', 'utf-8'));
    res.json(data);
});

app.listen(app.get('PORT'), () => {
    console.log(`Server listen at port ${app.get('PORT')}`);
});
