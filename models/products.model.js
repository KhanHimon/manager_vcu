const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product_Schema = new Schema({
    product_sku: { type: String },
    product_name: { type: String }, // tên sản phẩm
    entry_price: { type: Number }, // giá nhập
    price: { type: Number }, // giá bán
    quantity: { type: Number }, // số lượng
    product_type: { type: String }, // Loại sản phẩm
    product_color: { type: String }, // Màu sắc sản phẩm
    product_description: {type: String}, // Mô tả sản phẩm
    product_size: { type: String}, // Kích thước sản phẩm
    create_date: { type: Date } // Ngày khởi tạo sản phẩm
});


module.exports = mongoose.model('Product', Product_Schema);