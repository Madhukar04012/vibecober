import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Boxes, FileText, Layers3 } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { FolderTree, type FolderTreeNode } from "../components/ui/folder-tree";

type PreviewState = {
  idea?: string;
  result?: any;
};

function pickStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string") as string[];
  return [];
}

export function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as PreviewState;

  const idea = state.idea ?? "";
  const result = state.result ?? null;

  const techStack = useMemo(() => {
    const raw = result?.architecture?.tech_stack ?? result?.architecture?.stack;
    const picked = pickStringArray(raw);
    return picked.length
      ? picked
      : ["FastAPI", "React", "Vite", "Tailwind", "SQLite"];
  }, [result]);

  const modules = useMemo(() => {
    const raw = result?.architecture?.modules ?? result?.architecture?.components;
    const picked = pickStringArray(raw);
    return picked.length
      ? picked
      : ["API", "Auth", "Database", "UI", "Jobs", "Observability"];
  }, [result]);

  const treeNodes: FolderTreeNode[] = useMemo(() => {
    // UI-only tree. If/when backend returns a normalized file tree, map it here.
    return [
      {
        id: "root",
        name: "vibecober-project",
        kind: "folder",
        children: [
          {
            id: "backend",
            name: "backend",
            kind: "folder",
            children: [
              { id: "backend-main", name: "main.py", kind: "file" },
              { id: "backend-api", name: "api", kind: "folder", children: [] },
              { id: "backend-req", name: "requirements.txt", kind: "file" },
            ],
          },
          {
            id: "frontend",
            name: "frontend",
            kind: "folder",
            children: [
              { id: "frontend-src", name: "src", kind: "folder", children: [] },
              { id: "frontend-pkg", name: "package.json", kind: "file" },
              { id: "frontend-vite", name: "vite.config.ts", kind: "file" },
            ],
          },
          { id: "readme", name: "README.md", kind: "file" },
        ],
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Preview</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Project summary</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review the structure and modules before building.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2" disabled>
            <FileText className="h-4 w-4" />
            Preview
          </Button>
          <Button
            className="gap-2"
            onClick={() => navigate("/build", { state: { idea, result } })}
          >
            Build Project
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-accent" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-background/40 p-4">
              <div className="text-xs text-muted-foreground">Idea</div>
              <div className="mt-1 text-sm text-foreground">
                {idea || "No idea provided yet — go back to Generate to create a draft."}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Boxes className="h-4 w-4 text-accent" />
                Tech stack
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="text-sm font-semibold">Detected modules</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {modules.map((m) => (
                  <Badge key={m} className="bg-muted/20">
                    {m}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                UI-only preview. When the backend returns richer metadata, this will reflect
                the actual generated modules.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Folder tree</CardTitle>
          </CardHeader>
          <CardContent>
            <FolderTree nodes={treeNodes} defaultExpandedIds={["root", "backend", "frontend"]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
