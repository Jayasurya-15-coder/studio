
'use server';

import { empatheticChat } from '@/ai/flows/empathetic-chat';
import { z } from 'zod';

const inputSchema = z.string().min(1, { message: 'Message cannot be empty.' }).max(500, { message: 'Message is too long.' });

export async function getAiResponse(message: string): Promise<{ success: boolean; response: string }> {
  const validation = inputSchema.safeParse(message);

  if (!validation.success) {
    return { success: false, response: validation.error.errors[0].message };
  }

  try {
    const aiResponse = await empatheticChat({ message });
    return { success: true, response: aiResponse.response };
  } catch (error) {
    console.error('Error getting AI response:', error);
    return { success: false, response: "I'm having some trouble connecting right now. Please try again in a moment." };
  }
}
