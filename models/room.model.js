const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    id: {type: String},
    name: {type: String},
    beds: {type: Number},
    guests: {type: Number},
    price: {type: Number},
    photoUrl: {type: String}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;