import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai-suggestions", aiRoutes);

app.get("/", (req, res) => {
    res.status(200).json({message : "Blog GenAI is running!"})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})