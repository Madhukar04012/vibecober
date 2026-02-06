'use client';

import { Send } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ChatMessageModel } from '@/components/ide/types';
import { CommandLog } from '@/components/ide/CommandLog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SystemLog({ messages, className }: { messages: ChatMessageModel[]; className?: string }) {
    const lastMessageId = messages.length ? messages[messages.length - 1]?.id : undefined;

    return (
        <div className={cn('flex h-full flex-col', className)}>
            {/* Minimal header - no upgrade button, just context */}
            <div className="border-b border-white/10 px-3 py-2">
                <p className="text-[11px] font-medium text-slate-400">SYSTEM LOG</p>
            </div>

            {/* History - flat log style, aggressive fading */}
            <div className="flex-1 overflow-auto px-3">
                <div className="space-y-0">
                    {messages.map((m) => {
                        const isLatest = lastMessageId ? m.id === lastMessageId : false;
                        return (
                            <div key={m.id} className={cn(!isLatest && 'opacity-40')}>
                                <CommandLog message={m} isLatest={isLatest} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Input anchor - visually dominant */}
            <div className="border-t border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center gap-2">
                    <Input
                        aria-label="Command input"
                        placeholder="Enter command…"
                        disabled
                        className="h-11 border-0 bg-white/5 text-sm placeholder:text-slate-500 focus-visible:bg-white/10 focus-visible:ring-1 focus-visible:ring-violet-500/50"
                    />
                    <Button
                        variant="secondary"
                        size="icon"
                        aria-label="Execute"
                        disabled
                        className="h-11 w-11 bg-violet-500/10 hover:bg-violet-500/20"
                    >
                        <Send className="h-4 w-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
