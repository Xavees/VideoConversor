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