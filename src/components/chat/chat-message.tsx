'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';
import React from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatMessageProps = {
  message: Message;
  isLoading?: boolean;
};

function formatMessage(text: string) {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italics
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Newlines
  text = text.replace(/\n/g, '<br />');

  // Basic lists (lines starting with - or *)
  text = text.replace(/(?:<br \/>)?((?:\s*[-*]\s.*(?:<br \/>)?)+)/g, (match, listItems) => {
    const items = listItems.split(/<br \/>/).filter(item => item.trim().length > 0);
    const listHtml = items.map(item => `<li>${item.trim().substring(2)}</li>`).join('');
    return `<ul>${listHtml}</ul>`;
  });

  return text;
}


export default function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const { role, content } = message;
  const isAssistant = role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-3 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'p-3 rounded-lg max-w-[80%] prose prose-sm prose-p:my-1 prose-ul:my-2 prose-strong:text-foreground',
          isAssistant ? 'bg-card' : 'bg-primary text-primary-foreground prose-strong:text-primary-foreground'
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-current rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-current rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-current rounded-full animate-pulse"></span>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />
        )}
      </div>
    </div>
  );
}
