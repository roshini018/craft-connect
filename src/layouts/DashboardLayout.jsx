import { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Package, 
  Handshake, 
  LogOut, 
  Home, 
  Menu, 
  X, 
  Sparkles,
  Heart,
  Compass,
  MessageSquare
} from 'lucide-react';

import PageTransition from '../components/PageTransition';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const role = user.role;

  // Define sidebar links based on role
  const brandLinks = [
    { label: 'Overview', href: '/dashboard/brand', icon: LayoutDashboard },
    { label: 'Edit Profile', href: '/dashboard/brand/profile', icon: User },
    { label: 'AI Studio', href: '/dashboard/brand/ai-studio', icon: Sparkles },
    { label: 'Manage Campaigns', href: '/dashboard/brand/products', icon: Package },
    { label: 'Collaborations', href: '/dashboard/brand/collaborations', icon: Handshake },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ];

  const creatorLinks = [
    { label: 'Overview', href: '/dashboard/creator', icon: LayoutDashboard },
    { label: 'Edit Profile', href: '/dashboard/creator/profile', icon: User },
    { label: 'Collab Requests', href: '/dashboard/creator/requests', icon: Handshake },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ];

  const customerLinks = [
    { label: 'Overview', href: '/dashboard/customer', icon: LayoutDashboard },
    { label: 'Saved Brands', href: '/dashboard/customer/favorites', icon: Heart },
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ];

  const sidebarLinks = role === 'brand_owner' ? brandLinks : role === 'creator' ? creatorLinks : customerLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="CraftConnect" className="size-7 object-contain" />
          <span className="font-heading font-semibold text-base">CraftConnect</span>
        </Link>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 rounded-md text-slate-600 hover:text-slate-800 focus:outline-none"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white/40 border-r border-slate-300 p-6 flex-shrink-0">
        <div className="mb-8 flex items-center gap-2 pl-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="CraftConnect" className="size-8 object-contain" />
            <span className="font-heading text-lg font-semibold tracking-tight">CraftConnect</span>
          </Link>
        </div>

        {/* User Card */}
        <div className="mb-6 p-4 rounded-2xl bg-white/60 border border-slate-200/50">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Logged In As</p>
          <p className="font-medium text-slate-800 mt-1 truncate">{user.name}</p>
          <span className="inline-block px-2 py-0.5 mt-2 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 capitalize">
            {role === 'brand_owner' ? 'Brand Owner' : role === 'creator' ? 'Artisan Creator' : 'Customer'}
          </span>
        </div>

        {/* Links */}
        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-800'
                }`}
              >
                <Icon className="size-4.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-300 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-white/60 hover:text-slate-800 transition-all"
          >
            <Home className="size-4.5" />
            Back to Home
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="size-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
          <aside className="relative flex flex-col w-72 max-w-xs bg-white border-r border-slate-200 p-6 z-40">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="size-3.5" />
                </span>
                <span className="font-heading font-semibold text-base">CraftConnect</span>
              </Link>
              <button onClick={() => setMobileOpen(false)}>
                <X className="size-6 text-slate-600" />
              </button>
            </div>

            {/* Mobile User Card */}
            <div className="mb-6 p-4 rounded-xl bg-slate-50/50 border border-slate-200/40">
              <p className="text-xs text-slate-500 uppercase font-semibold">User Profile</p>
              <p className="font-medium text-slate-800 mt-1 truncate">{user.name}</p>
              <p className="text-xs text-slate-600 mt-0.5 truncate">{user.email}</p>
            </div>

            {/* Mobile Links */}
            <nav className="flex-1 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-slate-600 hover:bg-slate-50/60 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="size-4.5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50/60 hover:text-slate-800"
              >
                <Home className="size-4.5" />
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-500/10"
              >
                <LogOut className="size-4.5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};

export default DashboardLayout;
