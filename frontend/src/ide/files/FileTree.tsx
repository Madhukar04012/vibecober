'use client';

import { File, Folder, AlertCircle } from 'lucide-react';
import { useIDE } from '@/src/ide/store';
import { cn } from '@/lib/utils';
import { vibeCoberFileSystem, type FileNode } from '@/src/ide/files/fileSystem';

export function FileTree() {
    const { errorFile, locked, activeFile, setActiveFile } = useIDE();

    const handleFileClick = (path: string) => {
        if (locked) return;
        setActiveFile(path);
    };

    const renderFile = (file: FileNode, depth = 0) => {
        const hasError = errorFile === file.path;
        const isActive = activeFile === file.path;

        return (
            <div key={file.path}>
                <button
                    disabled={locked}
                    onClick={() => file.type === 'file' && handleFileClick(file.path)}
                    className={cn(
                        'flex w-full items-center gap-2 px-2 py-1 text-left text-xs transition-colors',
                        !locked && 'hover:bg-white/5',
                        isActive && 'bg-violet-500/10 text-violet-300',
                        hasError && 'bg-red-500/10 text-red-400',
                        locked && 'cursor-not-allowed opacity-50'
                    )}
                    style={{ paddingLeft: `${depth * 12 + 8}px` }}
                >
                    {file.type === 'folder' ? (
                        <Folder className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                        <File className="h-3.5 w-3.5 text-slate-400" />
                    )}
                    <span className="flex-1 truncate">{file.name}</span>
                    {hasError && <AlertCircle className="h-3 w-3 text-red-400" />}
                </button>
                {file.children && file.children.map((c) => renderFile(c, depth + 1))}
            </div>
        );
    };

    return <div className="space-y-0.5">{vibeCoberFileSystem.map((f) => renderFile(f))}</div>;
}
