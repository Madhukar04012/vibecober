'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { AgentBadge } from '@/components/ide/AgentBadge';
import { StatusPill } from '@/components/ide/StatusPill';
import { IssueCard } from '@/components/ide/IssueCard';
import type { ChatMessageModel } from '@/components/ide/types';

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join('') || 'AI';
}

export function ChatMessage({ message }: { message: ChatMessageModel }) {
  const isUser = message.kind === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn('w-full max-w-[320px]', isUser ? 'pl-8' : 'pr-8')}>
        {message.kind === 'issue' && message.issue ? (
          <IssueCard
            title={message.issue.title}
            description={message.issue.description}
            primaryActionLabel={message.issue.primaryActionLabel}
            secondaryActionLabel={message.issue.secondaryActionLabel}
          />
        ) : (
          <Card className={cn('px-3 py-3', isUser ? 'bg-violet-500/10 border-violet-400/20' : '')}>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-xl border',
                  isUser ? 'border-violet-400/20 bg-violet-500/10' : 'border-white/10 bg-white/5'
                )}
                aria-hidden="true"
              >
                <span className="text-xs font-semibold text-slate-100">{initials(message.author.name)}</span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-100">{message.author.name}</p>
                    <AgentBadge role={message.author.role} />
                    {message.kind === 'status' && message.stepLabel ? <StatusPill label={message.stepLabel} variant="info" /> : null}
                  </div>
                  <time className="shrink-0 text-[11px] text-slate-400">{message.timestamp}</time>
                </div>

                {message.kind === 'thinking' ? (
                  <div className="mt-2 space-y-2" aria-label="AI is thinking">
                    <div className="relative h-3 overflow-hidden rounded-md bg-white/5">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_infinite]" />
                    </div>
                    <div className="relative h-3 w-4/5 overflow-hidden rounded-md bg-white/5">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_infinite]" />
                    </div>
                    <p className="text-xs text-slate-400">{message.content}</p>
                  </div>
                ) : (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                    {message.content}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
