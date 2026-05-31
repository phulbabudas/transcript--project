import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
  transcript: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: false
  }
});

const Transcript = mongoose.model("Transcript", transcriptSchema);

export default Transcript;