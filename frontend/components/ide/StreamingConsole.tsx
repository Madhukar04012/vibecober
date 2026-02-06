'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

export function StreamingConsole() {
    const consoleMessages = useIDEStore((state) => state.consoleMessages);
    const isStreaming = useIDEStore((state) => state.isConsoleStreaming);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [consoleMessages]);

    return (
        <div className="flex h-full flex-col">
            {/* Minimal header */}
            <div className="border-b border-white/10 px-3 py-2">
                <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-slate-400">CONSOLE</p>
                    {isStreaming && (
                        <div className="flex items-center gap-1.5">
                            <div className="h-1 w-1 animate-pulse rounded-full bg-violet-400" />
                            <span className="text-[10px] text-slate-500">streaming</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Console output - terminal-like, auto-scrolling */}
            <div ref={scrollRef} className="flex-1 overflow-auto p-3 font-mono text-xs">
                {consoleMessages.length === 0 ? (
                    <p className="text-slate-500">Ready. Click Run to execute.</p>
                ) : (
                    <div className="space-y-0.5">
                        {consoleMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    'whitespace-pre-wrap',
                                    msg.type === 'command' && 'text-violet-300',
                                    msg.type === 'success' && 'text-emerald-400',
                                    msg.type === 'error' && 'text-red-400',
                                    msg.type === 'info' && 'text-slate-300'
                                )}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
