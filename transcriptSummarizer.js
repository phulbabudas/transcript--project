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

    return result.content;

  } catch (error) {

    console.log(
      "Summary Error:",
      error?.message ?? error
    );

    return "Unable to summarize transcript.";
  }
}