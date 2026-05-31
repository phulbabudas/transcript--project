import OpenAI from "openai";
// OPENAI CLIENT

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// SUMMARIZE TRANSCRIPT
export async function summarizeTranscript(transcriptText) {

  try {

    const prompt = `
    Analyze the following customer support transcript
    and create a structured markdown summary.

    Format:

    ## Call Reason
    One short paragraph.

    ## Key Discussion Points
    - Point 1
    - Point 2

    ## Action Items / Next Steps
    - Action 1
    - Action 2

    ## Sentiment Analysis
    Mention customer sentiment.

    Transcript:
    ${transcriptText}
    `;

    const response = await client.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: "You are an expert call transcript summarizer."
        },
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.1

    });

    return response?.choices?.[0]?.message?.content ?? response?.choices?.[0]?.text ?? "Unable to summarize transcript.";

  } catch (error) {

    console.log("Summary Error:", error.message);

    return "Unable to summarize transcript.";

  }

}