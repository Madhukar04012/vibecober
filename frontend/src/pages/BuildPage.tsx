import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight, Terminal } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

type BuildState = {
  idea?: string;
  result?: any;
};

type StepStatus = "done" | "active" | "queued";
type Step = { title: string; detail: string; status: StepStatus };

export function BuildPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as BuildState;

  const idea = state.idea ?? "";
  const steps: Step[] = useMemo(
    () => [
      {
        title: "Analyze idea",
        detail: "Derive architecture and constraints",
        status: "done",
      },
      {
        title: "Plan modules",
        detail: "Decide services, routes, and data model",
        status: "done",
      },
      {
        title: "Generate backend",
        detail: "API skeleton, config, dependencies",
        status: "done",
      },
      {
        title: "Generate frontend",
        detail: "Routes, UI shell, core pages",
        status: "done",
      },
      {
        title: "Wire project",
        detail: "Scripts, env, local run instructions",
        status: "done",
      },
      {
        title: "Finalize",
        detail: "Sanity checks + ready-to-run handoff",
        status: "active",
      },
    ],
    [],
  );

  const logs = useMemo(() => {
    const lines = [
      "[orchestrator] starting run",
      idea ? `[input] ${idea}` : "[input] (missing) — run Generate first",
      "[planner] selecting stack",
      "[planner] drafting architecture",
      "[coder] generating project structure",
      "[coder] writing files",
      "[build] validating output",
      "[done] project ready",
    ];
    return lines.join("\n");
  }, [idea]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Build</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Progress</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Transparent steps and logs (mocked UI for now).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-muted/20">Local run</Badge>
          <Badge className="bg-muted/20">No streaming</Badge>
          <Button variant="outline" onClick={() => navigate("/preview", { state })}>
            Back to preview
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Build steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-border/70 bg-background/40 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.detail}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.status === "done" ? (
                      <Badge className="bg-accent/15 text-accent border-accent/30">Done</Badge>
                    ) : s.status === "active" ? (
                      <Badge className="bg-primary/15 text-primary border-primary/30">
                        Finalizing
                      </Badge>
                    ) : (
                      <Badge className="bg-muted/20">Queued</Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4">
              <div className="text-sm font-semibold text-foreground">Project ready</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Next: write files to disk, then open in your editor or run locally.
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button disabled className="gap-2">
                  Open project folder
                </Button>
                <Button variant="outline" onClick={() => navigate("/generate")}
                  className="gap-2"
                >
                  Generate another
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent" />
              Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[520px] overflow-auto rounded-xl border border-border/70 bg-black/40 p-4 text-xs text-muted-foreground">
              {logs}
            </pre>
            <div className="mt-2 text-xs text-muted-foreground">
              These are mocked for UI polish; wire real run logs when ready.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
