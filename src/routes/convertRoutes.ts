import { Router } from "express";
import multer from "multer";

import { convertVideo } from "../controllers/convertController";

const router = Router();

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/convert",
    upload.single("video"),
    convertVideo
);

export default router;