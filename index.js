const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

//establish connection with mysql
const db = mysql.createConnection(
    {
        user: 'root',
        database: 'department_db'
    },
);

let employeeArray = [];
function getRole() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) return console.err(err);
        for (let i = 0; i < results.length; i++) {
            employeeArray.push(results[i].title);
        }
    });
    return employeeArray;
};

//query requests information from mysql database, executes SELECT * and grabs the results from it
const fn = {
    //displays all departments
    showAllDepartments() {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            return init();
        });
    },
    //displays all roles
    showAllRoles() {
        db.query('SELECT * FROM role', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            return init();
        });
    },
    //displays all employees
    showAllEmployees() {
        db.query('SELECT * FROM employee', function (err, results) {
            if (err) return console.err(err);
            console.table(results);
            return init();
        });
    },
    //adds a department to the department table
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
    //adds a role to the role table
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
                    },
                }
            ]).then(function (answer) {
                let department_id;
                for (i = 0; i < results.length; i++) {
                    if (results[i].name === answer.deptList) {
                        department_id = results[i].id;
                    }
                }
                db.query('INSERT INTO role SET ?',
                    {
                        title: answer.newRole,
                        salary: answer.roleSalary,
                        department_id: department_id
                    },
                    function (err, results) {
                        if (err) return console.error(err);
                        console.table(results);
                        return init();
                    })
            })
        })
    },
    //adds an employee to the employee table
    addEmployee() {
        db.query('SELECT * FROM role', function (err, results) {
            if (err) return console.err(err);

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Please enter the employees first name',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'Please enter the employees last name',
                    name: 'lastName'
                },
                {
                    type: 'input',
                    message: 'Please enter the managers ID',
                    name: 'manId'
                },
                {
                    type: 'rawlist',
                    message: 'Please enter the employees role',
                    name: 'empRole',
                    choices: function () {
                        let roleArray = [];
                        for (let i = 0; i < results.length; i++) {
                            roleArray.push(results[i].title);
                        }
                        return roleArray;
                    },
                }
            ]).then(function (answer) {
                let role_id;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].title === answer.empRole) {
                        role_id = results[i].id;
                    }
                }
                db.query('INSERT INTO employee SET ?',
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        manager_id: answer.manId,
                        role_id: role_id,
                    },
                    function (err, results) {
                        if (err) return console.error(err);
                        console.table(results);
                        return init();
                    })
            })
        })
    },
    //updates employee role
    updateEmployee() {
        let sql_query = 'SELECT employee.first_name, role.title FROM employee JOIN role ON employee.role_id = role.id;';
        db.query(sql_query, function (err, results) {
            if (err) return console.err(err);

            inquirer.prompt([
                {
                    type: 'rawlist',
                    message: 'Please select an employee',
                    name: 'updateRole',
                    choices: function () {
                        let firstName = [];
                        for (let i = 0; i < results.length; i++) {
                            firstName.push(results[i].first_name);
                        }
                        return firstName;
                    }
                },
                {
                    type: 'rawlist',
                    message: 'Please enter their new role',
                    name: 'newRole',
                    choices: getRole()
                },
            ]).then(function (answers) {
                let roleId = getRole().indexOf(answers.newRole)
                db.query('UPDATE employee SET WHERE ?',
                    {
                        first_name: answers.firstName
                    },
                    {
                        role_id: roleId
                    },
                    function (err) {
                        if (err) return console.err(err);
                        console.table(answers)
                        return init();
                    })
            });
        });
    },
    exit() {
        process.exit();
    },
};

//initializer
const init = () => {
    const choices = [
        { name: 'View all departments', value: 'showAllDepartments' },
        { name: 'View all roles', value: 'showAllRoles' },
        { name: 'View all employees', value: 'showAllEmployees' },
        { name: 'Add a department', value: 'addDepartment' },
        { name: 'Add a role', value: 'addRole' },
        { name: 'Add an employee', value: 'addEmployee' },
        { name: 'Update an employee role', value: 'updateEmployee' },
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