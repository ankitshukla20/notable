import express from "express";
import NoteModel from "../models/note.model";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const notes = await NoteModel.find().exec();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
      const note = await NoteModel.create({
        title,
        text,
      });

      res
        .status(201)
        .json({ message: "Note created successfully", noteId: note._id });
    } catch (error) {
      next(error);
    }
  });

router.route("/:noteId").get(async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const note = await NoteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

export default router;
