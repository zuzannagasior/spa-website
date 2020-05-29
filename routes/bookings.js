const router = require('express').Router();
let Booking = require('../models/booking.model');

router.route('/').post((req, res) => {
    const newBooking = new Booking({
        ...req.body
    });

    newBooking.save()
        .then(() => res.json('Booking added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;