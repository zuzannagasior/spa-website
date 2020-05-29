const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
    id: {type: String},
    name: {type: String},
    area: {type: String},
    time: {type: Number},
    price: {type: Number},
    photoUrl: {type: String}
});

const Treatment = mongoose.model('Treatment', treatmentSchema);

module.exports = Treatment;