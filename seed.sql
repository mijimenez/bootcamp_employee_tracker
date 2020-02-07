DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary INTEGER(6),
    department_id INTEGER(11),
    PRIMARY KEY (id)   
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager_id INTEGER(11),
    PRIMARY KEY (id)   
);


-- -- Test adding rows
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Madeline", "Jimenez", 75, 10);

-- -- Test deleting rows
-- DELETE FROM employee WHERE first_name = "Madeline";


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


--- Testing inner join to put id, first_name, last_name, title, department, salary and manager into one table
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM ((department
INNER JOIN role ON department.id = role.id)
INNER JOIN employee ON department.id = employee.id);