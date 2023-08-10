
const Product_Schema = require('../models/products.model');

class Product_Controller {
    show_all_product(req,res){
        Product_Schema.find(function(err, products){
            if (err) throw err;
            res.render('pages/product/list_product', { products })
        });
    }

    add_new_product(req,res){
        const new_product = new Product_Schema({
            product_name: req.body.product_name,
            entry_price: req.body.entry_price,
            price: req.body.price,
            quantity: req.body.quantity,
            product_type: req.body.product_type,
            product_color: req.body.product_color,
            product_description: req.body.product_description,
            product_size: req.body.product_size,
            create_date: Date.now()
        });
        console.log(new_product);
        new_product.save();
    }
}

module.exports = new Product_Controller