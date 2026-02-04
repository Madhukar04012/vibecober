import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Sparkles } from "lucide-react";

import { generateProject } from "../lib/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Textarea } from "../components/ui/textarea";

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="overflow-auto rounded-xl border border-border/70 bg-background/40 p-4 text-xs text-muted-foreground">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export function GeneratorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialIdea = useMemo(() => searchParams.get("idea") ?? "", [searchParams]);

  const [idea, setIdea] = useState(initialIdea);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    setIdea(initialIdea);
  }, [initialIdea]);

  async function onGenerate() {
    const trimmed = idea.trim();
    if (!trimmed) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const res = await generateProject(trimmed);
      setResult(res.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate project");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Idea</span>
            <span className="text-xs text-muted-foreground">Developer-first, local AI</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div
              className="pointer-events-none absolute left-5 top-4 h-4 w-[2px] rounded bg-accent/70 opacity-70"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-5 top-4 h-4 w-[2px] rounded bg-accent/70 animate-caret-blink"
              aria-hidden
            />
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe what you want to build…"
              className="min-h-[220px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={onGenerate} disabled={isGenerating || !idea.trim()} className="gap-2">
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating…" : "Generate"}
            </Button>
            <Button
              variant="outline"
              disabled={isGenerating || !result}
              className="gap-2"
              onClick={() => {
                if (!result) return;
                navigate("/preview", { state: { idea: idea.trim(), result } });
              }}
            >
              Preview
            </Button>
            <Button
              variant="outline"
              disabled={isGenerating || !result}
              className="gap-2"
              onClick={() => {
                if (!result) return;
                navigate("/build", { state: { idea: idea.trim(), result } });
              }}
            >
              Build
            </Button>
          </div>

          {error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Output
            {result ? <CheckCircle2 className="h-4 w-4 text-accent" /> : null}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isGenerating ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : result ? (
            <div className="space-y-4">
              <div>
                <div className="mb-2 text-sm font-semibold tracking-wide">Architecture</div>
                <JsonBlock value={result.architecture} />
              </div>
              <div>
                <div className="mb-2 text-sm font-semibold tracking-wide">Project structure</div>
                <JsonBlock value={result.project_structure} />
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Generate a project to see the plan, modules, and structure here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
