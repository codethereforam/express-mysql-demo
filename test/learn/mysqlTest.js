var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "978299",
    database: 'register'
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    /*var sql = "select * from user";
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(result[0].id + "-" +result[0].username + "-" + result[0].password);
    });*/

    /*var sql = "INSERT INTO user (username, password) VALUES ('u3', 'p3')";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });*/

    /*var sql = "UPDATE user SET username= 'user3' WHERE password = 'p3'";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });*/

    var sql = "DELETE FROM user WHERE password= 'p3'";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
});