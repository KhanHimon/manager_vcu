var express = require('express');
var router = express.Router();
const Product_Controller = require('../controllers/product_controller');
const Product_Schema = require('../models/products.model');

/* GET users listing. */
router.post('/them-moi-san-pham', function (req, res) {
    const new_product = new Product_Schema({
        product_name: req.body.product_name,
        entry_price: req.body.entry_price,
        price: req.body.price,
        quantity: req.body.quantity,
        product_type: req.body.product_type,
        product_sku: req.body.product_sku,
        product_color: req.body.product_color,
        product_description: req.body.product_description,
        product_size: req.body.product_size,
        create_date: Date.now()
    });
    console.log(new_product);
    new_product.save();
    res.redirect(req.get('referer'));
});


router.post('/xoa-san-pham/:_id', function (req, res) {
    const options = {
        new: true,
        useFindAndModify: false
    }
    Product_Schema.findByIdAndRemove(req.params._id, options).then(function (product) {
        console.log(product);
        res.redirect(req.get('referer'));
    }).catch(function (err) {
        console.log(err);
    });
});


router.post('/sua-san-pham/:_id', function(req,res){
    Product_Schema.findByIdAndUpdate(req.params._id,{ $set: req.body }).then(function(err, update_product) {
        console.log(update_product);
        res.redirect(req.get('referer'));
    }).catch(function (err) {
        console.log(err);
    });;
});




module.exports = router;
