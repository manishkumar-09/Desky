import { Request, Response } from "express";
import {
  LoginInput,
  loginSchema,
  registerSchema,
  RegisterUserInput,
} from "../validations/authValidation";
import { prisma } from "../lib/prismaClient";
import { ComparePassword, hashPassword } from "../utils/hashPassword";
import { TokenGenerator } from "../middlewares/token";

const userRegistration = async (req: Request, res: Response): Promise<any> => {
  try {
    // validate user input using zod validation

    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validation.error.errors,
      });
    }
    const { username, email, password }: RegisterUserInput = validation.data;
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username is already taken",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      message: "Registraion Successfull",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }
};

const LoginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (validation.success !== true) {
      return res.status(400).json({
        success: false,
        message: "User does not exist OR incorrect password",
        error: validation.error.errors,
      });
    }
    const { email, password }: LoginInput = validation.data;

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await ComparePassword(password, userExist.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = TokenGenerator({ userId: userExist.id });
    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }
};

const GetMe = async (req: Request, res: Response) => {};

export { userRegistration, LoginUser, GetMe };
