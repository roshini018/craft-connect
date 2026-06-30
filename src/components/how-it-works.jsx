import { Upload, FileText, Users, Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: Upload,
    title: "Upload products",
    desc: "Add your catalog in minutes — photos, prices, and details all in one place.",
  },
  {
    icon: FileText,
    title: "AI generates brand story",
    desc: "Our AI crafts a compelling brand narrative and product copy that sells.",
  },
  {
    icon: Users,
    title: "AI finds perfect creators",
    desc: "Get matched with creators whose audience genuinely fits your brand.",
  },
  {
    icon: Rocket,
    title: "Grow your brand",
    desc: "Launch campaigns, track results, and scale with predictive insights.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="font-heading mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            From workshop to worldwide in four steps
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            CraftConnect turns your craft into a growth engine — guided by AI at
            every step.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                as="article"
                key={step.title}
                delay={i * 120}
                className="relative text-center"
              >
                <div className="relative mx-auto flex size-[72px] items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-primary/15 animate-glow" />
                  <span className="glass-strong relative flex size-[72px] items-center justify-center rounded-full border border-gold/40 text-primary shadow-lg shadow-black/10">
                    <step.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
