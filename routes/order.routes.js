var express = require('express');
var router = express.Router();
const Order_Schema = require('../models/orders.model');

/* GET users listing. */
router.post('/them-moi-don-hang', function (req, res) {
    const new_order = new Order_Schema({
        name_user_order: req.body.name_user_order,
        order_number_phone: req.body.order_number_phone,
        order_address: req.body.order_address,
        order_prepayment: req.body.order_prepayment,
        order_product_quantity: req.body.order_product_quantity,
        order_product: req.body.order_product,
        order_unit_price: req.body.order_unit_price,
        order_entry_price: req.body.order_entry_price,
        order_remaining: (req.body.order_product_quantity * req.body.order_unit_price) - req.body.order_prepayment,
        order_value: req.body.order_product_quantity * req.body.order_unit_price,
        order_price_profit: (req.body.order_product_quantity * req.body.order_unit_price) - (req.body.order_entry_price * req.body.order_product_quantity),
        create_date: Date.now()
    });
    console.log(new_order);
    new_order.save();
    res.redirect('/danh-sach-don-hang');
});


router.post('/xoa-don-hang/:_id', function (req, res) {
    const options = {
        new: true,
        useFindAndModify: false
    }
    Order_Schema.findByIdAndRemove(req.params._id, options).then(function (order) {
        console.log(order);
        res.redirect('/danh-sach-don-hang');
    }).catch(function (err) {
        console.log(err);
    });
});


router.post('/sua-don-hang/:_id', function(req,res){
    Order_Schema.findByIdAndUpdate(req.params._id,{ $set: req.body }).then(function(err, update_order) {
        console.log(update_order);
        res.redirect('/danh-sach-don-hang');
    }).catch(function (err) {
        console.log(err);
    });;
});




module.exports = router;
