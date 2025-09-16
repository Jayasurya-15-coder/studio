// src/ai/flows/empathetic-chat.ts
'use server';

/**
 * @fileOverview A Genkit flow for empathetic chat with a mental wellness chatbot (Saathi).
 *
 * This file defines a flow that simulates conversations, providing empathetic responses,
 * validating feelings, and offering practical mental wellness support tailored to Indian
 * students preparing for exams, while maintaining confidentiality. The flow uses a tool
 * to choose appropriate grounding or breathing exercises, and provides helpful crisis
 * information as specified in the prompt.
 *
 * @exports empatheticChat - The main function to initiate the empathetic chat flow.
 * @exports EmpatheticChatInput - The input type for the empatheticChat function.
 * @exports EmpatheticChatOutput - The return type for the empatheticChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmpatheticChatInputSchema = z.object({
  message: z.string().describe('The user message to Saathi.'),
});
export type EmpatheticChatInput = z.infer<typeof EmpatheticChatInputSchema>;

const EmpatheticChatOutputSchema = z.object({
  response: z.string().describe('Saathi\u2019s response to the user message.'),
});
export type EmpatheticChatOutput = z.infer<typeof EmpatheticChatOutputSchema>;

const CrisisInfoSchema = z.object({
  acknowledgment: z.string().describe('An empathetic acknowledgement of the user\'s pain.'),
  groundingExercise: z.string().describe('A suggestion for a grounding or breathing exercise.'),
  helplineNumbers: z.string().describe('Helpline numbers to share with the user.'),
  encouragement: z.string().describe('Encouragement to reach out to a trusted person.'),
});

const getCrisisInformation = ai.defineTool(
  {
    name: 'getCrisisInformation',
    description:
      'If the user expresses severe distress (mentions suicide, giving up, self-harm, or hopelessness), this tool provides appropriate supportive responses, resource sharing (helpline numbers), and encouragement to connect with trusted individuals.',
    inputSchema: z.object({
      userMessage: z.string().describe('The user message to evaluate for distress.'),
    }),
    outputSchema: CrisisInfoSchema,
  },
  async () => {
    // This can call any typescript function.
    // Return crisis information
    return {
      acknowledgment: 'I\'m really sorry you\'re feeling this way. You are not alone.',
      groundingExercise:
        'Before we do anything else, I want you to know help is available right now. We can also try a short grounding exercise together, if you\'d like.',
      helplineNumbers: 'You can call India\'s 24/7 KIRAN helpline at 1800-599-0019. AASRA: +91-9820466726',
      encouragement: 'You matter, and I\'m here with you. Please consider reaching out to a trusted person (parent, teacher, friend).',
    };
  }
);

const saathiPrompt = ai.definePrompt({
  name: 'saathiPrompt',
  input: {schema: EmpatheticChatInputSchema},
  output: {schema: EmpatheticChatOutputSchema},
  tools: [getCrisisInformation],
  prompt: `You are \"Saathi,\" an empathetic, confidential, and non-judgmental wellness companion for Indian students preparing for exams (JEE, NEET, UPSC, etc.).\n\nCore Principles\n\nEmpathy first: Always validate the student’s feelings before giving advice.\n\nSimple + practical: Suggest one small, doable step (breathing, grounding, journaling, time-boxing).\n\nConfidentiality: Never ask for names, phone numbers, locations, or personal identifiers. Always remind users: \"This chat is private and anonymous.\"\n\nCulturally aware: Use warm Indian English/Hinglish, understand exam prep terms (mock test, drop year, prelims/mains, backlogs, rank anxiety).\n\nPeer-like tone: Speak like a supportive senior/friend, not like a teacher or doctor.\n\nCrisis protocol: If user expresses severe distress (mentions suicide, giving up, self-harm, or hopelessness), use the getCrisisInformation tool to obtain empathetic support and helpline information.  Make sure to use all the information provided by the tool.\n\nConversation Style\n\nShort, warm sentences.\n\nFriendly tone: mix of Hinglish and Indian English (\"Itna pressure normal hai yaar, you’re not alone.\").\n\nAlways: Validate → Suggest one tool → Ask for consent to continue.\n\nExamples\n\nUser: \"I’m anxious about tomorrow’s mock test.\"\nSaathi: \"Totally get that, yaar—mock tests can feel heavier than the real thing. Let’s try a 2-minute breathing reset together. Want me to guide you?\"\n\nUser: \"I feel useless, everyone else is ahead.\"\nSaathi: \"I hear you. Comparison hurts, especially in exam prep. But remember—even toppers doubt themselves. Let’s ground ourselves: Can you list 3 small wins from today, even tiny ones?\"\n\nUser: \"I don’t want to live anymore.\"\nSaathi: Use the getCrisisInformation tool.\n\n\nHere is the user message: {{{message}}}`,
});

export async function empatheticChat(input: EmpatheticChatInput): Promise<EmpatheticChatOutput> {
  return empatheticChatFlow(input);
}

const empatheticChatFlow = ai.defineFlow(
  {
    name: 'empatheticChatFlow',
    inputSchema: EmpatheticChatInputSchema,
    outputSchema: EmpatheticChatOutputSchema,
  },
  async input => {
    const {output} = await saathiPrompt(input);
    return output!;
  }
);
