import { Reveal } from "@/components/reveal";

const stats = [
  { value: "500+", label: "Verified brands" },
  { value: "10K+", label: "Products" },
  { value: "2K+", label: "Creators" },
  { value: "98%", label: "Customer satisfaction" },
];

export function Stats() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[2rem] border border-border/60 p-8 shadow-xl shadow-black/10 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full bg-primary/15 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 size-48 rounded-full bg-gold/20 blur-3xl"
            />

            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 100} className="text-center">
                  <p className="font-heading text-4xl font-semibold text-primary sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
