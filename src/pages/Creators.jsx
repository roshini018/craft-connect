import { useState, useEffect } from 'react';
import api from '../services/api';
import CreatorCard from '../components/cards/CreatorCard';
import { Search, Loader2, SlidersHorizontal, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const niches = ["All", "Eco-friendly", "Home decor", "Fashion", "Handmade craft", "Artistic", "Lifestyle", "Photography"];

export default function Creators() {
  const { user } = useAuth();
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState('');
  const [niche, setNiche] = useState('All');
  const [minFollowers, setMinFollowers] = useState('');
  const [matchSort, setMatchSort] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (niche && niche !== 'All') params.niche = niche;
      if (minFollowers) params.minFollowers = minFollowers;

      const res = await api.get('/creators', { params });
      if (res.data.success) {
        let data = res.data.data;
        // Mock Match Score sorting based on user's niche if matchSort is true
        if (matchSort) {
          // just shuffling or sorting by engagement rate as a mock "Match Score"
          data.sort((a, b) => b.socialMetrics.engagementRate - a.socialMetrics.engagementRate);
        }
        setCreators(data);
      }
    } catch (error) {
      console.error('Failed to fetch creators:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCreators();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, niche, minFollowers, matchSort]);

  return (
    <div className="flex-1 bg-slate-50 relative overflow-hidden pb-12">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-6 pt-12 relative z-10 flex flex-col">
        
        {/* Directory Title */}
        <div className="mb-12 text-center sm:text-left max-w-2xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Meet Creator Partners
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Discover talented content creators, artisans, and influencers ready to collaborate on product campaigns and brand storytelling.
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
                placeholder="Search creators by name, niche, bio, tags..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm shadow-inner shadow-slate-100"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <select
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white border border-slate-200/80 rounded-2xl text-slate-600 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer transition-all"
                >
                  <option value="">Any Audience Size</option>
                  <option value="10000">10k+ Followers</option>
                  <option value="50000">50k+ Followers</option>
                  <option value="100000">100k+ Followers</option>
                </select>
              </div>

              {user?.role === 'brand_owner' && (
                <button
                  onClick={() => setMatchSort(!matchSort)}
                  className={`px-4 py-3 rounded-2xl border text-sm font-semibold flex items-center gap-2 transition-all ${
                    matchSort
                      ? 'bg-primary/5 border-primary text-primary shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Sparkles className="size-4" />
                  Sort by Match Score
                </button>
              )}
            </div>
          </div>

          {/* Niche Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            <SlidersHorizontal className="size-4 text-slate-400 mr-2 shrink-0" />
            {niches.map((nic) => (
              <button
                key={nic}
                onClick={() => setNiche(nic)}
                className={`px-5 py-2 text-xs font-semibold rounded-full border tracking-wide whitespace-nowrap transition-all ${
                  niche === nic
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                {nic}
              </button>
            ))}
          </div>
        </div>

        {/* Grid listing */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-600 gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm">Finding awesome creators...</p>
          </div>
        ) : creators.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-center bg-white/40 border border-slate-200/50 rounded-3xl backdrop-blur-sm">
            <p className="text-slate-700 text-lg font-semibold">No creators found matching your filters.</p>
            <p className="text-slate-500 text-sm mt-2 max-w-sm">Try broadening your search or exploring a different niche.</p>
            <button 
              onClick={() => { setSearch(''); setNiche('All'); setMinFollowers(''); setMatchSort(false); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {creators.map((creator) => (
              <CreatorCard key={creator._id} creator={creator} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
