const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
    res.send("Notes API Running");
});

app.get("/notes", (req, res) => {
    res.json(notes);
});

app.post("/notes", (req, res) => {
    const note = {
        id: notes.length + 1,
        text: req.body.text
    };

    notes.push(note);

    res.status(201).json(note);
});

app.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    note.text = req.body.text;

    res.json(note);
});

app.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const noteIndex = notes.findIndex(n => n.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes.splice(noteIndex, 1);

    res.json({
        message: "Note deleted"
    });
});

app.listen(PORT, () => {
    console.log("Server running on port",PORT);
});