// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// EXPRESS CONFIGURATION
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// API Routes
// =============================================================
app.get("/api/notes", function (req, res) {
    res.json(JSON.parse(fs.readFileSync(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        return data;
    })));
});
// HTML Routes
// =============================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});