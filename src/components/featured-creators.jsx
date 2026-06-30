
import { Button } from "@/components/ui/button";
import { Users, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

const creators = [
  {
    name: "Maya Rivera",
    handle: "@mayamakes",
    image: "/creators/creator-1.png",
    discipline: "Lifestyle & Home",
    followers: "482K",
    match: 98,
    portfolio: [
      "/products/ceramic.png",
      "/products/candle.png",
      "/products/textile.png",
    ],
  },
  {
    name: "Daniel Okafor",
    handle: "@danielcrafts",
    image: "/creators/creator-2.png",
    discipline: "Woodworking",
    followers: "318K",
    match: 94,
    portfolio: [
      "/products/tools.png",
      "/products/leather.png",
      "/products/ceramic.png",
    ],
  },
  {
    name: "Amara Bello",
    handle: "@amaradesigns",
    image: "/creators/creator-3.png",
    discipline: "Fashion & Textiles",
    followers: "624K",
    match: 96,
    portfolio: [
      "/products/textile.png",
      "/products/jewelry.png",
      "/products/leather.png",
    ],
  },
  {
    name: "Yuki Tanaka",
    handle: "@yukimade",
    image: "/creators/creator-4.png",
    discipline: "Ceramics",
    followers: "256K",
    match: 92,
    portfolio: [
      "/products/ceramic.png",
      "/products/skincare.png",
      "/products/candle.png",
    ],
  },
];

export function FeaturedCreators() {
  return (
    <section id="creators" className="relative overflow-hidden px-4 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-card/30"
      />

      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Featured creators
          </p>
          <h2 className="font-heading mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            The voices behind the craft
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Connect with content creators who tell your brand&apos;s story and
            bring it to engaged, loyal audiences.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((creator, i) => (
            <Reveal
              as="article"
              key={creator.handle}
              delay={i * 100}
              className="group [perspective:1200px]"
            >
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_rotateY(-6deg)] group-hover:shadow-2xl group-hover:shadow-black/15">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="glass absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white">
                    <Users className="size-3" aria-hidden="true" />
                    {creator.followers}
                  </div>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gold/90 px-2.5 py-1 text-xs font-semibold text-[oklch(0.2_0.02_60)] shadow">
                    <Sparkles className="size-3" aria-hidden="true" />
                    {creator.match}% match
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                      {creator.discipline}
                    </p>
                    <h3 className="font-heading mt-0.5 text-xl font-semibold">
                      {creator.name}
                    </h3>
                    <span className="text-sm text-white/80">
                      {creator.handle}
                    </span>
                    {/* portfolio preview */}
                    <div className="mt-3 flex gap-2">
                      {creator.portfolio.map((src, j) => (
                        <span
                          key={j}
                          className="relative size-10 overflow-hidden rounded-lg border border-white/25"
                        >
                          <img
                            src={src}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button variant="outline" size="lg" className="rounded-full">
            Browse all creators
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
