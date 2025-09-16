// src/ai/flows/guided-breathing-exercise.ts
'use server';

/**
 * @fileOverview A guided breathing exercise flow.
 *
 * - guidedBreathingExercise - A function that guides the user through a breathing exercise.
 * - GuidedBreathingExerciseInput - The input type for the guidedBreathingExercise function.
 * - GuidedBreathingExerciseOutput - The return type for the guidedBreathingExercise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuidedBreathingExerciseInputSchema = z.object({
  exerciseType: z
    .enum(['breathing', 'grounding'])
    .describe('The type of exercise to guide the user through.'),
});
export type GuidedBreathingExerciseInput = z.infer<
  typeof GuidedBreathingExerciseInputSchema
>;

const GuidedBreathingExerciseOutputSchema = z.object({
  instructions: z.string().describe('The instructions for the exercise.'),
});
export type GuidedBreathingExerciseOutput = z.infer<
  typeof GuidedBreathingExerciseOutputSchema
>;

export async function guidedBreathingExercise(
  input: GuidedBreathingExerciseInput
): Promise<GuidedBreathingExerciseOutput> {
  return guidedBreathingExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'guidedBreathingExercisePrompt',
  input: {schema: GuidedBreathingExerciseInputSchema},
  output: {schema: GuidedBreathingExerciseOutputSchema},
  prompt: `You are Saathi, an empathetic wellness companion for Indian students.

You will guide the student through a {{exerciseType}} exercise to alleviate stress and regain focus.

If the user chose breathing exercises, guide them through a simple 4-7-8 breathing technique:

Inhale deeply through your nose for 4 seconds.
Hold your breath for 7 seconds.
Exhale slowly through your mouth for 8 seconds.
Repeat this cycle at least 4 times.

If the user chose grounding exercises, guide them through the 5-4-3-2-1 grounding technique:

Name 5 things you can see around you.
Name 4 things you can feel.
Name 3 things you can hear.
Name 2 things you can smell.
Name 1 thing you can taste.

Make sure to explain each step clearly and simply.
`,
});

const guidedBreathingExerciseFlow = ai.defineFlow(
  {
    name: 'guidedBreathingExerciseFlow',
    inputSchema: GuidedBreathingExerciseInputSchema,
    outputSchema: GuidedBreathingExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
