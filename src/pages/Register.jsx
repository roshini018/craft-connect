import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Mail, Lock, User, Briefcase, Paintbrush, AlertCircle, ShoppingBag, ArrowLeft, ChevronRight, Check } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('customer'); // Default role
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const { register, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'brand_owner') {
        navigate('/onboarding/brand');
      } else if (user.role === 'creator') {
        navigate('/onboarding/creator');
      } else if (user.role === 'customer') {
        navigate('/dashboard/customer');
      } else {
        navigate('/');
      }
    }
  }, [user, loading, navigate]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !role) {
      return setError('Please enter all credentials.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setLocalLoading(true);
    const result = await register(name, email, password, role);
    setLocalLoading(false);

    if (!result.success) {
      setError(result.error || 'Registration failed. Please check details and try again.');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8 bg-slate-50 min-h-[85vh]">
      <div className="w-full max-w-xl bg-white/40 border border-slate-200/60 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Neon Glow Effects */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>

        {/* Stepper Header Indicator */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-200'}`}></div>
          <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
        </div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary mb-3 border border-primary/20">
            <Sparkles className="size-5 animate-pulse" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            {step === 1 ? 'Choose Your Path' : 'Create Your Profile'}
          </h2>
          <p className="text-slate-600 text-sm mt-1.5">
            {step === 1 ? 'Select the role that matches your objectives' : 'Fill out your authentication details'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm flex items-start gap-2.5">
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-6 relative z-10">
            {/* Role Picker Cards */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* Customer */}
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex items-start text-left p-5 rounded-2xl border transition-all ${
                  role === 'customer' 
                    ? 'bg-primary/5 border-primary text-slate-900 ring-1 ring-primary shadow-sm' 
                    : 'bg-white/40 border-slate-200/80 text-slate-600 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                <div className={`p-3 rounded-xl border shrink-0 mr-4 ${role === 'customer' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                  <ShoppingBag className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-semibold text-slate-800">Shop & Discover Customer</span>
                    {role === 'customer' && <Check className="size-4 text-primary" />}
                  </div>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Browse hand-grown brands, view creator reviews, read brand stories, and shop authentic products direct.
                  </span>
                </div>
              </button>

              {/* Brand Owner */}
              <button
                type="button"
                onClick={() => setRole('brand_owner')}
                className={`flex items-start text-left p-5 rounded-2xl border transition-all ${
                  role === 'brand_owner' 
                    ? 'bg-primary/5 border-primary text-slate-900 ring-1 ring-primary shadow-sm' 
                    : 'bg-white/40 border-slate-200/80 text-slate-600 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                <div className={`p-3 rounded-xl border shrink-0 mr-4 ${role === 'brand_owner' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                  <Briefcase className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-semibold text-slate-800">Home-Grown Brand Owner</span>
                    {role === 'brand_owner' && <Check className="size-4 text-primary" />}
                  </div>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Register your boutique business, upload your products catalog, match with influencers, and scale your brand.
                  </span>
                </div>
              </button>

              {/* Creator */}
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`flex items-start text-left p-5 rounded-2xl border transition-all ${
                  role === 'creator' 
                    ? 'bg-primary/5 border-primary text-slate-900 ring-1 ring-primary shadow-sm' 
                    : 'bg-white/40 border-slate-200/80 text-slate-600 hover:border-slate-355 hover:bg-slate-50/40'
                }`}
              >
                <div className={`p-3 rounded-xl border shrink-0 mr-4 ${role === 'creator' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                  <Paintbrush className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-semibold text-slate-800">Artisan Creator & Storyteller</span>
                    {role === 'creator' && <Check className="size-4 text-primary" />}
                  </div>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Showcase your creative portfolio, connect with verified slow brands, and pitch custom sponsored campaign packages.
                  </span>
                </div>
              </button>

            </div>

            <Button 
              onClick={handleNextStep}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold tracking-wider shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              Continue to Credentials
              <ChevronRight className="size-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            
            <div className="flex items-center justify-between pl-1">
              <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Role: {role.replace('_', ' ')}
              </span>
              <button 
                type="button" 
                onClick={handlePrevStep}
                className="text-xs text-slate-600 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="size-3.5" /> Change Role
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 pl-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-650" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full pl-12 pr-4 py-3 bg-white/40 border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-650" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@terraclay.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/40 border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-650" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-12 pr-4 py-3 bg-white/40 border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm backdrop-blur-sm"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={localLoading}
              className="w-full py-3.5 mt-4 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold tracking-wider shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {localLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              ) : 'Complete Account Registration'}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 mt-8 relative z-10">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/90 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
