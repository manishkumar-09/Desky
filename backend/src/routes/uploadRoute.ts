import { Router } from "express";
import { AvatarUpload } from "../middlewares/multerConfig";

const uploadRouter = Router();

uploadRouter.post("/profile", AvatarUpload.single("avatar"));
