import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'brand_owner') {
        navigate('/dashboard/brand');
      } else if (user.role === 'creator') {
        navigate('/dashboard/creator');
      } else if (user.role === 'customer') {
        navigate('/dashboard/customer');
      } else {
        navigate('/');
      }
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }

    setLocalLoading(true);
    const result = await login(email, password);
    setLocalLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex-1 min-h-[85vh] w-full grid lg:grid-cols-2 max-w-6xl mx-auto px-4 py-8 items-center gap-12">
      
      {/* Visual Left Showcase Column */}
      <div className="hidden lg:flex flex-col justify-center relative h-[600px] bg-slate-950/5 border border-slate-200/40 rounded-4xl p-12 overflow-hidden shadow-sm backdrop-blur-md">
        {/* Soft floating background glows */}
        <div className="absolute top-12 left-10 w-44 h-44 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-44 h-44 bg-gold/15 rounded-full blur-[100px] animate-pulse"></div>
        
        {/* Animated Brand Showcase Stack */}
        <div className="relative z-10 space-y-6">
          <span className="glass inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
            <Sparkles className="size-3.5" />
            Empowering Artisan Makers
          </span>
          <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-slate-900">
            Connecting premium craft with visionary storytellers.
          </h2>
          <p className="text-slate-600 text-sm max-w-md leading-relaxed">
            Welcome to the AI-matching sanctuary where organic, hand-grown brands discover creator partners to share their craft with the world.
          </p>
        </div>

        {/* Floating Interactive Product Showcase Cards */}
        <div className="relative mt-12 w-full h-[240px] flex items-center justify-center">
          
          {/* Card 1: Pottery Brand (Floating Left) */}
          <div className="absolute left-0 top-4 w-[210px] bg-white/60 backdrop-blur border border-slate-200/50 rounded-3xl p-4 shadow-xl shadow-slate-900/5 rotate-[-4deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=60" 
                alt="Clay" 
                className="w-10 h-10 rounded-xl object-cover" 
              />
              <div>
                <h4 className="font-semibold text-xs text-slate-800">Terra Clay</h4>
                <p className="text-[10px] text-slate-500">Organic Stoneware</p>
              </div>
              <span className="ml-auto text-[9px] font-bold text-indigo-650 bg-indigo-500/10 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <p className="text-[11px] text-slate-650 mt-3 line-clamp-2 leading-relaxed">
              "We found 4 creator partners in our first week!"
            </p>
          </div>

          {/* Card 2: Linen Brand (Floating Right) */}
          <div className="absolute right-0 bottom-4 w-[210px] bg-white/65 backdrop-blur border border-slate-200/50 rounded-3xl p-4 shadow-xl shadow-slate-900/5 rotate-[4deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=60" 
                alt="Linen" 
                className="w-10 h-10 rounded-xl object-cover" 
              />
              <div>
                <h4 className="font-semibold text-xs text-slate-800">Linen & Loom</h4>
                <p className="text-[10px] text-slate-500">Slow Fashion</p>
              </div>
              <span className="ml-auto text-[9px] font-bold text-indigo-650 bg-indigo-500/10 px-2 py-0.5 rounded-full">98% Match</span>
            </div>
            <p className="text-[11px] text-slate-650 mt-3 line-clamp-2 leading-relaxed">
              Matched with Sofia Chen for summer linen capsule.
            </p>
          </div>

        </div>

        {/* Trust Indicators */}
        <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between border-t border-slate-200/80 pt-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          <span>12,000+ Creators</span>
          <span>•</span>
          <span>4,500+ Verified Brands</span>
          <span>•</span>
          <span>AI Matches</span>
        </div>
      </div>

      {/* Right Column: Luxury Login Form */}
      <div className="w-full max-w-md mx-auto flex flex-col justify-center">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-xs mb-8 transition-colors font-semibold uppercase tracking-wider">
          <ArrowLeft className="size-4" />
          Back to Homepage
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome Back
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Enter your credentials to manage your collaborations and view your dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm flex items-start gap-2.5">
            <AlertCircle className="size-5 shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-12 pr-4 py-3 bg-white/40 border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-white/40 border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-xs pl-1">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-250 text-primary focus:ring-primary size-4"
              />
              <span>Remember me</span>
            </label>
            
            <a 
              href="#forgot-password" 
              onClick={(e) => { e.preventDefault(); alert("Enter any registered email address. Since backend is mock-only, password resets are auto-confirmed."); }} 
              className="text-primary font-semibold hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Action button */}
          <Button 
            type="submit" 
            disabled={localLoading}
            className="w-full py-3.5 mt-4 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold tracking-wider shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {localLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
            ) : 'Sign In To Workspace'}
          </Button>
        </form>

        {/* Demo Help Note */}
        <div className="mt-6 p-3 bg-indigo-500/5 border border-indigo-550/15 rounded-2xl text-[11px] text-slate-500">
          <p className="font-semibold text-slate-700">Demo Accounts:</p>
          <p className="mt-1">Brand Owner: <code className="bg-white/80 px-1 py-0.5 rounded border">brand@demo.com</code> / pass</p>
          <p className="mt-0.5">Artisan Creator: <code className="bg-white/80 px-1 py-0.5 rounded border">creator@demo.com</code> / pass</p>
          <p className="mt-0.5">Customer: <code className="bg-white/80 px-1 py-0.5 rounded border">customer@demo.com</code> / pass</p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Don't have a profile yet?{' '}
          <Link to="/register" className="text-primary hover:text-primary/90 font-semibold hover:underline">
            Register now &rarr;
          </Link>
        </p>
      </div>

    </div>
  );
}
