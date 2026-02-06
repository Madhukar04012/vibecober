'use client';

import { useIDE } from '@/src/ide/store';

export function StatusBar() {
    const { mode } = useIDE();

    return (
        <div className="flex items-center gap-4 border-t border-white/10 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Local</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                <span>Cloud Disabled</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                <span>GitHub Disconnected</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
                <div
                    className={`h-1.5 w-1.5 rounded-full ${mode === 'running' ? 'bg-blue-400' : mode === 'error' ? 'bg-red-400' : 'bg-slate-600'
                        }`}
                />
                <span>{mode === 'running' ? 'Running' : mode === 'error' ? 'Error' : 'Idle'}</span>
            </div>
        </div>
    );
}
