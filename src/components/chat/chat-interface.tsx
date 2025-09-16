'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { getAiResponse } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal } from 'lucide-react';
import ChatMessage from './chat-message';
import ChatSuggestions from './chat-suggestions';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    id: `saathi-${Date.now()}`,
    role: 'assistant',
    content: "Hi there! I'm Saathi, your exam wellness companion. How are you feeling today?",
  },
];

const suggestions = [
  "I'm feeling anxious about my upcoming mock test.",
  "I feel useless, everyone else seems so far ahead.",
  "I'm finding it hard to focus on studying.",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    if (isLoading || !messageContent.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const result = await getAiResponse(messageContent);
    
    if (result.success) {
      const assistantMessage: Message = {
        id: `saathi-${Date.now() + 1}`,
        role: 'assistant',
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: result.response,
        });
        setMessages(prev => prev.slice(0, -1)); // Remove user message if AI fails
    }

    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage(suggestion);
    setInput('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{ id: 'loading', role: 'assistant', content: 'Saathi is typing...' }}
              isLoading={true}
            />
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {messages.length <= 1 && (
            <ChatSuggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Talk about what's on your mind..."
              className="flex-1"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <SendHorizonal />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
