'use client';

import { Button } from '@/components/ui/button';

type ChatSuggestionsProps = {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
};

export default function ChatSuggestions({ suggestions, onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in-0 duration-500">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-muted-foreground hover:bg-muted"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
