import express from "express";
import mongoose from "mongoose";
import path from "path";
import { authRouter } from "./routes/auth";
import { postsRouter } from "./routes/posts";
import { userRouter } from "./routes/users";
import helmet from "helmet";

const app = express();
const PORT = 8000;

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
app.use(helmet());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.get('/', (req, res) => {
	res.send('Hello Express')
})
app.listen(PORT, () => console.log("Listening Server"));
