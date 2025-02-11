import { Request, Response } from "express";

export const uploadProfilePicture = (req: Request, res: Response) => {
  try {
    // check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    // const userId = req.user?.id;

    // ensure use is authenticated (jwt middleware)
    // if (!userId) {
    //     return res.status(401).status({
    //         success: false,
    //         message:"Unauthorized"
    //     })
    // }
  } catch (err) {
    console.error("Upload Error", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
