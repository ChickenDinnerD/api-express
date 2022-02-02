var mysql = require('mysql');
var migration = require('mysql-migrations');
require('dotenv').config()

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

migration.init(connection, __dirname + '/migrations', function(err) {
  console.log("finished running migrations");
});
