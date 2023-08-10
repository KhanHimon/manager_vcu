const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order_Schema = new Schema({
    name_user_order: { type: String }, // Tên khách hàng order
    order_product: { type: Schema.Types.ObjectId, ref:'Product', }, // Tên sản phẩm order
    order_product_quantity: { type: Number }, // Số lượng sản phẩm trong đơn hàng
    order_address: { type: String }, // Địa chỉ khách hàng
    order_number_phone: { type: String }, // Số điện thoại khách hàng
    order_value: { type: Number }, // Giá trị đơn hàng
    order_prepayment: {type: Number}, // Số tiền thanh toán trước
    order_remaining : {type: Number}, // Số tiền còn lại
    order_unit_price: {type: Number} , // Tiền bán
    order_price_profit: { type: Number }, // Lợi nhuận
    order_entry_price: {type: Number}, // Tiền nhập
    create_date: { type: Date}
});


module.exports = mongoose.model('Order', Order_Schema);