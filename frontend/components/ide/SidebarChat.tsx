'use client';

import { useMemo } from 'react';
import { Crown, Send } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ChatMessageModel } from '@/components/ide/types';
import { ChatMessage } from '@/components/ide/ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function SidebarChat({ messages, className }: { messages: ChatMessageModel[]; className?: string }) {
  const headerSubtitle = useMemo(() => 'Multi-agent workspace', []);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex h-12 items-center justify-between px-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-100">NOVA AI Assistant</p>
          <p className="truncate text-xs text-slate-400">{headerSubtitle}</p>
        </div>
        <Button variant="secondary" size="sm" aria-label="Upgrade" className="h-8">
          <Crown className="h-4 w-4 text-violet-200" aria-hidden="true" />
          Upgrade
        </Button>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-3">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </div>
      </div>

      <Separator />

      <div className="p-3">
        <div className="flex items-center gap-2">
          <Input
            aria-label="Message input"
            placeholder="Click Resolve, we will try hard to fix issues."
            disabled
            className="h-9"
          />
          <Button variant="secondary" size="icon" aria-label="Send message" disabled>
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-slate-500">Chat input is mocked for this UI.</p>
      </div>
    </div>
  );
}
