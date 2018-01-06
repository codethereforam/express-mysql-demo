var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* add users listing. */
router.post('/', function (req, res, next) {
    console.log('post users called');
    var user = req.body;
    console.log(user);
    var result = userDAO.add(user);
    res.json(result);
});

module.exports = router;
