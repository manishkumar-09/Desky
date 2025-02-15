import { Router, Response, Request } from "express";
import {
  getNewAccessToken,
  LoginUser,
  LogoutUser,
  userRegistration,
} from "../controllers/userController";
import { Authentication } from "../middlewares/auth";
const userRouter = Router();

userRouter.post("/auth/registration", userRegistration);
userRouter.post("/auth/login", LoginUser);
userRouter.get(
  "/auth/check",
  Authentication,
  async (req: Request, res: Response) => {
    res.json({ Id: req.userId });
  }
);
userRouter.post("/auth/refresh", getNewAccessToken);
userRouter.post("/auth/logout", LogoutUser);
export { userRouter };
