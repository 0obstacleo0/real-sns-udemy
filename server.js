require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const PORT = 3000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONN_STR)

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, console.log("server is running"));