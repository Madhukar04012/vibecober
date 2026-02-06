'use client';

import { RunButton } from '@/components/ide/RunButton';
import { ReactiveEditor } from '@/components/ide/ReactiveEditor';
import { ReactiveFileTree } from '@/components/ide/ReactiveFileTree';
import { StreamingConsole } from '@/components/ide/StreamingConsole';
import { useIDEStore } from '@/store/ideStore';

// Mock file structure
const mockFiles = [
    {
        name: 'src',
        path: 'src',
        type: 'folder' as const,
        children: [
            { name: 'App.tsx', path: 'src/App.tsx', type: 'file' as const },
            { name: 'index.tsx', path: 'src/index.tsx', type: 'file' as const },
        ],
    },
    {
        name: 'tests',
        path: 'tests',
        type: 'folder' as const,
        children: [
            { name: 'setup.ts', path: 'tests/setup.ts', type: 'file' as const },
            { name: 'auth.test.tsx', path: 'tests/auth.test.tsx', type: 'file' as const },
        ],
    },
    { name: 'package.json', path: 'package.json', type: 'file' as const },
];

export default function IDEDemoPage() {
    const currentFile = useIDEStore((state) => state.currentFile);
    const runState = useIDEStore((state) => state.runState);

    return (
        <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
            {/* Top bar */}
            <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-sm font-semibold">VibeCober IDE</h1>
                    <div className="h-4 w-px bg-white/10" />
                    <span className="text-xs text-slate-400">
                        {runState === 'idle' ? 'Ready' : runState === 'compiling' ? 'Compiling...' : runState === 'testing' ? 'Testing...' : runState === 'success' ? 'Build succeeded' : 'Build failed'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <RunButton />
                </div>
            </div>

            {/* Main layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* File tree sidebar */}
                <div className="w-64 border-r border-white/10 overflow-auto">
                    <div className="border-b border-white/10 px-3 py-2">
                        <p className="text-[11px] font-medium text-slate-400">FILES</p>
                    </div>
                    <div className="p-2">
                        <ReactiveFileTree files={mockFiles} />
                    </div>
                </div>

                {/* Editor + Console */}
                <div className="flex flex-1 flex-col">
                    {/* Editor area */}
                    <div className="flex-1 border-b border-white/10">
                        <div className="border-b border-white/10 bg-slate-900 px-3 py-2">
                            <p className="text-xs text-slate-400">
                                {currentFile || 'No file selected'}
                            </p>
                        </div>
                        <ReactiveEditor>
                            <div className="flex h-full items-center justify-center p-8">
                                {currentFile ? (
                                    <div className="space-y-2 text-center">
                                        <p className="text-sm text-slate-400">Editor content for:</p>
                                        <p className="font-mono text-sm text-violet-300">{currentFile}</p>
                                        <p className="text-xs text-slate-500">
                                            (Real editor would display file contents here)
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">Select a file to edit</p>
                                )}
                            </div>
                        </ReactiveEditor>
                    </div>

                    {/* Console area */}
                    <div className="h-64">
                        <StreamingConsole />
                    </div>
                </div>
            </div>
        </div>
    );
}
