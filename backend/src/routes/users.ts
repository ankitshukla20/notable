import bcrypt from "bcrypt";
import express from "express";
import createHttpError from "http-errors";
import authenticateUser from "../middleware/auth";
import UserModel from "../models/user.model";
import { assertIsDefined } from "../util/assertIsDefined";

const router = express.Router();

// ----Protected Me Route----

router.route("/me").get(authenticateUser, async (req, res, next) => {
  const userId = req.session.userId;
  try {
    assertIsDefined(userId);

    const user = await UserModel.findById(userId).select("+email").exec();
    res.json({ username: user?.username, email: user?.email });
  } catch (error) {
    next(error);
  }
});

// ----Login, Logout and Register routes----

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}

interface PostSignupRequest extends express.Request {
  body: SignupBody;
}

router.route("/signup").post(async (req: PostSignupRequest, res, next) => {
  const { username, email, password: passwordRaw } = req.body;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await UserModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a differnt one."
      );
    }

    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists. Please log in instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json({ username: newUser.username, email: newUser.email });
  } catch (error) {
    next(error);
  }
});

interface LoginBody {
  username?: string;
  password?: string;
}

interface PostLoginRequest extends express.Request {
  body: LoginBody;
}

router.route("/login").post(async (req: PostLoginRequest, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await UserModel.findOne({ username })
      .select("+email +password")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid Credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid Credentials");
    }

    req.session.userId = user._id;

    res.status(201).json({ username: user.username, email: user.email });
  } catch (error) {
    next(error);
  }
});

router.route("/logout").post((req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(createHttpError(500, "An error occurred while logging out"));
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
