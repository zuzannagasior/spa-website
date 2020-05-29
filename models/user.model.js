const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: {type: String},
    email: {type: String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;