import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;