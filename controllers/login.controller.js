const User_Schema = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

class LoginController {
    check(req,res){
        User_Schema.findOne({
            username: req.body.username,
            password: req.body.password
        }, function(err, user){
            if(err) throw err;
            if(!user){
                console.log('Sai ten tai khoan hoac mat khau');
            } else if(user){
                if(!user.password) {
                    console.log('Sai ten tai khoan hoac mat khau');
                } else {
                    res.cookie('token', jwt.sign({username: user.username, _id: user._id}, 'RESTFULAPIs'));
                    return res.redirect('/');
                }
            }
        });
    }

    check_token(req,res){
        var token = req.cookies.token;
        User_Schema.findOne({}, function(err, user){
            if (token) {
                res.cookie('token', jwt.sign({username: user.username, _id: user._id}, 'RESTFULAPIs'));
                return res.redirect('/');
            } else {
                console.log("Sai ten tai khoan");
            }
        });
    }

    loginRequired(req,res,next){
        var token = req.cookies.token;
        const user = User_Schema.findOne({});
        if (token) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = new LoginController;