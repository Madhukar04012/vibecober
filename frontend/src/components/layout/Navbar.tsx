import { Link, NavLink } from "react-router-dom";
import { Bot, Sparkles } from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-sm text-muted-foreground hover:text-foreground transition-colors",
          isActive && "text-foreground",
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/60 backdrop-blur">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-border/80 bg-card/40 shadow-sm">
              <Bot className="h-5 w-5 text-accent" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">VibeCober</div>
              <div className="text-xs text-muted-foreground">Local AI project generator</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavItem to="/generate">Generator</NavItem>
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              API Docs
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                Star
              </a>
            </Button>
            <Button asChild>
              <Link to="/generate" className="gap-2">
                <span className="hidden sm:inline">Generate</span>
                <span className="sm:hidden">Start</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
