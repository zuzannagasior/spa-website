const router = require('express').Router();
let Treatment = require('../models/treatment.model');

router.route('/:area').get((req, res) => {
    Treatment.find({area: req.params.area})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Treatment.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;