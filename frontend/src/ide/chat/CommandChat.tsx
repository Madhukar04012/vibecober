'use client';

import { useIDE } from '@/src/ide/store';

const mockLogs = [
    '> enable atoms cloud',
    'Running…',
    'Blocked: optional integration not connected',
    '✓ Continuing locally',
];

export function CommandChat() {
    return (
        <pre className="h-full overflow-auto bg-slate-950 p-3 font-mono text-xs text-slate-400 opacity-80">
            {mockLogs.map((l, i) => (
                <div key={i}>{l}</div>
            ))}
        </pre>
    );
}
