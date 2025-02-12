import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

interface TokenPayload {
  userId: string;
}

// ✅ Function to generate both tokens
export const TokenGenerator = (payload: TokenPayload) => {
  try {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
  } catch (err) {
    console.error("JWT Signing Error:", err);
    throw new Error("Failed to generate token");
  }
};

// ✅ Function to generate only an access token
export const AccessTokenGenerator = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
};

// ✅ Function to verify refresh token
export const VerifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};
