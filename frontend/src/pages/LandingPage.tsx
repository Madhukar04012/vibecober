import { useNavigate } from "react-router-dom";
import { HeroWave } from "@/components/ui/ai-input-hero";
import { ArrowRight, Code2, FolderGit2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05060b] text-white">
      <HeroWave
        title="VibeCober"
        subtitle="Turn ideas into real, runnable code."
        onPromptSubmit={(value) => {
          const trimmed = value.trim();
          navigate(`/generate${trimmed ? `?idea=${encodeURIComponent(trimmed)}` : ""}`);
        }}
      />

      <div className="relative z-10">
        <section
          id="discover"
          className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/50">How it works</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Serious output. No fluff.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/5 text-white/70 border-white/10">Local AI</Badge>
              <Badge className="bg-white/5 text-white/70 border-white/10">Zero API cost</Badge>
              <Badge className="bg-white/5 text-white/70 border-white/10">Real project files</Badge>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="bg-background/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  Analyze
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/60">
                VibeCober maps your idea into a practical architecture: routes, data model,
                services, and dependencies.
              </CardContent>
            </Card>

            <Card className="bg-background/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Code2 className="h-5 w-5 text-accent" />
                  Generate
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/60">
                Produces a runnable codebase shape with a coherent structure — not isolated
                snippets.
              </CardContent>
            </Card>

            <Card className="bg-background/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FolderGit2 className="h-5 w-5 text-accent" />
                  Run
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/60">
                Clear next steps, sensible defaults, and a clean starting point you can
                extend like a normal project.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mx-auto max-w-6xl bg-white/10" />

        <section
          id="manifesto"
          className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="text-sm text-white/50">Why developers like it</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Built for shipping, not chatting.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                VibeCober is designed like a tool you can trust: consistent structure,
                transparent steps, and outputs you can run locally.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                {
                  title: "Production-first output",
                  body: "Reasonable defaults, coherent architecture, and clean structure.",
                },
                {
                  title: "Real files, not snippets",
                  body: "A project shape you can navigate, refactor, and extend.",
                },
                {
                  title: "Local AI, zero API cost",
                  body: "Designed for Ollama/Mistral-style workflows without external calls.",
                },
                {
                  title: "CLI + Web support",
                  body: "Generate from the web UI, then run and iterate like a normal repo.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white/90">{item.title}</div>
                    <ArrowRight className="h-4 w-4 text-white/25" />
                  </div>
                  <div className="mt-1 text-sm text-white/60">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-14 text-xs text-white/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} VibeCober</div>
            <div className="flex items-center gap-3">
              <a className="hover:text-white/70" href="#manifesto">
                Manifesto
              </a>
              <a className="hover:text-white/70" href="#discover">
                Discover
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
