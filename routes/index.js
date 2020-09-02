const express = require('express');

//Routes
const router = express.Router();
router.get('/', (req, res)=>{
    let obj = {
        pageTitle: 'Título de teste'
    }
    res.render('home', obj);
});

module.exports = router;