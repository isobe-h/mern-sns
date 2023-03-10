import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { postsRouter } from "./routes/posts";
import { userRouter } from "./routes/users";

const app = express();
const PORT = 3000;

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("DBに接続しました");
  })
  .catch((err: any) => {
    console.error(err);
  });

// Middleware
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(PORT, () => console.log("Listening Server"));
