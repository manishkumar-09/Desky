import express from "express";
import commonRouter from "./routes/mainRoute";
const app = express();

//middleware
app.use(express.json());
app.use(commonRouter);
app.get("/", (req, res) => {
  res.send("Home Page");
});

export default app;
