'use client';

import { useCallback, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import type { FileNode } from '@/components/ide/types';

function NodeRow({
  node,
  level,
  isOpen,
  onToggle,
  active,
  onSelectFile,
  disabled,
}: {
  node: FileNode;
  level: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  active: boolean;
  onSelectFile?: (id: string) => void;
  disabled?: boolean;
}) {
  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  return (
    <button
      type="button"
      onClick={() => {
        if (disabled) return;
        if (hasChildren) onToggle(node.id);
        else if (node.type === 'file') onSelectFile?.(node.id);
      }}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30',
        disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/5',
        active ? 'bg-violet-500/5 ring-1 ring-inset ring-white/5' : null
      )}
      style={{ paddingLeft: 8 + level * 14 }}
      aria-label={node.type === 'folder' ? `Folder ${node.name}` : `File ${node.name}`}
    >
      {node.type === 'folder' ? (
        hasChildren ? (
          isOpen ? (
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
          )
        ) : (
          <span className="h-4 w-4" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}

      {node.type === 'folder' ? (
        <Folder className="h-4 w-4 text-violet-200" aria-hidden="true" />
      ) : (
        <FileText className="h-4 w-4 text-slate-300" aria-hidden="true" />
      )}

      <span className="truncate text-slate-300">{node.name}</span>
    </button>
  );
}

function flatten(nodes: FileNode[], open: Set<string>, level = 0): Array<{ node: FileNode; level: number }> {
  const out: Array<{ node: FileNode; level: number }> = [];
  for (const n of nodes) {
    out.push({ node: n, level });
    if (n.type === 'folder' && n.children?.length && open.has(n.id)) {
      out.push(...flatten(n.children, open, level + 1));
    }
  }
  return out;
}

export function FileTree({
  nodes,
  activeId,
  onSelectFile,
  disabled,
}: {
  nodes: FileNode[];
  activeId?: string;
  onSelectFile?: (id: string) => void;
  disabled?: boolean;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(nodes.filter((n) => n.type === 'folder').map((n) => n.id)));

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const rows = useMemo(() => flatten(nodes, openIds), [nodes, openIds]);

  return (
    <Card>
      <div className="flex h-10 items-center justify-between border-b border-white/5 px-3">
        <p className="text-sm font-semibold">Files</p>
        <span className="text-[11px] text-slate-400">mock · local workspace</span>
      </div>
      <div className="p-2">
        {rows.map(({ node, level }) => (
          <NodeRow
            key={node.id}
            node={node}
            level={level}
            isOpen={openIds.has(node.id)}
            onToggle={toggle}
            active={node.type === 'file' && activeId ? node.id === activeId : false}
            onSelectFile={onSelectFile}
            disabled={disabled}
          />
        ))}
      </div>
    </Card>
  );
}
