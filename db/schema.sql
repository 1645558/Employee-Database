DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NULL,
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(6, 3) NULL,
    department_id INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);