import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import userRoute from "./routes/user.routes.js";
import projectRoute from "./routes/project.routes.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

connectDB();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoute);
app.use("/projects",projectRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;