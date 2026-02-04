import { Separator } from "../ui/separator";

export function Footer() {
  return (
    <footer className="relative z-10 mt-8">
      <div className="container pb-10">
        <Separator className="mb-6" />
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} VibeCober</div>
          <div className="flex gap-4">
            <a className="hover:text-foreground transition-colors" href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer">
              API
            </a>
            <a className="hover:text-foreground transition-colors" href="#" onClick={(e) => e.preventDefault()}>
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
