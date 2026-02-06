'use client';

import { cn } from '@/lib/utils';
import type { AgentRole } from '@/components/ide/types';

const roleStyles: Record<AgentRole, string> = {
  User: 'border-white/5 bg-white/5 text-slate-300',
  'Team Leader': 'border-violet-400/10 bg-violet-500/5 text-violet-200/90',
  Planner: 'border-sky-400/10 bg-sky-500/5 text-sky-200/90',
  Engineer: 'border-emerald-400/10 bg-emerald-500/5 text-emerald-200/90',
};

export function AgentBadge({ role, className }: { role: AgentRole; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium', roleStyles[role], className)}>
      {role}
    </span>
  );
}
