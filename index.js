const express  = require('express');
const path = require('path');

const app = express();


app.set('views',  './views');
app.set('view engine', 'ejs');
app.set('PORT', process.env.PORT || 3000);


app.use(express.static('public/scripts'));


app.listen(app.get('PORT'), () => {
    console.log(`Server listen at port ${app.get('PORT')}`);
});