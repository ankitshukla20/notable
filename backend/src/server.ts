import "dotenv/config";
import env from "./util/validateEnv";
import express from "express";
const app = express();
const port = env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
