'use server';

/**
 * @fileOverview Crisis intervention flow for Saathi, the mental wellness chatbot.
 *
 * - crisisIntervention - A function that handles the crisis intervention process.
 * - CrisisInterventionInput - The input type for the crisisIntervention function.
 * - CrisisInterventionOutput - The return type for the crisisIntervention function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CrisisInterventionInputSchema = z.object({
  message: z.string().describe('The user message to check for crisis indicators.'),
});
export type CrisisInterventionInput = z.infer<typeof CrisisInterventionInputSchema>;

const CrisisInterventionOutputSchema = z.object({
  isCrisis: z.boolean().describe('Whether the user is in crisis.'),
  response: z.string().describe('The appropriate response to the user.'),
});
export type CrisisInterventionOutput = z.infer<typeof CrisisInterventionOutputSchema>;

export async function crisisIntervention(input: CrisisInterventionInput): Promise<CrisisInterventionOutput> {
  return crisisInterventionFlow(input);
}

const crisisResponseTool = ai.defineTool({
  name: 'getCrisisResponse',
  description: 'Returns an empathetic and supportive response, helpline numbers, and encouragement to connect with trusted individuals if the user expresses severe distress (suicide, self-harm, hopelessness).',
  inputSchema: z.object({
    message: z.string().describe('The user message to check for crisis indicators.'),
  }),
  outputSchema: z.string(),
}, async (input) => {
  const response = `I’m really sorry you’re feeling this way. You are not alone. Before we do anything else, I want you to know help is available right now. You can call India’s 24/7 KIRAN helpline at 1800-599-0019 or AASRA at +91-9820466726. We can also try a short grounding exercise together, if you’d like. You matter, and I’m here with you.`;
  return response;
});


const prompt = ai.definePrompt({
  name: 'crisisInterventionPrompt',
  input: {schema: CrisisInterventionInputSchema},
  output: {schema: CrisisInterventionOutputSchema},
  tools: [crisisResponseTool],
  prompt: `You are Saathi, an empathetic, confidential, and non-judgmental wellness companion for Indian students preparing for exams. Your task is to determine if the user's message indicates a crisis situation (suicide, self-harm, hopelessness). If a crisis is detected, use the getCrisisResponse tool to get the appropriate response. Otherwise, indicate that it is not a crisis and return an empty string for the response.

Message: {{{message}}}

Output format: { \"isCrisis\": true/false, \"response\": \"...\" }`,
});

const crisisInterventionFlow = ai.defineFlow(
  {
    name: 'crisisInterventionFlow',
    inputSchema: CrisisInterventionInputSchema,
    outputSchema: CrisisInterventionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
