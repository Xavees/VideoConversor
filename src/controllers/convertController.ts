import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";
import { convertToMp4 } from "../services/ffmpegService";

export async function convertVideo(req: Request, res: Response) {

    if (!req.file) {
        return res.status(400).json({
            error: "Nenhum vídeo enviado."
        });
    }

    const inputPath = req.file.path;

    const outputName =
        `${Date.now()}-${path.parse(req.file.originalname).name}.mp4`;

    const outputPath = path.join(
        "converted",
        outputName
    );

    try {

        await convertToMp4(
            inputPath,
            outputPath
        );

        res.download(outputPath, outputName, (error) => {

            fs.unlink(inputPath, () => {});
            fs.unlink(outputPath, () => {});

            if (error) {
                console.error(error);
            }

        });

    } catch (e:any) {
    console.error("ERRO NA CONVERSÃO:", e);

    fs.unlink(inputPath, () => {});

    return res.status(500).json({
        error: "Não foi possível converter o vídeo."
    });
}}