'use client';

import { useIDEStore } from '@/store/ideStore';
import { cn } from '@/lib/utils';

interface ReactiveEditorProps {
    children: React.ReactNode;
    className?: string;
}

export function ReactiveEditor({ children, className }: ReactiveEditorProps) {
    const editorState = useIDEStore((state) => state.editorState);
    const errorFile = useIDEStore((state) => state.errorFile);
    const currentFile = useIDEStore((state) => state.currentFile);

    // Visual states based on execution
    const isLocked = editorState === 'running';
    const hasError = editorState === 'error' && errorFile === currentFile;

    return (
        <div
            className={cn(
                'relative h-full transition-opacity duration-200',
                className,
                isLocked && 'pointer-events-none opacity-60',
                hasError && 'ring-1 ring-inset ring-red-500/20'
            )}
        >
            {/* Editor lock overlay */}
            {isLocked && (
                <div className="absolute inset-0 z-10 cursor-not-allowed bg-black/10" aria-hidden="true">
                    <div className="flex h-full items-center justify-center">
                        <div className="rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-slate-400">
                            Read-only during execution
                        </div>
                    </div>
                </div>
            )}

            {/* Error gutter indicator */}
            {hasError && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/40" aria-hidden="true" />
            )}

            {children}
        </div>
    );
}
