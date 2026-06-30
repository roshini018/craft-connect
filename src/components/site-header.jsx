import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "Creators", href: "/creators" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === 'brand_owner') return "/dashboard/brand";
    if (user.role === 'creator') return "/dashboard/creator";
    if (user.role === 'customer') return "/dashboard/customer";
    return "/";
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-4">
      <nav className="glass-strong flex w-full max-w-6xl items-center justify-between rounded-full border border-border/60 py-2.5 pl-5 pr-2.5 shadow-lg shadow-black/5">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="CraftConnect" className="size-8 object-contain" />
          <span className="font-heading text-lg font-semibold tracking-tight">
            CraftConnect
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 mr-2 bg-white border border-slate-200 rounded-full py-1.5 px-3">
                <User className="size-3" />
                {user.name} ({user.role === 'brand_owner' ? 'Brand' : user.role === 'creator' ? 'Creator' : 'Customer'})
              </span>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                <Link to={getDashboardLink()} className="flex items-center gap-1">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="rounded-full"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                asChild
                variant="ghost"
                className="rounded-full"
              >
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/register">Get started</Link>
              </Button>
            </div>
          )}
          
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong mt-2 flex w-full max-w-6xl flex-col gap-1 rounded-3xl border border-border/60 p-3 shadow-lg shadow-black/5 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/40">
              <span className="px-4 py-1.5 text-xs text-muted-foreground">
                Logged in as: {user.name} ({user.role})
              </span>
              <Link
                to={getDashboardLink()}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 mt-2 pt-2 border-t border-border/40">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 text-center rounded-2xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex-1 text-center rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/95"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

