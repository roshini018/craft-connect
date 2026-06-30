import { useState, useEffect } from 'react';
import api from '../services/api';
import BrandCard from '../components/cards/BrandCard';
import { Search, Loader2, SlidersHorizontal, CheckCircle2, TrendingUp } from 'lucide-react';

const industries = ["All", "Textiles", "Ceramics", "Home Decor", "Fashion", "Jewelry", "Art & Prints", "Gourmet Foods"];

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All');
  const [verified, setVerified] = useState(false);
  const [trending, setTrending] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (industry && industry !== 'All') params.industry = industry;
      if (verified) params.verified = 'true';
      if (trending) params.trending = 'true';

      const res = await api.get('/brands', { params });
      if (res.data.success) {
        setBrands(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBrands();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, industry, verified, trending]);

  return (
    <div className="flex-1 bg-slate-50 relative overflow-hidden pb-12">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-6 pt-12 relative z-10 flex flex-col">
        
        {/* Directory Title */}
        <div className="mb-12 text-center sm:text-left max-w-2xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            The Artisan Directory
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Discover the most inspiring home-grown brands. From slow-made ceramics to organic textiles, find passionate artisans creating authentic wares.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-4 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by brand name, industry, materials, tags..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm shadow-inner shadow-slate-100"
              />
            </div>

            {/* Quick Toggles */}
            <div className="flex gap-3">
              <button
                onClick={() => setVerified(!verified)}
                className={`px-4 py-3 rounded-2xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                  verified
                    ? 'bg-primary/5 border-primary text-primary'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <CheckCircle2 className="size-4" />
                Verified
              </button>
              <button
                onClick={() => setTrending(!trending)}
                className={`px-4 py-3 rounded-2xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                  trending
                    ? 'bg-amber-500/10 border-amber-500 text-amber-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <TrendingUp className="size-4" />
                Trending
              </button>
            </div>
          </div>

          {/* Industry Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <SlidersHorizontal className="size-4 text-slate-400 mr-2 shrink-0" />
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-5 py-2 text-xs font-semibold rounded-full border tracking-wide whitespace-nowrap transition-all ${
                  industry === ind
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Grid listing */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-600 gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm">Curating artisan brands...</p>
          </div>
        ) : brands.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-center bg-white/40 border border-slate-200/50 rounded-3xl backdrop-blur-sm">
            <p className="text-slate-700 text-lg font-semibold">No brands found matching your filters.</p>
            <p className="text-slate-500 text-sm mt-2 max-w-sm">Try broadening your search or exploring a different category.</p>
            <button 
              onClick={() => { setSearch(''); setIndustry('All'); setVerified(false); setTrending(false); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
