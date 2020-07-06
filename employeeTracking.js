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
                'Add employee',
                'Remove employee',
                'Update Employee Role',
                'Update Employee Manager',
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

                case 'Search for a specific song':
                    songSearch();
                    break;

                case 'Find artists with a top song and top album in the same year':
                    songAndAlbumSearch();
                    break;
            }
        });
}

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