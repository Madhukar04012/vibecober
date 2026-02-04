import * as React from "react";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";

import { cn } from "@/lib/utils";

export type FolderTreeNode = {
  id: string;
  name: string;
  kind: "folder" | "file";
  children?: FolderTreeNode[];
};

function sortNodes(nodes: FolderTreeNode[]) {
  return [...nodes].sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function indentClass(depth: number) {
  switch (depth) {
    case 0:
      return "pl-0";
    case 1:
      return "pl-4";
    case 2:
      return "pl-8";
    case 3:
      return "pl-12";
    case 4:
      return "pl-16";
    case 5:
      return "pl-20";
    default:
      return "pl-24";
  }
}

export function FolderTree({
  nodes,
  className,
  defaultExpandedIds,
}: {
  nodes: FolderTreeNode[];
  className?: string;
  defaultExpandedIds?: string[];
}) {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(defaultExpandedIds ?? []),
  );

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function Row({ node, depth }: { node: FolderTreeNode; depth: number }) {
    const isFolder = node.kind === "folder";
    const isOpen = isFolder && expanded.has(node.id);
    const hasChildren = (node.children?.length ?? 0) > 0;

    return (
      <div>
        <button
          type="button"
          className={cn(
            "group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left",
            "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          onClick={() => {
            if (isFolder && hasChildren) toggle(node.id);
          }}
        >
          <span className={cn("flex items-center", indentClass(depth))}>
            {isFolder ? (
              hasChildren ? (
                isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )
              ) : (
                <span className="inline-block h-4 w-4" />
              )
            ) : (
              <span className="inline-block h-4 w-4" />
            )}
          </span>

          {isFolder ? (
            <Folder className="h-4 w-4 text-accent/80" />
          ) : (
            <File className="h-4 w-4 text-muted-foreground" />
          )}

          <span className="text-sm text-foreground/90 group-hover:text-foreground">
            {node.name}
          </span>
        </button>

        {isFolder && isOpen && hasChildren ? (
          <div className="mt-1 space-y-0.5">
            {sortNodes(node.children ?? []).map((child) => (
              <Row key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border/70 bg-background/30 p-2", className)}>
      <div className="space-y-0.5">
        {sortNodes(nodes).map((node) => (
          <Row key={node.id} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
}
