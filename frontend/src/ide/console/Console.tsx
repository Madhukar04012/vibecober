'use client';

import { useEffect, useRef } from 'react';
import { useIDE } from '@/src/ide/store';

export function Console() {
    const { console: logs } = useIDE();
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [logs]);

    return (
        <pre
            ref={ref}
            className="h-full overflow-auto bg-slate-950 p-3 font-mono text-xs text-slate-300"
        >
            {logs.length === 0 ? (
                <div className="text-slate-500">Ready. Click Run to execute.</div>
            ) : (
                logs.map((l, i) => (
                    <div key={i}>{l}</div>
                ))
            )}
        </pre>
    );
}
