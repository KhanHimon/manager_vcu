const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role_Schema = new Schema({
    role: { type: String }
});


module.exports = mongoose.model('Role', Role_Schema);