import "dotenv/config";
import express from "express";
import fs from "fs";
import { generateTranscript } from "./transcriptGenerator.js";
import { summarizeTranscript } from "./transcriptSummarizer.js";

const app = express();

app.use(express.json());
// API 1 → GENERATE TRANSCRIPT
app.post("/generate-transcript", async (req, res) => {

  try {

    const transcript = await generateTranscript();

    fs.writeFileSync(
      "./transcript.txt",
      transcript
    );

    res.status(200).json({
      success: true,
      message: "Transcript generated successfully",
      transcript
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});
// API 2 → GENERATE SUMMARY
app.post("/generate-summary", async (req, res) => {

  try {

    const { transcript } = req.body;

    if (!transcript) {

      return res.status(400).json({
        success: false,
        message: "Transcript is required"
      });

    }

    const summary = await summarizeTranscript(transcript);

    fs.writeFileSync(
      "./summary.md",
      summary
    );

    res.status(200).json({
      success: true,
      message: "Summary generated successfully",
      summary
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