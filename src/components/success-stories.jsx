import { TrendingUp, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const stories = [
  {
    brand: "Maison Clay",
    category: "Ceramics",
    before: { followers: "1.2K", revenue: "$3K" },
    after: { followers: "48K", revenue: "$72K" },
    growth: "+240%",
    quote: "CraftConnect matched us with creators who truly got our aesthetic.",
  },
  {
    brand: "Ember & Oak",
    category: "Candles",
    before: { followers: "800", revenue: "$1.5K" },
    after: { followers: "32K", revenue: "$54K" },
    growth: "+310%",
    quote: "The AI brand story gave us a voice customers fell in love with.",
  },
  {
    brand: "Saga Skincare",
    category: "Clean beauty",
    before: { followers: "2.1K", revenue: "$5K" },
    after: { followers: "67K", revenue: "$120K" },
    growth: "+180%",
    quote: "We scaled to six figures without hiring a marketing team.",
  },
];

export function SuccessStories() {
  return (
    <section id="stories" className="relative overflow-hidden px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Success stories
          </p>
          <h2 className="font-heading mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Real brands, real growth
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            See how home-grown makers transformed their reach and revenue with
            CraftConnect.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal as="article" key={s.brand} delay={i * 120}>
              <div className="glass-strong flex h-full flex-col rounded-3xl border border-border/60 p-6 shadow-xl shadow-black/10 transition-transform hover:-translate-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      {s.brand}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {s.category}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <TrendingUp className="size-4" aria-hidden="true" />
                    {s.growth}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex-1 rounded-2xl border border-border/60 bg-muted/50 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Before
                    </p>
                    <p className="font-heading mt-1 text-lg font-semibold text-muted-foreground">
                      {s.before.followers}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.before.revenue}/mo
                    </p>
                  </div>
                  <ArrowRight
                    className="size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div className="flex-1 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      After
                    </p>
                    <p className="font-heading mt-1 text-lg font-semibold text-gold">
                      {s.after.followers}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.after.revenue}/mo
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
