import express from "express";

const router = express.Router();

router.route("/signup").get((req, res) => {
  res.json("Hello World");
});

export default router;
