import express from "express";
import NoteModel from "../models/note.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

const router = express.Router();

interface NoteBody {
  title?: string;
  text?: string;
}

interface PostNoteRequest extends express.Request {
  body: NoteBody;
}

router
  .route("/")
  .get(async (req, res, next) => {
    const userId = req.session.userId;
    try {
      assertIsDefined(userId);

      const notes = await NoteModel.find({ userId }).exec();
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  })

  .post(async (req: PostNoteRequest, res, next) => {
    const { title, text } = req.body;
    const { userId } = req.session;

    try {
      assertIsDefined(userId);

      if (!title) {
        throw createHttpError(400, "Note must have a title");
      }

      const note = await NoteModel.create({
        userId,
        title,
        text,
      });

      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  });

interface PatchNoteRequest extends express.Request {
  params: { noteId: string };
  body: NoteBody;
}

router
  .route("/:noteId")
  .get(async (req, res, next) => {
    const noteId = req.params.noteId;
    const userId = req.session.userId;
    try {
      assertIsDefined(userId);

      if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note Id");
      }

      const note = await NoteModel.findById(noteId).exec();

      if (!note) {
        throw createHttpError(404, "Note not found");
      }

      if (note.userId !== userId) {
        throw createHttpError(401, "You cannot access this note");
      }

      res.status(200).json(note);
    } catch (error) {
      next(error);
    }
  })

  .patch(async (req: PatchNoteRequest, res, next) => {
    const noteId = req.params.noteId;
    const userId = req.session.userId;

    const { title: newTitle, text: newText } = req.body;

    try {
      assertIsDefined(userId);

      if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note id");
      }
      if (!newTitle) {
        throw createHttpError(400, "Note must have a title");
      }

      const updatedNote = await NoteModel.findOneAndUpdate(
        { _id: noteId, userId: userId },
        { title: newTitle, text: newText },
        { new: true }
      );

      if (!updatedNote) {
        throw createHttpError(404, "Note not found or unauthorized");
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    const noteId = req.params.noteId;
    const userId = req.session.userId;

    try {
      assertIsDefined(userId);

      if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note id");
      }

      const deletedNote = await NoteModel.findOneAndDelete({
        _id: noteId,
        userId: userId,
      });

      if (!deletedNote) {
        throw createHttpError(404, "Note not found or unauthorized");
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

export default router;
