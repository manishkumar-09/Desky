import { Router, Response, Request } from "express";
import { LoginUser, userRegistration } from "../controllers/userController";
// import { Authentication } from "../middlewares/auth";
const userRouter = Router();

userRouter.post("/auth/registration", userRegistration);
userRouter.post("/auth/login", LoginUser);
userRouter.post(
  "/auth/check",
  //   Authentication,
  async (req: Request, res: Response) => {
    res.send("check");
  }
);
// userRouter.get("/auth/getme"); //add middleware which authenticate user before getting user information

export { userRouter };
