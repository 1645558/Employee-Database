DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE role_db (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL
);

CREATE TABLE employee_db (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
)