'use strict';
const Employee = require('../models/employee_model');

exports.findAll = function(req, res) {
    Employee.findAll(function(err, employees) {
        if(err)
        res.send(err);
        res.send(employees);
    });
};

exports.findById = function(req, res) {
    Employee.findById(req.params.id, function(err, emp) {
        if(err)
        res.send(err);
        res.json(emp);
    });
};

exports.create = function(req, res) {
    const employee = new Employee(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length===0)
    {
        res.status(400).send({error:true, message: "Please enter the required details"});
    }
    else{
        Employee.create(employee, function(err, emp) {
            if(err)
            res.send(err);
            res.json({error:false, message:"Employee created successfully", data:emp});
        });
    }
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
    {
        res.status(400).send({error:true, message:"Please provide the required details"});
    }
    else{
        Employee.update(req.params.id, new Employee(req.body), function(err, emp) {
            if(err)
            res.send(err);
            res.json({error:false, message:"Employee data updated successfully"});
        });
    }
};

exports.delete = function(req,res) {
    Employee.delete(req.params.id, function(err, emp) {
        if(err)
        res.send(err);
        res.json({error:false, message:"Employee deleted successfully"});
    });
};