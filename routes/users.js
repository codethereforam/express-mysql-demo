var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');
var $result = require('../model/result');

/* list users */
router.get('/', function(req, res, next) {
    console.log('list users called');
    userDAO.list(function (users) {
        res.json($result.createResult(true, users));
    });
});

/* get user */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log('get user called, id: ' + id);
    userDAO.getById(id, function (user) {
        res.json($result.createResult(true, user));
    });
});

/* delete user */
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    console.log('delete user called, id=' + id);
    userDAO.deleteById(id, function (success) {
        res.json($result.createResult(success, null));
    });
});

/* add users */
router.post('/', function (req, res, next) {
    console.log('post users called');
    var user = req.body;
    console.log(user);
    userDAO.add(user, function (success) {
        var result =  $result.createResult(success, "add success");
        res.json(result);
    });
});

module.exports = router;
