'use client';

import { useMemo } from 'react';
import { ChevronDown, Crown, Play, RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/ide/StatusPill';

export type EditorMode = 'editor' | 'app';

export function TopToolbar({
  appName = 'NOVA AI Assistant',
  workspaceName = 'Design',
  mode,
  onModeChange,
  onRun,
  runDisabled,
  onUpdate,
  cloudStatusLabel,
}: {
  appName?: string;
  workspaceName?: string;
  mode: EditorMode;
  onModeChange: (m: EditorMode) => void;
  onRun?: () => void;
  runDisabled?: boolean;
  onUpdate?: () => void;
  cloudStatusLabel?: string;
}) {
  const modes = useMemo(
    () =>
      [
        { key: 'editor' as const, label: 'Editor' },
        { key: 'app' as const, label: 'App Viewer' },
      ] as const,
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto grid h-12 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="h-7 w-7 shrink-0 rounded-lg border border-white/10 bg-white/5" aria-hidden="true" />
          <span className="truncate text-sm font-semibold text-slate-100">{appName}</span>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Select workspace"
              className="h-8 border-white/10"
            >
              <span className="max-w-[140px] truncate">{workspaceName}</span>
              <ChevronDown className="h-4 w-4 text-slate-300" aria-hidden={true} />
            </Button>
            {cloudStatusLabel ? <StatusPill label={cloudStatusLabel} variant="info" /> : null}
          </div>
        </div>

        <div
          className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1"
          aria-label="View selector"
        >
          {modes.map((m) => {
            const active = mode === m.key;
            return (
              <button
                key={m.key}
                type="button"
                aria-label={`Switch to ${m.label}`}
                onClick={() => onModeChange(m.key)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
                  active
                    ? 'bg-violet-500/10 text-slate-100 ring-1 ring-inset ring-violet-400/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                )}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            aria-label="Run"
            className="h-8 border-white/10"
            onClick={onRun}
            disabled={runDisabled}
          >
            <Play className="h-4 w-4 text-slate-200" aria-hidden={true} />
            Run
          </Button>

          <Button variant="secondary" size="sm" aria-label="Upgrade" className="h-8 border-white/10">
            <Crown className="h-4 w-4 text-violet-200" aria-hidden={true} />
            Upgrade
          </Button>

          <Button aria-label="Update" className="h-8" onClick={onUpdate}>
            <RefreshCw className="h-4 w-4" aria-hidden={true} />
            Update
          </Button>
        </div>
      </div>
    </header>
  );
}
