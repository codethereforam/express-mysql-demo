var mysql = require('mysql');
var mysqlConf = require('../conf/mysqlConf');
var dbUtils = require('../utils/dbUtils');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(dbUtils.extend({}, mysqlConf.mysql));
var $result = require('../model/result');

module.exports = {
    add: function (user) {
        var success = false;
        pool.getConnection(function (err, connection) {
            connection.query(userSqlMap.add, [user.username, user.password], function (err, result) {
                connection.release();
                // success =  result.affectedRows > 0;
            });
        });

        return $result.createResult(success, "success");
    },

    delete: function () {

    }
};
