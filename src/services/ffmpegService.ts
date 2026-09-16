import { spawn } from "node:child_process";

export function convertToMp4(
    input: string,
    output: string
): Promise<void> {

    return new Promise((resolve, reject) => {

        console.log("Entrada:", input);
        console.log("Saída:", output);
        console.log("Iniciando FFmpeg...");

        const ffmpeg = spawn("ffmpeg", [
            "-i", input,
            "-c:v", "libx264",
            "-c:a", "aac",
            "-movflags", "+faststart",
            output
        ]);

        ffmpeg.stderr.on("data", (data) => {
            console.log("[FFMPEG]", data.toString());
        });

        ffmpeg.on("error", (error) => {
            console.error("Erro ao iniciar FFmpeg:", error);
            reject(error);
        });

        ffmpeg.on("close", (code) => {
            console.log("FFmpeg terminou com código:", code);

            if (code === 0) {
                resolve();
            } else {
                reject(
                    new Error(`FFmpeg encerrou com código ${code}`)
                );
            }
        });
    });
}