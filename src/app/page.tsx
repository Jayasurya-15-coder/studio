import Header from '@/components/shared/header';
import ChatInterface from '@/components/chat/chat-interface';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      <div className="flex-1 flex flex-col min-h-0">
        <ChatInterface />
      </div>
      <footer className="p-2 flex justify-center items-center shrink-0">
         <Badge variant="secondary" className="text-xs">
           <Lock className="w-3 h-3 mr-2" />
           This chat is private and anonymous. Your data is not saved.
         </Badge>
      </footer>
    </div>
  );
}
