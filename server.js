const express = require("express");
const mongoose = require('mongoose');
const path = require("path")

require('dotenv').config();

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

const uri = process.env.MONGODB_URI || process.env.LOCAL_URI;

mongoose.connect(uri, { 
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const roomsRouter = require('./routes/rooms');
const treatmentsRouter = require('./routes/treatments');
const usersRouter = require('./routes/users');
const bookingsRouter = require('./routes/bookings');

app.use('/roomsdb', roomsRouter);
app.use('/treatmentsdb', treatmentsRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);

app.use(express.static(__dirname + '/dist'))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, 
	() => console.log("Server is running..."));