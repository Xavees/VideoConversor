import { Router } from "express";
import multer from "multer";

import {
    convertVideos,
    downloadVideo
} from "../controllers/convertController";

const router = Router();

const upload = multer({
    dest: "uploads/",

    limits: {
        fileSize: 500 * 1024 * 1024,
        files: 10
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
    upload.array("videos", 10),
    convertVideos
);

router.get(
    "/download/:fileName",
    downloadVideo
);

export default router;