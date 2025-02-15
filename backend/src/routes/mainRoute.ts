import { Router } from "express";
import { userRouter } from "./userRoutes";
import { videoRouter } from "./video-routes";

const commonRouter = Router();

commonRouter.use("/api", userRouter);
commonRouter.use("/api", videoRouter);
export default commonRouter;
