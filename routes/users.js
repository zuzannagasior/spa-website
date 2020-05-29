const router = require('express').Router();
let User = require('../models/user.model');

router.route('/:email').get((req, res) => {
    User.find({email: req.params.email})
    .then(user => {res.json(user)})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        email,
        password
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;