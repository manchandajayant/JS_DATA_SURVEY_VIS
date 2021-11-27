const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");


console.log("server running")
app.get("/", (req, res) => {
	res.send("home");
});

app.get("/jsMainLangauge", (req, res) => {
	fs.readFile(
		__dirname + "/SORTED_DATA/js_as_main_language.json",
		(err, json) => {
			if (err) throw err;
			let obj = JSON.parse(json);
			res.json(obj);
		}
	);
});
app.get("/dataByTools", (req, res) => {
	fs.readFile(
		__dirname + "/SORTED_DATA/data_by_tools.json",
		(err, json) => {
			if (err) throw err;
			let obj = JSON.parse(json);
			res.json(obj);
		}
	);
});
app.get("/allDocsByYear", (req, res) => {
	fs.readFile(
		__dirname + "/SORTED_DATA/all_docs_by_year.json",
		(err, json) => {
			if (err) throw err;
			let obj = JSON.parse(json);
			res.json(obj);
		}
	);
});
app.get("/allDocsByYear/:id", (req, res) => {
	fs.readFile(
		__dirname + "/SORTED_DATA/all_docs_by_year.json",
		(err, json) => {
			if (err) throw err;
			let obj = JSON.parse(json);
			let send = obj[req.params.id]
			res.json(send);
		}
	);
});

app.use(express.static(path.join(__dirname, "public")));
app.listen(4000);
