var express = require('express');
var router = express.Router();

module.exports = {

   home: (req, res, next) => {
        res.render('index', { title: 'Express' });
      }
      
}
