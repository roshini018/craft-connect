const brands = [
  "Maison Clay",
  "Wildgrain",
  "Ember & Oak",
  "Tilde Studio",
  "Folk Provisions",
  "Northbound",
  "Saga Skincare",
  "Loom & Co",
];

export function BrandMarquee() {
  return (
    <section className="border-y border-border/60 bg-card/30 py-8">
      <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Loved by independent brands everywhere
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="font-heading whitespace-nowrap text-2xl font-semibold text-muted-foreground/70"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
