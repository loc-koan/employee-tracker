var mysql = require('mysql2');
var inquirer = require('inquirer');
var cTable = require('console.table');
var figlet = require('figlet');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ClassCod3!',
    database: 'reynholm_industries_db',
});

/* title */
figlet('Employee Manager', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});


/* pass callback instead */ 
function runSearch() {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to review?',
            choices: [
                'Review all departments',
                'Review all roles',
                'Review all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Remove department',
                'Remove role',
                'Remove employee',
                'Exit',
            ],
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'Review all departments':
                    reviewDepartments();
                    break;

                case 'Review all roles':
                    reviewRoles();
                    break;

                case 'Review all employees':
                    reviewEmployees();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;

                case 'Remove department':
                    removeDepartment();
                    break;
                        
                case 'Remove role':
                    removeRole();
                    break;
                        
                case 'Remove employee':
                    removeEmployee();
                    break;

                case 'Exit':
                    connection.end();
                    break;
            }
        });
}


/* review section */ 
function reviewDepartments() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('----------------------------------------------------'); /* separation line to make reading easier */
        runSearch();
    });
}

function reviewRoles() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('----------------------------------------------------');
        runSearch();
    });
}

function reviewEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('----------------------------------------------------');
        runSearch();
    });
}

/* addition section */ 
function addDepartment() {
        console.log('----------------------------------------------------');

        inquirer
            .prompt([
                {
                    name: 'newDepartment',
                    type: 'input',
                    message: 'What is this departments name?',
                }
            ])
            .then(function (answer) {
                var addNewDepartment = 'INSERT INTO department (dept_name) VALUES (?)';
                connection.query(addNewDepartment, [answer.newDepartment], function (err, res) {
                    console.log('\nA new department has been added\n');
                    runSearch();
                });
            });
}

function addRole() {
    console.log('----------------------------------------------------');

    inquirer
        .prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'What is this new title?',
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'What is their salary?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'newDeptID',
                type: 'input',
                message: 'What will be the department ID?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            var addNewRole = 'INSERT INTO role (title, salary, dept_id) VALUES (?,?,?)';
            connection.query(addNewRole, [answer.newTitle, answer.newSalary, answer.newDeptID], function (err, res) {
                console.log('\nA new Role has been added\n');
                runSearch();
            });
        });
}

// function updateEmployeeRole() {
//     connection.query('SELECT r.id, r.title, CONCAT(e.first_name, " ", e.last_name) AS full_name FROM role r JOIN employee e ON e.role_id = r.id', function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         console.log('----------------------------------------------------');

//         // inquirer
//         //     .prompt({
//         //         name: 'full_name',
//         //         type: 'rawlist',
//         //         message: 'Whose role will be updated?',
//         //         choices: function () {
//         //             var selectedEmployee = [];
//         //             for (var i = 0; i < res.length; i++) {
//         //                 if (res[i]).full_name
//         //             }
//         //         }
//         //     })
//         runSearch(); /* move this to different section */ 
//     });
// }


/* remove section */ 
function removeDepartment() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('----------------------------------------------------');

        inquirer
            .prompt([
                {
                    name: 'deleteID',
                    type: 'input',
                    message: 'What is the ID of the department to be removed?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                }
            ])
            .then(function (answer) {
                var deleteQuery = 'DELETE FROM department WHERE ID = ?';
                connection.query(deleteQuery, [answer.deleteID], function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });

    });
}

function removeRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('----------------------------------------------------');

        inquirer
            .prompt([
                {
                    name: 'deleteID',
                    type: 'input',
                    message: 'What is the ID of the role to be removed?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                }
            ])
            .then(function (answer) {
                var deleteQuery = 'DELETE FROM role WHERE ID = ?';
                connection.query(deleteQuery, [answer.deleteID], function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });

    });
}

function removeEmployee() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('----------------------------------------------------');

        inquirer
            .prompt([
                {
                    name: 'deleteID',
                    type: 'input',
                    message: 'The person that is no longer in our company, what is their ID number?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                }
            ])
            .then(function (answer) {
                var deleteQuery = 'DELETE FROM employee WHERE ID = ?';
                connection.query(deleteQuery, [answer.deleteID], function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });

    });
}
