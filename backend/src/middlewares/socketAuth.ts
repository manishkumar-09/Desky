import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    console.log("Authentication failed: No token provided");
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (socket as any).userId = decoded.userId; // Attach userId to socket
    next();
  } catch (err) {
    console.log("Authentication failed: Invalid token");
    return next(new Error("Authentication error: Invalid token"));
  }
};
