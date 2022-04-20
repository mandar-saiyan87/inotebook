import express from "express";
import Note from "../models/Notes.js";
import fetchuser from "../middleware/fetchuser.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();

// ROUTE 1: Get all notes. /api/notes/fetchallnotes. Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error")
    }

})

/* *************************************************************** */

// ROUTE 2: Add new notes. /api/notes/addnewnote. Login required.
router.post("/addnewnote", fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Description atleast 5 characters').isLength({ min: 5 }),],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = await new Note({
                user: req.user.id,
                title,
                description,
                tag
            })
            const saveNote = await note.save()
            res.json(saveNote);

        } catch (error) {

            console.log(error.message);
            res.status(500).send("Internal server error")
        }

    }
)

/* *************************************************************** */

// ROUTE 3:  Update/Edit existing notes. /api/notes/updatenote. Login required.

router.put("/updatenote/:id", fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Description atleast 5 characters').isLength({ min: 5 }),],
    async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Find the note and update
            let note = await Note.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Not found");
            }

            // Allow authenticated user to update note if he is owner of the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note })
        } catch (error) {

            console.log(error.message);
            res.status(500).send("Internal server error")
        }
        // Create new note

    }
)

/* *************************************************************** */

// ROUTE 4:  Delete note. /api/notes/deletenote. Login required.

router.delete("/deletenote/:id", fetchuser,
    async (req, res) => {
        try {
            // Find the note and delete
            let note = await Note.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Not found");
            }

            // Allow authenticated user to delete note if he is owner of the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ "Succes": "Note deleted successfully" })
        } catch (error) {

            console.log(error.message);
            res.status(500).send("Internal server error")
        }

    }
)

export default router;