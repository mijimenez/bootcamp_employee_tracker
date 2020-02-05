const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("")

const connection = mysql.createConnection({
  host: "localhost",

  // Heroku port 8080
  port: process.env.PORT || 8080,

  // Your username
  user: "root",

  // Your password
  password: "Andy&Maddy082716",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
  });