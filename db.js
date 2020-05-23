'use strict';
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ilan',
    timezone: 'UTC+3'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Mysql connected !");
});
connection.on('error', function() {
    console.log("MYSQL error...");
});


module.exports = connection;

module.exports.db = function (query, data = []) {
    return new Promise(function (resolve, reject) {
        connection.query(query, data, (err, res) => {
            if (err) {
                console.log(err);
                resolve(null);
            } else {
                resolve(res);
            }
        })
    });
};

module.exports.dbGetFirst = function (query, data = []) {
    return new Promise(function (resolve, reject) {
        connection.query(query, data, (err, res) => {
            if (err) {
                console.log(err);
                resolve(null);
            } else {
                resolve(res[0]);
            }
        })
    });
};

module.exports.dbi = function (query, data = []) {
    return new Promise(function (resolve, reject) {
        connection.query(query, data, (err, res) => {
            if (err) {
                console.log(err);
                resolve(null);
            } else {
                resolve(res.affectedRows);
            }
        })
    });
};

module.exports.dbInsert = function (query, data = []) {
    return new Promise(function (resolve, reject) {
        connection.query(query, data, (err, res) => {
            if (err) {
                console.log(err);
                resolve(null);
            } else {
                resolve(res.insertId);
            }
        })
    });
};