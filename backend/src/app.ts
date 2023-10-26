import MongoStore from "connect-mongo";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import authenticateUser from "./middleware/auth";
import notesRouter from "./routes/notes";
import usersRouter from "./routes/users";
import env from "./util/validateEnv";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// middleware to set up express to accept json bodies in request
app.use(express.json());

// middleware for session management
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 10000 },
    rolling: true,
    store: MongoStore.create({ mongoUrl: env.MONGO_CONNECTION_STRING }),
  })
);

//
app.get("/", (req, res) => {
  res.json("Hello from notable server");
});

// ----notes app routes' middleware----
app.use("/api/notes", authenticateUser, notesRouter);
app.use("/api/users", usersRouter);

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
