var express = require('express');
var router = express.Router();
const User_Schema = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');


router.get('/', function (req, res) {
    res.render('login', { title: 'Đăng nhập',message: req.flash('message') });
});

router.get('/*', function (req, res) {
    res.render('login', { title: 'Đăng nhập',message: req.flash('message') });
});

router.post('/', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    User_Schema.findOne({
        username: username,
        password: password
    }).then(user => {
            if(!user){
                req.flash('message', "Sai tài khoản hoặc mật khẩu");
                console.log('Sai ten tai khoan hoac mat khau');
                res.render('login',{ message: req.flash('message') });
            } else if(user){
                if(!user.password) {
                    req.flash('message', "Sai tài khoản hoặc mật khẩu");
                    console.log('Sai ten tai khoan hoac mat khau');
                    res.render('login',{ message: req.flash('message') });
                } else {
                    res.cookie('token', jwt.sign({username: user.username, _id: user._id}, 'RESTFULAPIs'));
                    return res.redirect('/tong-quan/' + user._id);
                }
            }
    }).catch(error => {
        console.log(error);
        res.status(500).json('loi server')
    });

});


module.exports = router;