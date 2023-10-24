import { RequestHandler } from "express";
import createHttpError from "http-errors";

const authenticateUser: RequestHandler = async (req, res, next) => {
  // console.log(req.session);
  if (req.session.userId) {
    next();
  } else {
    next(createHttpError(401, "User not aunthenticated"));
  }
};

export default authenticateUser;
