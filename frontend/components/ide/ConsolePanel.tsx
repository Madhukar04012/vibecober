'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import type { ConsoleLogLine } from '@/components/ide/types';

const levelStyle: Record<ConsoleLogLine['level'], string> = {
  info: 'text-slate-300',
  warn: 'text-amber-200',
  error: 'text-rose-200',
  success: 'text-emerald-200',
};

export function ConsolePanel({ lines }: { lines: ConsoleLogLine[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines.length]);

  return (
    <div ref={scrollerRef} className="h-full overflow-auto p-4">
      <Card className="h-full">
        <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
          <p className="text-sm font-semibold text-slate-100">Build Console</p>
          <p className="text-xs text-slate-400">Output · mocked</p>
        </div>

        <div className="p-4 font-mono text-xs">
          {lines.length ? (
            <div className="space-y-2">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-3">
                  <span className="w-[72px] shrink-0 text-slate-500">{l.timestamp}</span>
                  <span className={cn('min-w-0 whitespace-pre-wrap', levelStyle[l.level])}>{l.message}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500">
              <p>No output yet.</p>
              <p className="mt-1">Click Run to start a mocked build/test loop.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
