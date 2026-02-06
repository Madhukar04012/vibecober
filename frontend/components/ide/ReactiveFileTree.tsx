'use client';

import { File, Folder, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIDEStore } from '@/store/ideStore';

interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

interface ReactiveFileTreeProps {
    files: FileNode[];
    className?: string;
}

export function ReactiveFileTree({ files, className }: ReactiveFileTreeProps) {
    const isLocked = useIDEStore((state) => state.isFileTreeLocked);
    const errorFile = useIDEStore((state) => state.errorFile);
    const currentFile = useIDEStore((state) => state.currentFile);
    const setCurrentFile = useIDEStore((state) => state.setCurrentFile);

    const handleFileClick = (path: string) => {
        if (isLocked) return;
        setCurrentFile(path);
    };

    const renderNode = (node: FileNode, depth = 0) => {
        const hasError = errorFile === node.path;
        const isActive = currentFile === node.path;

        return (
            <div key={node.path}>
                <button
                    onClick={() => node.type === 'file' && handleFileClick(node.path)}
                    disabled={isLocked}
                    className={cn(
                        'flex w-full items-center gap-2 px-2 py-1 text-left text-sm transition-colors',
                        !isLocked && 'hover:bg-white/5',
                        isActive && 'bg-violet-500/10 text-violet-300',
                        hasError && 'bg-red-500/10 text-red-400',
                        isLocked && 'cursor-not-allowed opacity-50'
                    )}
                    style={{ paddingLeft: `${depth * 12 + 8}px` }}
                >
                    {node.type === 'folder' ? (
                        <Folder className="h-4 w-4 text-slate-400" />
                    ) : (
                        <File className="h-4 w-4 text-slate-400" />
                    )}
                    <span className={cn('flex-1 truncate', hasError && 'font-medium')}>{node.name}</span>
                    {hasError && <AlertCircle className="h-3 w-3 text-red-400" />}
                </button>
                {node.children && (
                    <div>
                        {node.children.map((child) => renderNode(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={cn('space-y-0.5', className)}>
            {files.map((node) => renderNode(node))}
        </div>
    );
}
