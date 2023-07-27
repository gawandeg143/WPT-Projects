var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

//display user page
router.get('/',function (req, res, next) {
    dbConn.query('select * from users',function(err, rows){
        if (err) {
            req.flash('error',err);
            res.render('users',{data: ''});
        } else {
            res.render('users',{data:rows});
        }
    });
});

// dispay add user form page
router.get('/add',function(req, res, next){
    res.render('users/add',{
        name:'',
        email:'',
        position:''
    })
})

// add a new user
router.post('/add',function(req, res, next){
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let error = false;

    if(name.length === 0 || email.length === 0 || position.length === 0){
        error = true;

        req.flash('error',"Please enter name, email and position");

        res.render('users/add',{
            name:name,
            email:email,
            position:position
        })
    }
    if(!error){
        var form_data = {
            name: name, 
            email: email,
            position: position
        }

        dbConn.query('insert into users set ?', form_data, function(err, result){
            if (err) {
                req.flash('error',err);

                res.render('users/add',{
                    name: form_data.name,
                    email : form_data.email,
                    position : form_data.position
                })
            } else {
                req.flash('success','user added successfully');
                res.redirect('/users');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:id)',function(req, res, next){
    let id = req.params.id;

    dbConn.query('select * from users where id= '+id,function(err, rows, fields){
        if (err){
            req.flash('error',err);
            res.render('users',{data: ''});
        }
            
        if (rows.length<=0) {
            req.flash('error',"user not found with id = "+id)
            res.redirect('/users');
        } else {
            res.render('users/edit',{
                title : 'Edit User ',
                id: rows[0].id,
                name : rows[0].name,
                email: rows[0].email,
                position : rows[0].position
            })
        }
    })
})

//update user data
router.post('/update/:id',function(req, res, next){
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let position = req.body.position;
    let error = false;

    if(name.length === 0 || email.length === 0 || position.length === 0){
        req.flash('error',"Please enter the name, email and position");
        res.render('users/edit',{
            id: req.params.id,
            name : name,
            email : email,
            position : position
        })
    }
    if(!error){
        var form_data = {
            name: name,
            email: email,
            position: position
        }

        dbConn.query('update users set ? where id = '+id,form_data, function(err, result){
            if (err) {
                req.flash('error',err);
                res.render('users/edit',{
                    id: req.params.id,
                    name : form_data.name,
                    email: form_data.email,
                    position: form_data.position
                })
            } else {
                req.flash('success',"User Data updated successfully...!!");
                res.redirect('/users');
            }
        })
    }
})

//delete user
router.get('/delete/(:id)',function(req, res, next){
    let id = req.params.id;
    
    dbConn.query('delete from users where id='+id, function(err, result){
        if (err) {
            req.flash('error',err);
            res.redirect('/users');
        } else {
            req.flash('success',"User deleted successfully...!!");
            res.redirect('/users')
        }
    })
})

module.exports = router;