const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


// MySQL DB Connection Information
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Andy&Maddy082716",
    database: "employeeTracker_DB"
  });

// Checks if connection was successful. If so, prompts are run.
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch();
  });

function runSearch() {
    inquirer
    .prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles"
    ]
    })
    .then(function(answer) {
    switch (answer.action) {
    case "View All Employees":
        allEmployeeSearch();
        break;

    case "View All Employees By Department":
        allEmployeesDepart();
        break;

    case "View All Employees By Manager":
        allEmployeesManager();
        break;

    case "Add Employee":
        addEmployee();
        break;

    case "Remove Employee":
        removeEmployee();
        break;
    
    case "Update Employee Role":
        updateRole();
        break;

    case "Update Employee Manager":
        updateManager();
        break;

    case "View All Roles":
        allRoleSearch();
        break;
    }
    });
}


