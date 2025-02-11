import jwt from "jsonwebtoken";

//Ensure jwt secret exists
const JWT_SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
  userId: string;
}
export const TokenGenerator = (payload: TokenPayload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  } catch (err) {
    console.error("Jwt signing error", err);
    throw new Error("Failed to generate token");
  }
};
