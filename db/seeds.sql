INSERT INTO department (name)
VALUES ('IT'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 120.000, 12),
('Manager', 80.000, 13)
('Sales Lead', 100.000, 14)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('George', 'Hendy', 33, 44);
