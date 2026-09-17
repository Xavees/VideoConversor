import { Router } from "express";
import multer from "multer";

import { convertVideo } from "../controllers/convertController";

const router = Router();

const upload = multer({
    dest: "uploads/",

    limits: {
        fileSize: 500 * 1024 * 1024
    },

    fileFilter: (req, file, callback) => {

        const formatosPermitidos = [
            "video/mpeg",
            "video/mp4",
            "video/x-msvideo",
            "video/quicktime",
            "video/webm",
            "video/x-matroska"
        ];

        if (!formatosPermitidos.includes(file.mimetype)) {
            return callback(
                new Error("Formato de vídeo não suportado.")
            );
        }

        callback(null, true);
    }
});

router.post(
    "/convert",
    upload.single("video"),
    convertVideo
);

export default router;