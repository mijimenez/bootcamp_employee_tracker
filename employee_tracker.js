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
        "View All Active Employee Information",
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View Employees by Managers",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Remove Department",
        "Remove Role",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
    ]
    })
    .then(function(answer) {
    switch (answer.action) {
    case "View All Active Employee Information":
        allEmployeeInfo();
        break;

    case "View All Employees":
        allEmployeeSearch();
        break;

    case "View All Departments":
        allEmployeesDepart();
        break;

    case "View All Roles":
        allEmployeesRole();
        break;

    case "View Employees by Managers":
        allByManagers();
        break;

    case "Add Department":
        addDepartment();
        break;
    
    case "Add Role":
        addRole();
        break;

    case "Add Employee":
        addEmployee();
        break;

    case "Remove Department":
        removeDepartment();
        break;

    case "Remove Role":
        removeRole();
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
    }
    });
}

function allEmployeeInfo() {
    var query = `
    SELECT regularEmployee.id, regularEmployee.first_name, regularEmployee.last_name, role.title, department.depart_name, role.salary, CONCAT(managerEmployee.first_name, " ", managerEmployee.last_name) AS manager
    FROM employee regularEmployee
    LEFT JOIN employee managerEmployee ON regularEmployee.manager_id = managerEmployee.id
    INNER JOIN role ON regularEmployee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id`;
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function allEmployeeSearch() {
    var query = `SELECT * FROM employee`;
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function allEmployeesDepart() {
    var query = `SELECT * FROM department`;
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function allEmployeesRole() {
    var query = `SELECT * FROM role`;
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function allByManagers() {
    var query = `
    SELECT regularEmployee.id, CONCAT(regularEmployee.first_name, " ", regularEmployee.last_name) AS employee, CONCAT(managerEmployee.first_name, " ", managerEmployee.last_name) AS manager
    FROM employee regularEmployee
    LEFT JOIN employee managerEmployee ON regularEmployee.manager_id = managerEmployee.id
    INNER JOIN role ON regularEmployee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id`;
    connection.query(query, function(err, res)  {
      console.table(res);
      runSearch();
    })
};

function addDepartment() {
    inquirer.prompt([
        {
           message: "Enter name of new department:",
           type: "input",
           name: "name"
        }
     ])
    .then(function (answer) {
        const departmentName = answer.name

        connection.query("INSERT INTO department (depart_name) VALUES ( ? )", [departmentName], function (err, res) {
            if (err) throw err;

            console.log(`Successfully added, ${departmentName} department!`)
            runSearch();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
           message: "Enter new role title:",
           type: "input",
           name: "title"
        },
        {
           message: "Enter role salary:",
           type: "input",
           name: "salary"
        },
        {
           message: "Enter department id: (please reference department ids from from departments list)",
           type: "input",
           name: "id"
        }
     ])
    .then(function (answer) {
        const roleTitle = answer.title
        const roleSalary = answer.salary
        const roleId = answer.id

        connection.query("INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )", [roleTitle, roleSalary, roleId], function (err, res) {
            if (err) throw err;

            console.log(`Successfully added, ${roleTitle} role!`)
            runSearch();
        });
    });
};

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
           message: "Enter Role ID of new employee: (please reference role_id from from employee list)",
           type: "input",
           name: "employeeRole"
        },
        {
           message: 'Enter Manager ID of new employee: (please reference manager_id from from employee list) - enter "0" if N/A:',
           type: "input",
           name: "employeeManagerId"
        }
     ])
    .then(function (answer) {
        const firstName = answer.employeeFirstName
        const lastName = answer.employeeLastName
        const roleId = answer.employeeRole
        const managerId = answer.employeeManagerId

        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? )", [firstName, lastName, roleId, managerId], function (err, res) {
            if (err) throw err;

            console.log(`Successfully added, ${firstName} ${lastName}!`)
            runSearch();
        });
    });
};

function removeDepartment() {
    // Query and store all department names into array for choices list of departments to remove later
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        departmentChoices = [];
        for (var i = 0; i < res.length; i++) {
            departmentChoices.push(res[i].depart_name);
        }
        // departmentChoices.push("null");
        inquirer.prompt([
            {
            message: "Enter name of department to remove:",
            type: "list",
            name: "department",
            choices: departmentChoices
            }
        ])
        .then(function (answer) {
            const departmentRemoved = answer.department

            connection.query(" DELETE FROM department WHERE depart_name = ?", [departmentRemoved], function (err, res) {
                if (err) throw err;

                console.log(`Successfully removed ${departmentRemoved} department!`)
                runSearch();
            });
        });
    });
};

function removeRole() {
    // Query and store all role names into array for choices list of roles to remove later
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        roleChoices = [];
        for (var i = 0; i < res.length; i++) {
            roleChoices.push(res[i].title);
        }
        inquirer.prompt([
            {
            message: "Enter name of role to remove:",
            type: "list",
            name: "role",
            choices: roleChoices
            }
        ])
        .then(function (answer) {
            const roleRemoved = answer.role

            connection.query(" DELETE FROM role WHERE title = ?", [roleRemoved], function (err, res) {
                if (err) throw err;

                console.log(`Successfully removed ${roleRemoved} role!`)
                runSearch();
            });
        });
    });
};

function removeEmployee() {
    // Query and store all employee names into an array for choices list of employees to remove later
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        employeeChoices = [];
        for (var i = 0; i < res.length; i++) {
            employeeChoices.push(res[i].first_name);
        }
        inquirer.prompt([
            {
            message: "Enter first name of employee to remove:",
            type: "list",
            name: "employeeFirstName",
            choices: employeeChoices
            }
        ])
        .then(function (answer) {
            const firstName = answer.employeeFirstName

            connection.query(" DELETE FROM employee WHERE first_name = ?", [firstName], function (err, res) {
                if (err) throw err;

                console.log(`Successfully removed, ${firstName} as an employee!`)
                runSearch();
            });
        });
    });
};

function updateRole() {
    // Query and store all employee names into array for choices list of roles to employee roles to update later
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        employeeChoices = [];
        for (var i = 0; i < res.length; i++) {
            employeeChoices.push(res[i].first_name);
        }
        inquirer.prompt([
        {
            message: "Enter the name of the employee to update role:",
            type: "list",
            name: "employeeName",
            choices: employeeChoices
        },
        {
        message: "Enter the new role id (please reference role_id from from employee list):",
        type: "input",
        name: "roleId"
        }
        ])
        .then(function (answer) {
            const employeeName = answer.employeeName
            const roleId = answer.roleId

            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [roleId, employeeName], function (err, res) {
                if (err) throw err;

                console.log(`Successfully updated ${employeeName}'s role!`)
                runSearch();
            });
        });
    });
};

function updateManager() {
    // Query and store all employee names into array for choices list of roles to employee managers to update later
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        employeeChoices = [];
        for (var i = 0; i < res.length; i++) {
            employeeChoices.push(res[i].first_name);
        }
        inquirer.prompt([
            {
                message: "Enter the first name of the employee to update manager:",
                type: "list",
                name: "employeeName",
                choices: employeeChoices
            },
            {
                message: 'Enter the new manager id (please reference manager_id from from employee list) - enter "0" if N/A:',
                type: "input",
                name: "managerId"
            }
        ])
        .then(function (answer) {
            const employeeName = answer.employeeName
            const managerId = answer.managerId

            connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [ managerId, employeeName], function (err, res) {
                if (err) throw err;

                console.log(`Successfully updated ${employeeName}'s manager!`)
                runSearch();
            });
        });
    });
};


