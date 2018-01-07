var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');
var $result = require('../model/result');

/* list users listing. */
router.get('/', function(req, res, next) {
    console.log('list users called');
    userDAO.list(function (result) {
        res.json($result.createResult(true, result));
    });
});

/* add users listing. */
router.post('/', function (req, res, next) {
    console.log('post users called');
    var user = req.body;
    console.log(user);
    userDAO.add(user, function (success) {
        var result =  $result.createResult(success, "success");
        res.json(result);
    });
});

module.exports = router;
