'use client';

import type { LucideIcon } from 'lucide-react';
import { LayoutGrid, MonitorPlay, TerminalSquare } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { IDETabKey } from '@/components/ide/types';

const tabs: Array<{ key: IDETabKey; label: string; icon: LucideIcon }> = [
  { key: 'design', label: 'Design', icon: LayoutGrid },
  { key: 'app', label: 'App Viewer', icon: MonitorPlay },
  { key: 'console', label: 'Console', icon: TerminalSquare },
];

export function TabSwitcher({ value, onChange }: { value: IDETabKey; onChange: (v: IDETabKey) => void }) {
  return (
    <div aria-label="IDE tabs" className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = value === t.key;
        return (
          <button
            key={t.key}
            aria-label={`Open ${t.label}`}
            onClick={() => onChange(t.key)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
              'outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
              isActive
                ? 'bg-violet-500/10 text-slate-100 ring-1 ring-inset ring-violet-400/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
            )}
          >
            <Icon className={cn('h-4 w-4', isActive ? 'text-violet-200' : 'text-slate-300')} aria-hidden={true} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
