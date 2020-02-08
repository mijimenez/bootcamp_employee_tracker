-- Create starting rows with values for each of the 3 tables
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Jameel", "English", 1, 1),
("Roshan", "Denton", 1, 2),
("Lorraine", "Flynn", 1, 2),
("Keagan", "Felix", 2, 1),
("Abdur", "Espinosa", 2, 1);

INSERT INTO department (name) VALUES 
("Marketing"),
("Engineering"),
("Sales");

INSERT INTO role (title, salary, department_id) VALUES
("Designer", 40000.00, 1),
("Front-End Developer", 80000.00, 2),
("Salesperson", 45000.00, 1),
("Back-End Developer", 11000.00, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

--- Inner join to put id, first_name, last_name, title, department, salary and manager into one table

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id

-- left join with inner join of 3 tables to connect manager_id to employee role.id and rename as actual manager name
SELECT regularEmployee.id, regularEmployee.first_name, regularEmployee.last_name, role.title, department.name, role.salary, CONCAT(managerEmployee.first_name, " ", managerEmployee.last_name) AS manager
FROM employee regularEmployee
LEFT JOIN employee managerEmployee ON regularEmployee.manager_id = managerEmployee.id
INNER JOIN role ON regularEmployee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;
