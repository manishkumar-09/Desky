import express from "express";
import cookieParser from "cookie-parser";
import commonRouter from "./routes/mainRoute";
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(commonRouter);
app.get("/", (req, res) => {
  res.send("Home Page");
});

export default app;
