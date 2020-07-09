/* Seeds for SQL table */
USE reynholm_industries_db;

/* removes data in tables for a clean slate */ 
TRUNCATE TABLE department;
TRUNCATE TABLE role;
TRUNCATE TABLE employee;

/* department */ 
INSERT INTO department (dept_name)
VALUES 
    ("Information Technology"), 
    ("Research and Development"), 
    ("Engineering");

/* role */ 
INSERT INTO role (title, salary, dept_id)
VALUES 
    ("Manager",50000,1), 
    ("Tech",40000,1), 
    ("Development Architect",100000,2), 
    ("Developer",90000,2),
    ("Engineer",70000,3);

/* employee */ 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Jen","Barber",1,1), 
    ("Maurice","Moss",2,1), 
    ("Roy","Trenneman",2,1), 
    ("Tish","McNeel",3,3), 
    ("Brandon","Gatlin",4,3), 
    ("Peter","Winston",4,3),
    ("Geordi","LaForge",5,5);