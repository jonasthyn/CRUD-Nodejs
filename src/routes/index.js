const express = require('express');
const router = express.Router();
const exphbs = require('handlebars');

router.get('/', (req, res) =>{
    res.send('Hola Mundo');
});

module.exports = router;
