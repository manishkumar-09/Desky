import { Router } from "express";
import { Authentication } from "../middlewares/auth";
import { createRoom } from "../controllers/videoController";
const videoRouter = Router();

videoRouter.post("/room/create", Authentication, createRoom);

export { videoRouter };
