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
    init();
  });

// Join all tables from database and display table in console
function init() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function(err, res) {
        console.table(res);
      runSearch();
    });
};


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

function allEmployeeSearch() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function allEmployeesDepart() {
    var query = "SELECT employee.id,  department.name, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function allEmployeesManager() {
    var query = "SELECT employee.id, employee.manager_id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

// function addEmployee() {
//     inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT position, song, year FROM top5000 WHERE ?";
//       connection.query(query, { artist: answer.artist }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }

function addEmployee() {
    inquirer.prompt([
        {
           message: "Enter first name of new employee:",
           type: "input",
           name: "employeeFirstName"
        },
        {
           message: "Enter last name of new employee:",
           type: "input",
           name: "employeeLastName"
        },
        {
           message: "Enter Role ID of new employee:",
           type: "input",
           name: "employeeRole"
        },
        {
           message: "Enter Manager ID of new employee:",
           type: "input",
           name: "employeeManagerId"
        }
     ])
    .then(function (answer) {
        const first_name = answer.employeeFirstName
        const last_name = answer.employeeLastName
        const role_id = answer.employeeRole
        const manager_id = answer.employeeManagerId

        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )", [first_name, last_name, role_id, manager_id], function (err, res) {
            if (err) throw err;

            console.log(`Successfully added, ${first_name} ${last_name}!`)
            runSearch();
        });
    });
}

function removeEmployee() {
    inquirer.prompt([
        {
           message: "Enter first name of employee to remove:",
           type: "input",
           name: "employeeFirstName"
        },
        {
           message: "Enter last name of employee to remove:",
           type: "input",
           name: "employeeLastName"
        }
     ])
    .then(function (answer) {
        const first_name = answer.employeeFirstName
        const last_name = answer.employeeLastName

        connection.query(" DELETE FROM employee WHERE first_name = ? OR last_name = ?", [first_name, last_name], function (err, res) {
            if (err) throw err;

            console.log(`Successfully removed, ${first_name} ${last_name}!`)
            runSearch();
        });
    });
}


