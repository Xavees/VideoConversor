import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";

import { convertToMp4 } from "../services/ffmpegService";

function deleteFile(filePath: string) {
    fs.unlink(filePath, (error) => {
        if (error && error.code !== "ENOENT") {
            console.error(`Erro ao apagar ${filePath}:`, error);
        }
    });
}


const FILE_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos

function scheduleFileDeletion(filePath: string) {
    setTimeout(() => {
        deleteFile(filePath);

        console.log(
            `Arquivo expirado e removido: ${filePath}`
        );
    }, FILE_EXPIRATION_TIME);
}



export async function convertVideos(
    req: Request,
    res: Response
) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        return res.status(400).json({
            error: "Nenhum vídeo enviado."
        });
    }

    const convertedFiles: {
        path: string;
        name: string;
        storedName: string;
    }[] = [];

    try {
        // Converte um vídeo de cada vez.
        for (const file of files) {
            const originalName =
                path.parse(file.originalname).name;

            const storedName =
                `${Date.now()}-${originalName}.mp4`;

            const outputPath = path.join(
                "converted",
                storedName
            );

            console.log(
                `Convertendo ${file.originalname}...`
            );

            await convertToMp4(
    file.path,
    outputPath
);

        convertedFiles.push({
             path: outputPath,
             name: `${originalName}.mp4`,
             storedName
});

// MPG original não é mais necessário
        deleteFile(file.path);

// MP4 fica disponível temporariamente

     scheduleFileDeletion(outputPath);
            console.log(
                `${file.originalname} convertido!`
            );
        }

        return res.status(200).json({
            message: "Conversão concluída.",

            files: convertedFiles.map((video) => ({
                name: video.name,
                downloadUrl:
                    `/api/download/${encodeURIComponent(video.storedName)}`
            }))
        });

    } catch (error) {
        console.error(
            "ERRO NA CONVERSÃO:",
            error
        );

        files.forEach((file) => {
            deleteFile(file.path);
        });

        convertedFiles.forEach((video) => {
            deleteFile(video.path);
        });

        return res.status(500).json({
            error: "Não foi possível converter os vídeos."
        });
    }
}


// OUTRA FUNÇÃO
export function downloadVideo(
    req: Request,
    res: Response
) {
    const fileName =
        path.basename(req.params.fileName as string);

    const filePath = path.resolve(
        "converted",
        fileName
    );

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            error: "Arquivo não encontrado ou expirado."
        });
    }

    return res.download(
        filePath,
        fileName,
        (error) => {
            if (error) {
                console.error(
                    "Erro durante o download:",
                    error
                );

                return;
            }

            console.log(
                `Download realizado: ${fileName}`
            );
        }
    );
}