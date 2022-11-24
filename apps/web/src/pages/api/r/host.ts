import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import nc from "next-connect";

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  // Handle any valid HTTP method
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: `Sorry, something Happened! ${err.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// storage object for middleware
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./models");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + file.originalname + ".rds");
  },
});

const upload = multer({ storage: storage });

const uploadFile = upload.single("model");

apiRoute.use(uploadFile);

apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
