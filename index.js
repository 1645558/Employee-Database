const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');


//establish connection with mysql
const db = mysql.createConnection(
    {
        user: 'root',
        database: 'department_db'
    },
);

//query requests information from mysql database, executes SELECT * and grabs the results from it
const fn = {
    showAllDepartments() {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            return init();
        });
    },
    showAllRoles() {
        db.query('SELECT * FROM role', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            return init();
        });
    },
    showAllEmployees() {
        db.query('SELECT * FROM employee', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            return init();
        });
    },
    exit() {
        process.exit();
    },
};

const init = () => {
    const choices = [
        { name: 'View all departments', value: 'showAllDepartments' },
        { name: 'View all roles', value: 'showAllRoles' },
        { name: 'View all employees', value: 'showAllEmployees' },
        { name: 'Add a department', value: ''},
        { name: 'Add a role', value: ''},
        { name: 'Add an employee', value: '' },
        { name: 'Update an employee role', value: '' },
        { name: 'Exit', value: 'exit' },
    ];

    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'What would you like to do?',
            name: 'init',
            choices,
        }
    ]).then((answers) => {
        console.log(answers);
        switch (answers.init) {
            case 'View all departments': {

                break;
            }
            case 'View all roles': {

                break;
            }
            case 'View all employees': {

                break;
            }
            default: {
                process.exit();
            }
        }
    });
};

init();