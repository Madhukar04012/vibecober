"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Download,
  Folder,
  Github,
  Mail,
  Menu,
  Play,
  Sparkles,
  Terminal,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type Page = "landing" | "generator" | "preview" | "build";

interface ProjectData {
  idea: string;
  modules: string[];
  techStack: string[];
  structure: FolderNode[];
}

interface FolderNode {
  name: string;
  type: "file" | "folder";
  children?: FolderNode[];
}

const VibeCober: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [buildProgress, setBuildProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || currentPage !== "landing") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      );
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time + i) * 50 * (i + 1);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 - i * 0.03})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage]);

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setIsGenerating(true);
    setCurrentPage("generator");

    setTimeout(() => {
      setProjectData({
        idea,
        modules: [
          "Authentication",
          "Database",
          "API Routes",
          "Frontend UI",
          "State Management",
        ],
        techStack: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
          "Prisma",
        ],
        structure: [
          {
            name: "src",
            type: "folder",
            children: [
              {
                name: "components",
                type: "folder",
                children: [
                  { name: "ui", type: "folder" },
                  { name: "layout", type: "folder" },
                ],
              },
              {
                name: "pages",
                type: "folder",
                children: [
                  { name: "index.tsx", type: "file" },
                  { name: "dashboard.tsx", type: "file" },
                ],
              },
              { name: "lib", type: "folder" },
              { name: "hooks", type: "folder" },
            ],
          },
          {
            name: "server",
            type: "folder",
            children: [
              { name: "routes", type: "folder" },
              { name: "middleware", type: "folder" },
            ],
          },
          { name: "package.json", type: "file" },
          { name: "tsconfig.json", type: "file" },
        ],
      });
      setIsGenerating(false);
      setCurrentPage("preview");
    }, 2000);
  };

  const buildIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleBuild = () => {
    setCurrentPage("build");
    setBuildProgress(0);

    if (buildIntervalRef.current) clearInterval(buildIntervalRef.current);

    buildIntervalRef.current = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 100) {
          if (buildIntervalRef.current) clearInterval(buildIntervalRef.current);
          buildIntervalRef.current = null;
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (buildIntervalRef.current) clearInterval(buildIntervalRef.current);
    };
  }, []);

  const Navbar = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-background/80 backdrop-blur-xl border border-border rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage("landing")}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span>VibeCober</span>
              <span className="text-muted-foreground text-sm">· Local AI</span>
            </button>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a
                href="#manifesto"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Manifesto
              </a>
              <a
                href="#careers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Careers
              </a>
              <a
                href="#discover"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Discover
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-6 max-w-7xl mx-auto"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#manifesto"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Manifesto
              </a>
              <a
                href="#careers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Careers
              </a>
              <a
                href="#discover"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Discover
              </a>
              <Separator />
              <Button variant="ghost">Login</Button>
              <Button>Sign Up</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  const LandingPage = () => {
    const [placeholder, setPlaceholder] = useState("");
    const fullPlaceholder =
      "Make me a SaaS app with authentication and payments...";

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullPlaceholder.length) {
          setPlaceholder(fullPlaceholder.slice(0, index));
          index += 1;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50">
        <DottedSurface className="opacity-60" />
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none opacity-30"
        />

        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                VibeCober
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-12">
                Turn ideas into real, runnable code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && idea.trim()) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  placeholder={placeholder}
                  className="min-h-[120px] text-lg bg-background/50 backdrop-blur-xl border-border/50 focus:border-primary transition-all resize-none pr-14"
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!idea.trim()}
                  size="icon"
                  className="absolute bottom-4 right-4 rounded-full"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Press Enter to generate
              </p>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              How it works
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Analyze",
                  desc: "AI understands your idea and plans the architecture",
                },
                {
                  icon: Code2,
                  title: "Generate",
                  desc: "Creates production-ready code with best practices",
                },
                {
                  icon: Zap,
                  title: "Run",
                  desc: "Get a fully functional project ready to deploy",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="p-8 bg-background/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all">
                    <step.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="relative py-32 px-6 bg-background/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              Why developers like it
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Production-first output",
                  desc: "Real, deployable code with proper structure and best practices",
                },
                {
                  title: "Real files, not snippets",
                  desc: "Complete project structure with all necessary configurations",
                },
                {
                  title: "Local AI, zero API cost",
                  desc: "Runs on your machine with Ollama/Mistral. No subscriptions.",
                },
                {
                  title: "CLI + Web support",
                  desc: "Use it however you prefer. Terminal or browser.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 bg-background/50 backdrop-blur-xl border-border/50">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              Simple pricing
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Free",
                  price: "$0",
                  features: [
                    "Local AI models",
                    "Unlimited projects",
                    "CLI access",
                    "Community support",
                  ],
                },
                {
                  name: "Pro",
                  price: "$19",
                  features: [
                    "Everything in Free",
                    "Cloud sync",
                    "Priority support",
                    "Advanced templates",
                  ],
                  highlight: true,
                },
                {
                  name: "Team",
                  price: "$49",
                  features: [
                    "Everything in Pro",
                    "Team collaboration",
                    "Custom models",
                    "Dedicated support",
                  ],
                },
              ].map((plan) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`p-8 ${
                      plan.highlight
                        ? "border-primary bg-primary/5"
                        : "bg-background/50"
                    } backdrop-blur-xl`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-6">
                      {plan.price}
                      <span className="text-lg text-muted-foreground">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      Get started
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative py-32 px-6 bg-background/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              Trusted by developers
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Chen",
                  role: "Indie Hacker",
                  text: "Shipped my MVP in 2 days. This is insane.",
                },
                {
                  name: "Sarah Kim",
                  role: "Startup Founder",
                  text: "Finally, an AI tool that generates real code.",
                },
                {
                  name: "Mike Johnson",
                  role: "Senior Dev",
                  text: "Best prototyping tool I've used. Period.",
                },
              ].map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-background/50 backdrop-blur-xl border-border/50">
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              FAQ
            </motion.h2>
            <div className="space-y-6">
              {[
                {
                  q: "How does local AI work?",
                  a: "VibeCober uses Ollama to run AI models directly on your machine. No data leaves your computer.",
                },
                {
                  q: "What languages are supported?",
                  a: "Currently supports JavaScript, TypeScript, Python, and Go. More coming soon.",
                },
                {
                  q: "Can I customize the output?",
                  a: "Yes. You can modify templates and add your own patterns.",
                },
                {
                  q: "Is it really free?",
                  a: "Yes. The core tool is open source and free forever.",
                },
              ].map((faq) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-background/50 backdrop-blur-xl border-border/50">
                    <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-32 px-6 bg-background/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Ready to build?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground mb-12"
            >
              Join thousands of developers shipping faster with VibeCober
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View on GitHub
              </Button>
            </motion.div>
          </div>
        </section>

        <footer className="relative border-t border-border py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold">VibeCober</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Turn ideas into real, runnable code.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Email"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <Separator className="mb-8" />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} VibeCober. All rights reserved.</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  License
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  const GeneratorPage = () => (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4">Generate Project</h1>
            <p className="text-muted-foreground">
              Describe your project and let AI build it for you.
            </p>
          </div>

          <Card className="p-8 bg-background/50 backdrop-blur-xl border-border/50">
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your project idea..."
              className="min-h-[200px] text-lg mb-6 resize-none"
            />
            <Button
              onClick={handleGenerate}
              disabled={!idea.trim() || isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </Card>

          {isGenerating && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 bg-background/50 backdrop-blur-xl border-border/50">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );

  const FolderTree: React.FC<{ node: FolderNode; level?: number }> = ({
    node,
    level = 0,
  }) => {
    const [isOpen, setIsOpen] = useState(level < 2);

    return (
      <div className="select-none">
        <div
          className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded cursor-pointer"
          style={{ paddingLeft: level * 20 + 8 }}
          onClick={() => node.type === "folder" && setIsOpen(!isOpen)}
        >
          {node.type === "folder" ? (
            <>
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Folder className="w-4 h-4 text-primary" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <Terminal className="w-4 h-4 text-muted-foreground" />
            </>
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === "folder" && isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <FolderTree key={child.name} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const PreviewPage = () => (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4">Project Preview</h1>
            <p className="text-muted-foreground">
              Review your project before building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-background/50 backdrop-blur-xl border-border/50">
              <h2 className="text-2xl font-semibold mb-4">Project Summary</h2>
              <p className="text-muted-foreground mb-6">
                {projectData?.idea}
              </p>

              <h3 className="font-semibold mb-3">Detected Modules</h3>
              <div className="space-y-2 mb-6">
                {projectData?.modules.map((module) => (
                  <div key={module} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">{module}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {projectData?.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-background/50 backdrop-blur-xl border-border/50">
              <h2 className="text-2xl font-semibold mb-4">Project Structure</h2>
              <div className="bg-muted/30 rounded-lg p-4 max-h-[500px] overflow-auto">
                {projectData?.structure.map((node) => (
                  <FolderTree key={node.name} node={node} />
                ))}
              </div>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button size="lg" variant="outline" className="flex-1">
              <Play className="w-5 h-5 mr-2" />
              Preview
            </Button>
            <Button size="lg" onClick={handleBuild} className="flex-1">
              Build Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const BuildPage = () => {
    const steps = [
      "Initializing project structure",
      "Installing dependencies",
      "Generating components",
      "Setting up configuration",
      "Building assets",
      "Running tests",
      "Finalizing project",
    ];

    const currentStep = Math.floor((buildProgress / 100) * steps.length);

    return (
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">Building Project</h1>
              <p className="text-muted-foreground">
                {buildProgress === 100
                  ? "Your project is ready!"
                  : "Please wait while we build your project..."}
              </p>
            </div>

            <Card className="p-8 bg-background/50 backdrop-blur-xl border-border/50">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{buildProgress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${buildProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {steps.map((step, i) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        i < currentStep
                          ? "bg-primary/10 text-foreground"
                          : i === currentStep
                            ? "bg-primary/20 text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {i < currentStep ? (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : i === currentStep ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted rounded-full flex-shrink-0" />
                      )}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <Card className="p-4 bg-muted/30 border-border/50">
                  <div className="font-mono text-sm space-y-1">
                    <div className="text-primary">$ npm install</div>
                    <div className="text-muted-foreground">
                      ✓ Dependencies installed
                    </div>
                    <div className="text-primary">$ npm run build</div>
                    <div className="text-muted-foreground">
                      ✓ Build completed successfully
                    </div>
                    {buildProgress === 100 && (
                      <div className="text-green-500">✓ Project ready to use</div>
                    )}
                  </div>
                </Card>

                {buildProgress === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <Button size="lg" className="flex-1">
                      <Download className="w-5 h-5 mr-2" />
                      Download Project
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setCurrentPage("landing")}
                    >
                      Create Another
                    </Button>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AnimatePresence mode="wait">
        {currentPage === "landing" && <LandingPage key="landing" />}
        {currentPage === "generator" && <GeneratorPage key="generator" />}
        {currentPage === "preview" && <PreviewPage key="preview" />}
        {currentPage === "build" && <BuildPage key="build" />}
      </AnimatePresence>
    </div>
  );
};

export default VibeCober;
