import multer from "multer";
import path from "path";

//save images in uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // name of the file on the user's computer
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const AvatarUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export { AvatarUpload };
