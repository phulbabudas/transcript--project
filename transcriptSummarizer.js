import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
console.log(" LangChain Transcript Chain running...");
const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0.1,
});

const template = `
You are writing a simple, human-friendly customer support summary.

Please summarize the transcript in clear plain English with these sections:

## Call Reason
Write 2-3 lines about why the customer called.

## Key Discussion Points
List the most important points in bullet form.

## Action Items / Next Steps
List what was promised, fixed, or needs to happen next.

## Sentiment Analysis
Briefly describe the customer mood and the tone of the conversation.

Transcript:
{transcript}
`;

const prompt = PromptTemplate.fromTemplate(
  template
);

const chain = prompt.pipe(llm);

export async function summarizeTranscript(
  transcriptText
) {

  try {

    const result = await chain.invoke({
      transcript: transcriptText,
    });

    if (typeof result?.content === "string") {
      return result.content;
    }

    return typeof result?.content === "object"
      ? JSON.stringify(result.content, null, 2)
      : String(result?.content ?? "Unable to summarize transcript.");

  } catch (error) {

    console.log(
      "Summary Error:",
      error?.message ?? error
    );

    return "Unable to summarize transcript.";
  }
}