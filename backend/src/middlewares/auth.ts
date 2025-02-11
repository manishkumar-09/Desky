import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
const JWT_SECRET = process.env.JWT_SECRET as string;
export const Authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized : Invalid token",
      });
    }
    req.userId = decoded.userId;
  }
  next();
};
