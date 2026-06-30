import {
  Sparkles,
  Wand2,
  FileText,
  Users,
  Megaphone,
  MessageCircleQuestion,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

export function AiFeatures() {
  return (
    <section id="ai" className="relative overflow-hidden px-4 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Powered by AI
          </span>
          <h2 className="font-heading mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A complete AI toolkit for makers
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Everything you need to tell your story, reach the right audience,
            and build lasting trust.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Large feature with mock chat */}
          <Reveal className="sm:col-span-2 sm:row-span-2" delay={0}>
            <article className="glass-strong group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 p-6 shadow-xl shadow-black/10 transition-transform hover:-translate-y-1">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/20 blur-3xl"
              />

              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Wand2 className="size-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading mt-4 text-2xl font-semibold">
                AI brand story generator
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Turn a few details about your craft into a polished brand story,
                taglines, and social posts that sound authentically you.
              </p>
              <div className="mt-auto space-y-3 pt-6">
                <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  Write a story for my lavender soy candle brand.
                </div>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground">
                  Born in a small kitchen, Ember &amp; Oak hand-pours candles
                  that turn everyday moments into rituals of calm…
                </div>
              </div>
            </article>
          </Reveal>

          <BentoCard
            icon={FileText}
            title="AI product descriptions"
            desc="Generate SEO-ready listings that convert browsers into buyers."
            delay={80}
          />

          <BentoCard
            icon={Users}
            title="AI creator matching"
            desc="Pair with creators whose audience genuinely fits your brand."
            delay={140}
            gold
          />

          <BentoCard
            icon={Megaphone}
            title="AI marketing assistant"
            desc="Plan campaigns, captions, and posting schedules automatically."
            delay={200}
          />

          <BentoCard
            icon={MessageCircleQuestion}
            title="AI product Q&A"
            desc="Answer customer questions instantly, 24/7, in your brand voice."
            delay={260}
          />

          {/* Trust score - wide */}
          <Reveal className="sm:col-span-2" delay={320}>
            <article className="glass-strong group relative flex h-full items-center gap-5 overflow-hidden rounded-3xl border border-border/60 p-6 shadow-xl shadow-black/10 transition-transform hover:-translate-y-1">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-semibold">
                  Trust score analysis
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Build credibility with a verified trust score from reviews,
                  fulfillment, and engagement signals.
                </p>
              </div>
              <div className="ml-auto hidden flex-col items-center sm:flex">
                <div className="flex items-center gap-1 text-gold">
                  <TrendingUp className="size-4" aria-hidden="true" />
                  <span className="font-heading text-2xl font-semibold">
                    98
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  / 100 score
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ icon: Icon, title, desc, delay, gold }) {
  return (
    <Reveal delay={delay}>
      <article className="glass-strong group flex h-full flex-col rounded-3xl border border-border/60 p-6 shadow-lg shadow-black/5 transition-transform hover:-translate-y-1">
        <span
          className={`flex size-11 items-center justify-center rounded-xl transition-colors ${
            gold
              ? "bg-gold/20 text-gold"
              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="font-heading mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </article>
    </Reveal>
  );
}
