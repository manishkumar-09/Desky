import { Request, Response } from "express";
import {
  registerSchema,
  RegisterUserInput,
} from "../validations/authValidation";
import { prisma } from "../lib/prismaClient";
import { hashPassword } from "../utils/hashPassword";

const userRegistration = async (req: Request, res: Response): Promise<any> => {
  try {
    // validate user input using zod validation

    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        // ✅ Use 400 for validation errors
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

const LoginUser = async (req: Request, res: Response) => {};

const GetMe = async (req: Request, res: Response) => {};

export { userRegistration, LoginUser, GetMe };
