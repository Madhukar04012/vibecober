'use client';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface EditorTab {
  id: string;
  label: string;
}

export function EditorTabs({
  tabs,
  activeId,
  onChange,
}: {
  tabs: EditorTab[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex h-10 items-center gap-1 border-b border-white/10 bg-white/5 px-2">
      {tabs.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-label={`Open file ${t.label}`}
            className={cn(
              'group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
              active
                ? 'bg-violet-500/10 text-slate-100 ring-1 ring-inset ring-violet-400/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
            )}
          >
            <span className="max-w-[160px] truncate">{t.label}</span>
            <span className={cn('opacity-0 transition-opacity group-hover:opacity-100', active ? 'opacity-60' : '')}>
              <X className="h-3.5 w-3.5" aria-hidden={true} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
