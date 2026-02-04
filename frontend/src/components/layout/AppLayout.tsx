import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(900px_circle_at_85%_0%,rgba(34,211,238,0.16),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(500px circle at 50% 120px, black 40%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(500px circle at 50% 120px, black 40%, transparent 70%)",
          }}
        />
      </div>

      <Navbar />

      <main className="container relative z-10 py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
