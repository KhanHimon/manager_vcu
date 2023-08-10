var express = require('express');
var router = express.Router();
const Product_Schema = require('../models/products.model');
const Order_Schema = require('../models/orders.model');
const LoginController = require('../controllers/login.controller');
const User_Schema = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

router.get('/', function (req, res) {
  res.render('login', { title: 'Đăng nhập' });
});

/* GET home page. */
router.get('/tong-quan/:_id', LoginController.loginRequired, function (req, res, next) {
  User_Schema.findById(req.params._id).then(function (user) {
    Order_Schema.find({}).populate('order_product').sort({ create_date: -1 }).then(function (orders) {
      Product_Schema.find({}).sort({ create_date: -1 }).then(function (products) {
        res.render('index', { user, products, orders, title: 'Tổng quan' })
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }).catch(function (err) {
    console.log(err);
  });
});

// ROUTER SẢN PHẨM

router.get('/danh-sach-san-pham/:_id', LoginController.loginRequired, function (req, res) {
  User_Schema.findById(req.params._id).then(function (user) {
    Product_Schema.find({}).sort({ create_date: -1 }).then(function (products) {
      res.render('pages/product/list_product', { user, products, title: 'Danh sách sản phẩm' })
    }).catch(function (err) {
      console.log(err);
    });
  });
});

router.get('/chinh-sua-san-pham/:id&:_id', LoginController.loginRequired, function (req, res) {
  Product_Schema.findById(req.params.id).sort({ create_date: -1 }).then(function (product) {
    User_Schema.findById(req.params._id).then(function (user) {
      res.render('pages/product/edit_product', { user, product, title: 'Chỉnh sửa sản phẩm' })
    });
  }).catch(function (err) {
    console.log(err);
  });
});

router.get('/them-moi-san-pham/:_id', LoginController.loginRequired, function (req, res) {
  User_Schema.findById(req.params._id).then(function (user) {
    res.render('pages/product/add_product', { user, title: 'Thêm mới sản phẩm' });
  });

})

// ROUTER ĐƠN HÀNG

router.get('/danh-sach-don-hang/:_id', LoginController.loginRequired, function (req, res) {
  User_Schema.findById(req.params._id).then(function (user) {
    Order_Schema.find({}).populate('order_product').sort({ create_date: -1 }).then(function (orders) {
      Product_Schema.find({}).sort({ create_date: -1 }).then(function (products) {
        res.render('pages/orders/list_order', {user, products, orders, title: 'Danh sách đơn hàng' })
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  })
});

router.get('/them-moi-don-hang/:_id', LoginController.loginRequired, function (req, res) {
  User_Schema.findById(req.params._id).then(function (user) {
    Product_Schema.find({}).sort({ create_date: -1 }).then(function (products) {
      res.render('pages/orders/add_order', {user, products, title: 'Thêm mới đơn hàng' })
    }).catch(function (err) {
      console.log(err);
    });
  })
});

router.get('/chi-tiet-don-hang/:_id&:id', LoginController.loginRequired, function (req, res) {
  Order_Schema.findById(req.params._id).populate('order_product').then(function (orders) {
    User_Schema.findById(req.params.id).then(function (user) {
      res.render('pages/orders/detail_order', {user, orders, title: 'Chi tiết đơn hàng' })
    });
  }).catch(function (err) {
    console.log(err);
  });
});


module.exports = router;
