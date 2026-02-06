'use client';

import { ExternalLink, Wrench } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResolveButton } from '@/components/ide/ResolveButton';

export function IssueCard({
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: {
  title: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  className?: string;
}) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5">
            <Wrench className="h-4 w-4 text-slate-200" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold">{title}</p>
        </div>
        <span className="text-[11px] text-slate-400">Issue Report</span>
      </div>

      <div className="px-3 py-3">
        {description ? <p className="text-xs leading-relaxed text-slate-300">{description}</p> : null}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {primaryActionLabel ? (
            <Button variant="secondary" size="sm" aria-label={primaryActionLabel} className="h-8 px-3">
              {primaryActionLabel}
            </Button>
          ) : null}

          {secondaryActionLabel ? (
            <Button
              variant="ghost"
              size="sm"
              aria-label={secondaryActionLabel}
              className="h-8 px-2 text-slate-200"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {secondaryActionLabel}
            </Button>
          ) : null}

          <div className="ml-auto">
            <ResolveButton label="Resolve" ariaLabel="Resolve issue" />
          </div>
        </div>
      </div>
    </Card>
  );
}
