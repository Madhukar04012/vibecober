'use client';

import Editor from '@monaco-editor/react';
import { useIDE } from '@/src/ide/store';
import { cn } from '@/lib/utils';

export function MonacoEditor() {
    const { locked, mode, activeFile } = useIDE();

    return (
        <div className={cn('h-full', mode === 'error' && 'ring-1 ring-inset ring-red-500/30')}>
            <Editor
                height="100%"
                defaultLanguage="typescript"
                defaultValue={`// ${activeFile}\n\nexport function hello() {\n  console.log("Hello from VibeCober IDE");\n}\n`}
                theme="vs-dark"
                options={{
                    readOnly: locked,
                    cursorStyle: locked ? 'block' : 'line',
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                }}
                className={cn(mode === 'running' && 'opacity-80')}
            />
        </div>
    );
}
