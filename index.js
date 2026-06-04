import "dotenv/config";
import express from "express";
import fs from "fs";
import { generateTranscript } from "./transcriptGenerator.js";
import { summarizeTranscript } from "./transcriptSummarizer.js";
import connectDB from "./database.js";
import Transcript from "./models.js";
const app = express();

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Transcript API is running. Use /generate-transcript or /generate-summary.",
  });
});

app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

// API 1 → GENERATE TRANSCRIPT
app.post("/generate-transcript", async (req, res) => {
  try {
    const transcript = await generateTranscript();
    await Transcript.create({
      transcript,
    });

    res.status(200).json({
      success: true,
      message: "Transcript generated successfully",
      transcript,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// API 2 → GENERATE SUMMARY
app.post("/generate-summary", async (req, res) => {
  try {
    const transcript = typeof req.body?.transcript === "string"
      ? req.body.transcript.trim()
      : "";

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string.",
      });
    }

    const summary = await summarizeTranscript(transcript);

    await Transcript.create({
      transcript,
      summary,
    });

    res.status(200).json({
      success: true,
      message: "Summary generated successfully",
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/transcripts", async (req, res) => {
  try {

    const data = await Transcript.find();

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
