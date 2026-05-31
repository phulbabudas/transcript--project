import OpenAI from "openai";
// OPENAI CLIENT
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// GENERATE MOCK TRANSCRIPT
export async function generateTranscript() {

  try {

    const prompt = `
    Generate a realistic customer support call transcript.

    Requirements:
    - Conversation between Customer and Support Agent
    - Include timestamps
    - At least 15 dialogue exchanges
    - Topic should be billing issue or payment failure
    - Make the conversation natural and human-like
    - Use speaker labels like:
      Agent:
      Customer:
    `;

    const response = await client.chat.completions.create({

      model: "gpt-4o",

      messages: [
        {
          role: "system",
          content: "You are a professional customer support conversation generator."
        },
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.

    });

    return response?.choices?.[0]?.message?.content ?? response?.choices?.[0]?.text ?? "Unable to generate transcript.";

  } catch (error) {

    console.log("Transcript Generation Error:", error.message);

    return "Unable to generate transcript.";

  }

}
