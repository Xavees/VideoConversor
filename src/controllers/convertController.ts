import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";

import { convertToMp4 } from "../services/ffmpegService";

function deleteFile(filePath: string) {
    fs.unlink(filePath, (error) => {
        if (error && error.code !== "ENOENT") {
            console.error(
                `Erro ao apagar arquivo ${filePath}:`,
                error
            );
        }
    });
}

export async function convertVideo(
    req: Request,
    res: Response
) {

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

        return res.download(
            outputPath,
            outputName,
            (e:any) => {

                deleteFile(inputPath);
                deleteFile(outputPath);

                if (e) {
                    console.error(
                        "Erro ao enviar arquivo:", e
                        
                    );
                }
            }
        );

    } catch (e:any) {

        console.error(
            "ERRO NA CONVERSÃO:", e
        );

        deleteFile(inputPath);
        deleteFile(outputPath);

        return res.status(500).json({
            e: "Não foi possível converter o vídeo."
        });
    }
}