const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    dateFrom: {type: String},
    dateTo: {type: String},
    email: {type: String},
    rooms: [String],
    treatments: [String]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;