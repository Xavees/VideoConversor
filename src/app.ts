import express from "express";
import cors from "cors";
import helmet from "helmet";

import convertRoutes from "./routes/convertRoutes";

const app = express();

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