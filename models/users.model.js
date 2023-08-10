const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    username: { type: String },
    password: { type: String },
    full_name: { type: String },
    cccd_cmnd: { type: String },
    birthday: { type: Date },
    address: { type: String },
    number_phone: { type: Number },
    user_role : [{type: Schema.Types.ObjectId, ref:'Role'}],
    email: { type: String },
    create_date: { type: Date }
});


module.exports = mongoose.model('User', User_Schema);