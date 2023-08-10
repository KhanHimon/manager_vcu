var express = require('express');
var router = express.Router();

const Role_Schema = require('../models/roles.model');


// GET LIST ROLE SCHEMA
router.get('/', function(req,res){
    Role_Schema.find({}).then(function (roles) {
        res.json(roles);
    })
});

// POST NEW ROLE SCHEMA

router.post('/them-moi-vai-tro', function (req,res) {
    const new_role = new Role_Schema({
        role: req.body.role
    });
    console.log(new_role);
    new_role.save();
    res.json(new_role);
})

router.post('/xoa-vai-tro/:_id', function (req, res) {
    const options = {
        new: true,
        useFindAndModify: false
    }
    Role_Schema.findByIdAndRemove(req.params._id, options).then(function (role) {
        console.log(role);
        res.json(role);
    }).catch(function (err) {
        console.log(err);
    });
});

module.exports = router;