
import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";

const testimonials = [
  {
    quote:
      "CraftConnect found us three creators in a week who actually got our brand. Sales doubled the next month.",
    name: "Maya Rivera",
    role: "Founder, Maison Clay",
    image: "/creators/creator-1.png",
  },
  {
    quote:
      "The AI studio writes our product descriptions better than we ever could. It feels like having a marketing team.",
    name: "Daniel Okafor",
    role: "Maker, Northbound",
    image: "/creators/creator-2.png",
  },
  {
    quote:
      "As a creator, brand matchmaking saves me hours. Every collab feels genuinely aligned with my audience.",
    name: "Amara Bello",
    role: "Creator, 624K followers",
    image: "/creators/creator-3.png",
  },
  {
    quote:
      "I launched my ceramics shop at 58 and CraftConnect made it feel effortless. Truly built for everyone.",
    name: "Yuki Tanaka",
    role: "Founder, Yuki Studio",
    image: "/creators/creator-4.png",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="font-heading mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Loved by makers of every generation
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              key={t.name}
              delay={i * 100}
              className="glass-strong flex flex-col rounded-3xl border border-border/60 p-7 shadow-lg shadow-black/5 transition-shadow hover:shadow-xl hover:shadow-black/10"
            >
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="font-heading mt-4 text-pretty text-xl leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative size-11 overflow-hidden rounded-full">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </span>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
