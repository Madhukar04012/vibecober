'use client';

import { cn } from '@/lib/utils';
import type { IntegrationStatus } from '@/components/ide/types';

export function StatusBar({
  atomsStatus,
  githubStatus,
  runLabel,
  className,
}: {
  atomsStatus: IntegrationStatus;
  githubStatus: IntegrationStatus;
  runLabel?: string;
  className?: string;
}) {
  const cloudLabel =
    atomsStatus === 'connected'
      ? 'Connected'
      : atomsStatus === 'connecting'
        ? 'Connecting'
        : atomsStatus === 'error'
          ? 'Error'
          : atomsStatus === 'unavailable'
            ? 'Unavailable'
            : 'Disabled';

  const githubLabel =
    githubStatus === 'connected'
      ? 'Connected'
      : githubStatus === 'connecting'
        ? 'Connecting'
        : githubStatus === 'error'
          ? 'Error'
          : githubStatus === 'unavailable'
            ? 'Unavailable'
          : 'Disconnected';

  return (
    <div className={cn('flex h-9 items-center border-t border-white/10 bg-slate-950/30 px-3', className)}>
      <div className="truncate text-xs text-slate-300">
        <span className="text-slate-400">Mode:</span> Local <span className="text-slate-600">·</span>{' '}
        <span className="text-slate-400">Cloud:</span> {cloudLabel} <span className="text-slate-600">·</span>{' '}
        <span className="text-slate-400">GitHub:</span> {githubLabel}
        {runLabel ? (
          <>
            {' '}
            <span className="text-slate-600">·</span>{' '}
            <span className="text-slate-400">Run:</span> {runLabel}
          </>
        ) : null}
      </div>
    </div>
  );
}
