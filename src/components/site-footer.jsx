
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Globe, Send, AtSign, ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: ["For brands", "For creators", "AI studio", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Help center", "Community", "Guides", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden px-4 pb-10 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        {/* CTA */}
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] border border-border/60 p-10 text-center shadow-xl shadow-black/10 sm:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />

          <h2 className="font-heading mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to grow your craft?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Join thousands of brands and creators building something of their
            own. Free to start.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              placeholder="you@brand.com"
              aria-label="Email address"
              className="h-12 rounded-full bg-card/60 px-5"
            />

            <Button
              type="submit"
              size="lg"
              className="group h-12 rounded-full px-6"
            >
              Get started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>

        {/* Links */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <img src="/logo.png" alt="CraftConnect" className="size-8 object-contain" />
              <span className="font-heading text-lg font-semibold tracking-tight">
                CraftConnect
              </span>
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              The AI-powered platform connecting home-grown brands, artisans,
              and content creators with the world.
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, Send, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} CraftConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
