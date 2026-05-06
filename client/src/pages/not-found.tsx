import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import logoImg from "@assets/clear_gator_1775663894887.png";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <header className="border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="Clear Gator Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-[1.04]" />
            <div className="leading-none">
              <div className="font-display font-semibold text-lg tracking-[-0.02em]">Clear Gator</div>
              <div className="font-mono text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground mt-1">
                Construction Services
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-lg text-center">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-gator-orange mb-4">
            404 / Not Found
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[0.98] mb-5">
            That page got <span className="text-muted-foreground/50">cleared.</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The link you followed may be broken, or the page may have moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/">
              <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2 rounded-md">
                <ArrowLeft className="w-4 h-4" /> Back home
              </Button>
            </Link>
            <Link href="/estimate">
              <Button variant="outline" className="gap-2 rounded-md">
                Free estimate <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
