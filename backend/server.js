/**
 * server.js — Application entry point
 *
 * NOTE: dotenv is loaded BEFORE this file is evaluated via the --env-file flag
 * in package.json scripts:
 *   "start": "node --env-file=.env server.js"
 *   "dev":   "nodemon --exec 'node --env-file=.env server.js' server.js"
 *
 * This guarantees process.env is fully populated before any ES module import
 * is evaluated — solving the ES module hoisting problem permanently.
 * No dotenv import is needed here.
 */

import express from "express";
import cors from "cors";

import { validateEnv } from "./config/validateEnv.js";
import routes from "./routes/index.js";

// Fail fast if any required environment variable is missing.
validateEnv();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://futureacehospital.com",
        "https://www.futureacehospital.com",
        "http://localhost:5174",

    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use("/api", routes);

// ─── 404 catch-all ───────────────────────────────────────────────────────────

app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});

// ─── Global error handler ────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
});

// ─── Start ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});