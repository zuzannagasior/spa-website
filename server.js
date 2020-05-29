const express = require("express")
const app = express()

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/dist'))

app.get("/", function (req, res) {
    res.render('index');
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));