'use client';

import { cn } from '@/lib/utils';
import type { ChatMessageModel } from '@/components/ide/types';

interface ChatMessageProps {
  message: ChatMessageModel;
  isLatest?: boolean;
}

export function ChatMessage({ message, isLatest = false }: ChatMessageProps) {
  const isUser = message.kind === 'user';

  // Minimal state indicator - simplified narration
  const stateIndicator =
    message.state === 'processing'
      ? '⋯'
      : message.state === 'resolved'
        ? '✓'
        : message.state === 'error' || message.state === 'aborted'
          ? '✗'
          : null;

  // Simple role indicator - just a letter
  const roleIndicator = isUser ? 'U' : 'S';

  return (
    <div className="border-b border-white/5 py-2">
      <div className="flex items-start gap-2">
        {/* Minimal role indicator - only show for latest message */}
        {isLatest && (
          <div
            className={cn(
              'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px] font-medium',
              isUser ? 'bg-violet-500/20 text-violet-300' : 'bg-white/10 text-slate-400'
            )}
            aria-hidden={true}
          >
            {roleIndicator}
          </div>
        )}

        {/* Plain text content - no cards, no elevation */}
        <div className="min-w-0 flex-1">
          {/* Show author info only for latest message */}
          {isLatest && (
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium text-slate-300">{message.author.name}</span>
              {stateIndicator && (
                <span className="text-xs text-slate-400">{stateIndicator}</span>
              )}
              <span className="text-[10px] text-slate-500">{message.timestamp}</span>
            </div>
          )}

          {/* Message content */}
          {message.kind === 'thinking' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Running…</span>
              <div className="h-1 w-16 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-1/2 animate-pulse bg-violet-500/30" />
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm text-slate-200">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
