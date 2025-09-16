'use server';

/**
 * @fileOverview An AI agent that suggests time-boxing methods for students preparing for exams.
 *
 * - suggestTimeboxing - A function that suggests time-boxing methods.
 * - SuggestTimeboxingInput - The input type for the suggestTimeboxing function.
 * - SuggestTimeboxingOutput - The return type for the suggestTimeboxing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTimeboxingInputSchema = z.object({
  examType: z.string().describe('The type of exam the student is preparing for (e.g., JEE, NEET, UPSC).'),
  currentStudySchedule: z.string().describe('A description of the student\'s current study schedule and habits.'),
  anxietyLevel: z.string().describe('The student\'s current level of anxiety related to their studies (e.g., low, medium, high).'),
});
export type SuggestTimeboxingInput = z.infer<typeof SuggestTimeboxingInputSchema>;

const SuggestTimeboxingOutputSchema = z.object({
  timeboxingSuggestion: z.string().describe('A suggestion for how the student can use time-boxing to improve their study habits and reduce anxiety.'),
  reasoning: z.string().describe('The reasoning behind the timeboxing suggestion, explaining how it addresses the student\'s specific needs and challenges.'),
});
export type SuggestTimeboxingOutput = z.infer<typeof SuggestTimeboxingOutputSchema>;

export async function suggestTimeboxing(input: SuggestTimeboxingInput): Promise<SuggestTimeboxingOutput> {
  return suggestTimeboxingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTimeboxingPrompt',
  input: {schema: SuggestTimeboxingInputSchema},
  output: {schema: SuggestTimeboxingOutputSchema},
  prompt: `You are Saathi, an empathetic wellness companion for Indian students preparing for exams.

A student preparing for {{{examType}}} exams is struggling with time management and anxiety. Here's their current study schedule and habits:

{{{currentStudySchedule}}}

Their anxiety level is currently: {{{anxietyLevel}}}

Based on this information, suggest a specific time-boxing method that can help them structure their study sessions and reduce their anxiety. Explain your reasoning for why this method is appropriate for their situation. Be sure to use warm Indian English/Hinglish.

Format your response as:

Timeboxing Suggestion: [A specific time-boxing suggestion]
Reasoning: [The reasoning behind the suggestion]
`,
});

const suggestTimeboxingFlow = ai.defineFlow(
  {
    name: 'suggestTimeboxingFlow',
    inputSchema: SuggestTimeboxingInputSchema,
    outputSchema: SuggestTimeboxingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
