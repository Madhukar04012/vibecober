'use client';

import { cn } from '@/lib/utils';
import type { AgentRole } from '@/components/ide/types';

const roleStyles: Record<AgentRole, string> = {
  User: 'border-white/10 bg-white/5 text-slate-200',
  'Team Leader': 'border-violet-400/20 bg-violet-500/10 text-violet-200',
  Planner: 'border-sky-400/20 bg-sky-500/10 text-sky-200',
  Engineer: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200',
};

export function AgentBadge({ role, className }: { role: AgentRole; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium',
        roleStyles[role],
        className
      )}
    >
      {role}
    </span>
  );
}
