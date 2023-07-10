import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
    res.send("home");
});

app.get("/jsmainlangauge", (_req: Request, res: Response) => {
    fs.readFile(__dirname + "/SORTED_DATA/js_as_main_language.json", "utf8", (err, json) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        try {
            let obj = JSON.parse(json);
            res.json(obj);
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.get("/dataByTools", (_req: Request, res: Response) => {
    fs.readFile(__dirname + "/SORTED_DATA/data_by_tools.json", "utf8", (err, json) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        try {
            let obj = JSON.parse(json);
            res.json(obj);
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.get("/allDocsByYear", (_req: Request, res: Response) => {
    fs.readFile(__dirname + "/SORTED_DATA/all_docs_by_year.json", "utf8", (err, json) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        try {
            let obj = JSON.parse(json);
            res.json(obj);
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.get("/allDocsByYear/:id", (req: Request, res: Response) => {
    fs.readFile(__dirname + "/SORTED_DATA/all_docs_by_year.json", "utf8", (err, json) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        try {
            let obj = JSON.parse(json);
            let send = obj[req.params.id];
            if (send) {
                res.json(send);
            } else {
                res.status(404).send("Not Found");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.use(express.static(path.join(__dirname, "public")));
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
