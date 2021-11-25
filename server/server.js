const express = require("express");
const app = express();
const path = require('path')
app.get("/", (req, res) => {
	res.send("home");
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(4000);
