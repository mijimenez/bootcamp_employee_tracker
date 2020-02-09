-- Create starting rows with values for each of the 3 tables
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Jameel", "English", 1, 5),
("Roshan", "Denton", 2, 6),
("Lorraine", "Flynn", 3, 5),
("Keagan", "Felix", 4, 6),
("Lisa", "Johnson", 5, null),
("Abdur", "Espinosa", 6, null);

INSERT INTO department (depart_name) VALUES 
("Marketing"),
("Web Team");

INSERT INTO role (title, salary, department_id) VALUES
("Designer", 40000.00, 1),
("Front-End Developer", 80000.00, 2),
("Copywriter", 45000.00, 1),
("Back-End Developer", 90000.00, 2),
("Marketing Director", 13000.00, 1),
("Senior Developer", 10000.00, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

--- Inner join to put id, first_name, last_name, title, department, salary and manager into one table
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.depart_name, role.salary, employee.manager_id
FROM employee INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id

-- left join with inner join of 3 tables to connect manager_id to employee role.id and rename as actual manager name
SELECT regularEmployee.id, regularEmployee.first_name, regularEmployee.last_name, role.title, department.depart_name, role.salary, CONCAT(managerEmployee.first_name, " ", managerEmployee.last_name) AS manager
FROM employee regularEmployee
LEFT JOIN employee managerEmployee ON regularEmployee.manager_id = managerEmployee.id
INNER JOIN role ON regularEmployee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;




-- Nice to Haves:

    -- 1. Give dropdown of names instead of typing in strings and id numbers:

    -- Show manager first names for getting dopdown list of choices instead of user entering it
    SELECT managerEmployee.first_name AS manager
    FROM employee regularEmployee
    LEFT JOIN employee managerEmployee ON regularEmployee.manager_id = managerEmployee.id
    INNER JOIN role ON regularEmployee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;

    -- Use manager first name to show manager id - this way you can ask the user which manager they'd like to set for an employee and they can choose an actual name which will be returned and used as the manager id
        -- do this for addRole() where it asks for department_id
        -- do this for addEmployee() where it asks for role_id and manager_id
        -- do this for updateRole() where they ask for role_id
        -- do this for updateManager() where it asks for manager_id

    SELECT managerEmployee.id
    FROM employee regularEmployee
    LEFT JOIN employee managerEmployee ON regularEmployee.manager_id = managerEmployee.id
    INNER JOIN role ON regularEmployee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    WHERE managerEmployee.first_name = "Jameel";
