import "dotenv/config";
import fs from "fs";
import { summarizeTranscript } from "./transcriptSummarizer.js";

const transcriptPath = "./transcript.txt";

async function run() {
  try {
    if (!fs.existsSync(transcriptPath)) {
      console.error("transcript.txt not found. Create a transcript.txt file in the project root.");
      process.exit(1);
    }

    const text = fs.readFileSync(transcriptPath, "utf8");
    const summary = await summarizeTranscript(text);
    console.log("--- Summary ---\n", summary);
  } catch (err) {
    console.error("Test error:", err);
  }
}

run();
