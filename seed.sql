-- -- Test deleting rows
-- DELETE FROM employee WHERE first_name = "Madeline";

-- Create starting rows with values for each of the 3 tables
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jameel", "English", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Roshan", "Denton", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lorraine", "Flynn", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Keagan", "Felix", 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Abdur", "Espinosa", 10, 9);

INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Designer", 40000, 10);
INSERT INTO role (title, salary, department_id)
VALUES ("Front-End Developer", 80000, 20);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 45000, 30);
INSERT INTO role (title, salary, department_id)
VALUES ("Back-End Developer", 11000, 40);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

--- Inner join to put id, first_name, last_name, title, department, salary and manager into one table
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM ((department INNER JOIN role ON department.id = role.id) INNER JOIN employee ON department.id = employee.id);