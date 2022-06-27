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
    addDepartment() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the department name',
                name: 'DeptName'
            },
        ]).then(function (answer) {
            let sql1 = `INSERT INTO department SET ?`;
            db.query(sql1, {
                name: answer.DeptName
            });
            let sql2 = 'SELECT * FROM department';
            db.query(sql2, function (err, results) {
                if (err) return console.err(err);
                console.table(results);
                return init();
            })
        })
    },
    addRole() {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) return console.err(err);

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Please enter a role',
                    name: 'newRole'
                },
                {
                    type: 'input',
                    message: 'Please enter the salary for the role',
                    name: 'roleSalary'
                },
                {
                    type: 'rawlist',
                    message: 'Please choose a department',
                    name: 'deptList',
                    choices: function () {
                        let deptArray = [];
                        for (let i = 0; i < results.length; i++) {
                            deptArray.push(results[i].name);
                        }
                        return deptArray;
                    }
                }
            ]).then(function (answer) {
                let department_id;
                for (i = 0; i < results.length; i++) {
                    if (results[i].name === answer.deptList) {
                        department_id = results[i].id;
                    }
                }
                db.query('INSERT INTO department role SET ?',
                    {
                        name: answer.newRole,
                        salary: answer.roleSalary,
                        id: department_id
                    },
                    function (err, results) {
                        if (err) return console.error(err);
                        console.table(results);
                        return init();
                    }
                )
            })
        })
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
        { name: 'Add a department', value: 'addDepartment' },
        { name: 'Add a role', value: 'addRole' },
        { name: 'Add an employee', value: '' },
        { name: 'Update an employee role', value: '' },
        { name: 'Exit', value: 'exit' },
    ];

    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'What would you like to do?',
            name: 'query',
            choices,
        }
    ]).then((answers) => fn[answers.query]());
};

init();