const router = require('express').Router();
let Room = require('../models/room.model');

router.route('/').get((req, res) => {
    Room.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;