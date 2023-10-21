import express from "express";
import NoteModel from "../models/note.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

const router = express.Router();

interface NoteBody {
  title?: string;
  text?: string;
}

interface PostNoteRequest {
  body: NoteBody;
}

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

  .post(async (req: PostNoteRequest, res, next) => {
    const { title, text } = req.body;

    try {
      if (!title) {
        throw createHttpError(400, "Note must have a title");
      }

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

interface PatchNoteRequest {
  params: { noteId: string };
  body: NoteBody;
}

router
  .route("/:noteId")
  .get(async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
      if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note Id");
      }

      const note = await NoteModel.findById(noteId).exec();

      if (!note) {
        throw createHttpError(404, "Note not found");
      }

      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  })

  .patch(async (req: PatchNoteRequest, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try {
      if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note id");
      }
      if (!newTitle) {
        throw createHttpError(400, "Note must have a title");
      }

      const updatedNote = await NoteModel.findByIdAndUpdate(
        noteId,
        { title: newTitle, text: newText },
        { new: true }
      );

      if (!updatedNote) {
        throw createHttpError(404, "Note not found");
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
      if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note id");
      }

      const deletedNote = await NoteModel.findByIdAndDelete(noteId);

      if (!deletedNote) {
        throw createHttpError(404, "Note not found");
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

export default router;
