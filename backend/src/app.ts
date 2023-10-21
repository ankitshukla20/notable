import express, { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import notesRouter from "./routes/notes";
import createHttpError, { isHttpError } from "http-errors";

const app = express();
// middleware to set up express to accept json bodies in request
app.use(express.json());

// ----notes app routes' middleware----
app.use("/api/notes", notesRouter);

// ----Error Handlers----
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
