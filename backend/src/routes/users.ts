import express from "express";
import createHttpError from "http-errors";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";

const router = express.Router();

interface UserBody {
  username?: string;
  email?: string;
  password?: string;
}

interface PostSignupRequest {
  body: UserBody;
}

router.route("/signup").post(async (req: PostSignupRequest, res, next) => {
  const { username, email, password: passwordRaw } = req.body;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await userModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a differnt one."
      );
    }

    const existingEmail = await userModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists. Please log in instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;
