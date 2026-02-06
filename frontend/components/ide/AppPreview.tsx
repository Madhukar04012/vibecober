'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function AppPreview({
  mode,
  previewLabel,
}: {
  mode: 'design' | 'app';
  previewLabel?: string;
}) {
  return (
    <div className="h-full overflow-auto p-4">
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg border border-white/10 bg-white/5" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-100">NOVA AI</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            {previewLabel ? <span className="text-xs text-slate-400">{previewLabel}</span> : null}
            <span className="rounded-lg px-2 py-1 hover:bg-white/5">Features</span>
            <span className="rounded-lg px-2 py-1 hover:bg-white/5">About</span>
            <span className="rounded-lg px-2 py-1 hover:bg-white/5">Contact</span>
            <Button size="sm" className="h-8">Launch App</Button>
          </div>
        </div>

        <div className="p-4">
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border border-white/10',
              'bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950'
            )}
          >
            <div className="absolute inset-0 opacity-70">
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute left-1/3 bottom-[-120px] h-80 w-80 rounded-full bg-fuchsia-500/5 blur-3xl" />
            </div>

            <div className="relative grid gap-6 p-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  <Sparkles className="h-4 w-4 text-violet-200" aria-hidden="true" />
                  Your Premium AI
                </div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-100">
                  Build, preview, and ship with an AI-powered IDE
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  A calm, developer-first workspace inspired by Cursor and Replit — chat with agents, iterate on UI, and keep the console close.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="group">
                    Start a run
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Button>
                  <Button variant="secondary">View docs</Button>
                </div>

                {mode === 'design' ? (
                  <div className="pt-2">
                    <p className="text-xs font-medium text-slate-300">Design sections</p>
                    <div className="mt-2 grid gap-2">
                      {['Hero', 'Features', 'Testimonials', 'Footer'].map((s) => (
                        <div
                          key={s}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                        >
                          <span>{s}</span>
                          <span className="text-xs text-slate-400">Editable</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-blue-500/15" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                    <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
                    <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {['Auth', 'Deploy', 'Agents'].map((t) => (
                    <div key={t} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                      <p className="text-slate-200">{t}</p>
                      <p className="mt-1 text-[11px] text-slate-400">Ready</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
