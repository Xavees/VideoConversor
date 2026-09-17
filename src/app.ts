import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "node:fs";
import path from "node:path";

import convertRoutes from "./routes/convertRoutes";

const app = express();

const uploadDirectory = path.resolve("uploads");
const convertedDirectory = path.resolve("converted");

fs.mkdirSync(uploadDirectory, {
    recursive: true
});

fs.mkdirSync(convertedDirectory, {
    recursive: true
});



const FILE_EXPIRATION_TIME =
    30 * 60 * 1000;

function cleanOldFiles(directory: string) {

    const files = fs.readdirSync(directory);

    for (const file of files) {

        const filePath =
            path.join(directory, file);

        const stats =
            fs.statSync(filePath);

        const fileAge =
            Date.now() - stats.mtimeMs;

        if (fileAge > FILE_EXPIRATION_TIME) {

            fs.unlinkSync(filePath);

            console.log(
                `Arquivo antigo removido: ${file}`
            );
        }
    }
}

cleanOldFiles(uploadDirectory);
cleanOldFiles(convertedDirectory);







app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", convertRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Video Converter API funcionando!"
    });
});

export default app;