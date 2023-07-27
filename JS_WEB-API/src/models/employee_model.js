'use strict';
var dbconn = require('../../data source/db');

var Employee = function(employee) {
    this.empname = employee.empname;
    this.email = employee.email;
    this.salary = employee.salary;
    this.dob = new Date(employee.dob);
};

Employee.create = function(newEmp, result) {
    dbconn.query("insert into employee set ?",newEmp, function(err, res) {
        if (err) {
            console.log("error : ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Employee.findById = function(id, result) {
    dbconn.query("select * from employee where empid=?", id, function(err, res) {
        if (err) {
            console.log("error : ", err);
            result(err, null);
        } else {
            console.log("Employee : \n",res);
            result(null, res);
        }
    });
};

Employee.findAll = function(result) {
    dbconn.query("select * from employee",function(err,res) {
        if (err) {
            console.log("error : ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employee.update = function(id, emp, result) {
    dbconn.query("update employee set empname=?, email=?, salary=?, dob=? where empid=?",[emp.empname, emp.email, emp.salary, emp.dob, id], function(err, res) {
        if (err) {
            console.log("error : ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Employee.delete = function(id, result) {
    dbconn.query("delete from employee where empid=?",id, function(err, res) {
        if (err) {
            console.log("error : ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Employee;