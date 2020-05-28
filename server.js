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
// Setup reusable code
function getNotes() {
    return JSON.parse(fs.readFileSync(__dirname + "/db/db.json", function (err, data) {
        if (err) throw err;
        return data;
    }));
}
function setNotes(writtenNote) {
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(writtenNote), function (err) {
        if (err) throw err;
    });
}
// API Routes
// =============================================================
// Read db and return notes
app.get("/api/notes", function (req, res) {
    res.json(getNotes());
});
// Receive new note on req.body, add to db, and ret to client
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    var notes = getNotes();
    console.log(newNote);
    console.log(notes);
    // appends to the top of the array
    notes.unshift(0);
    notes.push(newNote);
    setNotes(newNote);
    return res.json(newNote);
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