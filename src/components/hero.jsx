

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-2 sm:pt-2"
    >
      {/* gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[680px] w-[960px] -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[420px] w-[520px] rounded-full bg-gold/25 blur-[130px]" />
        <div className="absolute left-1/4 top-1/3 h-[320px] w-[360px] rounded-full bg-accent/40 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            AI-powered growth for home-grown brands
          </span>

          <h1 className="font-heading mt-6 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Helping home-grown brands grow with{" "}
            <span className="text-primary">AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
            Discover trusted brands, connect with creators, and scale your
            business through AI-powered collaboration.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="group rounded-full px-7">
              <Link to="/discover">
                Explore brands
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border/70 bg-card/40 px-7 backdrop-blur"
            >
              <Link to="/register">Join as creator</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            <div className="flex -space-x-2">
              {[
                "/creators/creator-1.png",
                "/creators/creator-2.png",
                "/creators/creator-3.png",
                "/creators/creator-4.png",
              ].map((src) => (
                <span
                  key={src}
                  className="relative size-9 overflow-hidden rounded-full border-2 border-background"
                >
                  <img src={src} alt="" className="object-cover w-full h-full" />
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by 12,000+ creators
              </p>
            </div>
          </div>
        </div>

        {/* Immersive 3D showcase */}
        <HeroScene />
      </div>
    </section>
  );
}
