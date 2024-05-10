const fs = require('fs');
const router = require('express').Router();


const {data} = require('../resources/data');

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./resources/data.json', 'utf8'));
    const productsArray = Object.values(data.products);
    res.render('index', { data: productsArray });
});

router.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.render('products', { data });
});

module.exports = router;