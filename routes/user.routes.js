var express = require('express');
var router = express.Router();
const LoginController = require('../controllers/login.controller');

const User_Schema = require('../models/users.model');
const Role_Schema = require('../models/roles.model');

router.post('/them-moi-tai-khoan', function(req,res){
    const new_user = new User_Schema({
        username: req.body.username,
        password : req.body.password,
        full_name: req.body.full_name,
        cccd_cmnd: req.body.cccd_cmnd,
        address: req.body.address,
        number_phone: req.body.number_phone,
        birthday: req.body.birthday,
        email: req.body.email,
        create_date: Date.now(),
        user_role: req.body.user_role
    });
    console.log(new_user);
    new_user.save();
    Role_Schema.find({}).then(function (roles) {
        User_Schema.find({}).populate('user_role').sort({create_date: -1}).then(function (users) { 
            req.flash('message_success', "Thêm mới tài khoản thành công : " + new_user.full_name );
            res.redirect(req.get('referer'));
        })
    })
});


router.get('/them-moi-tai-khoan/:_id',LoginController.loginRequired,function (req,res) {
    User_Schema.findById(req.params._id).then(function(user){
        Role_Schema.find({}).then(function (roles) {
            User_Schema.find({}).populate('user_role').sort({create_date: -1}).then(function (users) {
                res.render('pages/users/add_user', {user, users, roles, title: 'Thêm mới tài khoản', message: req.flash('message'),message_success: req.flash('message_success') })
            })
        }).catch(function (err) { console.log(err);});
    }).catch(function (err) { console.log(err);});
})

router.get('/user/:_id', function(req,res){
    User_Schema.findById(req.params._id).then(function(user){
        Role_Schema.find({}).then(function (roles) {
            User_Schema.find({}).populate('user_role').sort({create_date: -1}).then(function (users) {
                res.render('pages/users/list_user', {user,users, roles, title: 'Quản lý tài khoản', message: req.flash('message') })
            })
        })
    })
});

router.post('/xoa-tai-khoan/:_id', function (req, res) {
    const options = {
        new: true,
        useFindAndModify: false
    }
    User_Schema.findByIdAndRemove(req.params._id, options).then(function (user_remove) {
        console.log(user_remove);
        User_Schema.findById(req.params._id).then(function(user){
            req.flash('message', "Xóa tài khoản " + user_remove.full_name + " thành công");
            res.redirect(req.get('referer'));
        })
    }).catch(function (err) {
        console.log(err);
    });
});

router.post('/sua-tai-khoan/:_id', function(req,res){
    User_Schema.findByIdAndUpdate(req.params._id,{ $set: req.body }).then(function(err, update_user) {
        console.log(update_user);
        Role_Schema.find({}).then(function (roles) {
            User_Schema.find({}).populate('user_role').sort({create_date: -1}).then(function (users) {
                res.redirect(req.get('referer'));
            })
        })
    }).catch(function (err) {
        console.log(err);
    });;
});

module.exports = router;