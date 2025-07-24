import express from "express";
import dotenv from "dotenv";
// dotenv.config();
dotenv.config({ quiet: true }); // surppress [dotenv@17.2.0] injecting env (2) from .env
import cookieParser  from "cookie-parser";
import cors from 'cors';

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

import path from "path";

const __dirname = path.resolve();

// const app = express(); socket me hai
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials : true,
})) 


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
