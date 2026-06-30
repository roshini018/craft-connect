
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const brands = [
  {
    name: "Maison Clay",
    category: "Ceramics & Home",
    image: "/products/ceramic.png",
    tag: "Trending",
    blurb: "Hand-thrown stoneware made in small batches.",
  },
  {
    name: "Ember & Oak",
    category: "Candles & Scent",
    image: "/products/candle.png",
    tag: "New",
    blurb: "Slow-poured soy candles with botanical oils.",
  },
  {
    name: "Northbound",
    category: "Leather Goods",
    image: "/products/leather.png",
    tag: "Bestseller",
    blurb: "Full-grain leather, stitched to last a lifetime.",
  },
  {
    name: "Saga Skincare",
    category: "Clean Beauty",
    image: "/products/skincare.png",
    tag: "Editor’s pick",
    blurb: "Plant-based serums formulated for every skin type.",
  },
];

export function FeaturedBrands() {
  return (
    <section id="brands" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Trusted by home-grown brands
            </p>
            <h2 className="font-heading mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Discover makers worth following
            </h2>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            A curated showcase of home-grown brands building something
            remarkable — handpicked by our AI and our community.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, i) => (
            <Reveal
              as="article"
              key={brand.name}
              delay={i * 100}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <img
                  src={brand.image}
                  alt={`${brand.name} product`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <Badge className="absolute left-3 top-3 rounded-full border-0 bg-background/80 text-foreground backdrop-blur">
                  {brand.tag}
                </Badge>
                <span className="glass absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-border/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {brand.category}
                </p>
                <h3 className="font-heading mt-1 text-xl font-semibold">
                  {brand.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {brand.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
