import { Router } from "express";
import { userRouter } from "./userRoutes";

const commonRouter = Router();

commonRouter.use("/api", userRouter);
export default commonRouter;
