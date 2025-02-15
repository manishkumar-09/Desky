import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Optional userId property
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

  // Check if the Authorization header is present and starts with "Bearer"
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Attach the userId to the request object
      req.userId = decoded.userId;
      next();
    } catch (err) {
      console.error("Token verification error:", err);
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  } else {
    // If no token is provided, respond with 401 Unauthorized
    res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }
};
