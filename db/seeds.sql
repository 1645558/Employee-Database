INSERT INTO department (name)
VALUES ('IT'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 120.000, 1),
('Manager', 80.000, 2),
('Sales Lead', 100.000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('George', 'Hendy', 1, 44),
('Fred', 'Stacks', 2, 33),
('Sally', 'Anderson', 3, 22);
