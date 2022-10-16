const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const createNote = (note) => {
  notes.push(note);
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes), null, 2);
  return note;
};

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();
  const note = createNote(req.body);
  res.json(note);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT} - http://localhost:${PORT}`));
