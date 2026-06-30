import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  ExternalLink,
  Loader2,
  TrendingUp,
  Package,
  Trash2
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [requests, setRequests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultLogo = `https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200`;

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [favRes, orderRes, recRes] = await Promise.all([
        api.get('/customer/favorites'),
        api.get('/customer/requests'),
        api.get('/customer/recommendations')
      ]);

      if (favRes.data.success) setFavorites(favRes.data.data);
      if (reqRes.data.success) setRequests(reqRes.data.data);
      if (recRes.data.success) setRecommendations(recRes.data.data.slice(0, 4));

    } catch (error) {
      console.error('Failed to load dashboard data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRemoveFavorite = async (brandId) => {
    try {
      const res = await api.delete(`/customer/favorites/${brandId}`);
      if (res.data.success) {
        setFavorites(prev => prev.filter(f => f.brandId !== brandId));
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to remove favorite');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Welcome Back, {user.name.split(' ')[0]}</h1>
        <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">Discover personalized artisan recommendations and manage your custom requests with home-grown brands.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Saved Brands</p>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mt-2">{favorites.length}</h3>
              <p className="text-xs text-slate-500 mt-1">Bookmarked</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-500/5 text-rose-600 border border-rose-500/10">
              <Heart className="size-6" />
            </div>
          </div>
          <a href="#saved-brands" className="text-xs text-primary font-semibold inline-flex items-center gap-1 mt-6 hover:underline relative z-10">
            View Collection <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Custom Requests</p>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mt-2">{requests.length}</h3>
              <p className="text-xs text-slate-500 mt-1">Active inquiries</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary/5 text-primary border border-primary/10">
              <ShoppingBag className="size-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Creator Reviews</p>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mt-2">12</h3>
              <p className="text-xs text-slate-500 mt-1">Profiles viewed</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/5 text-amber-600 border border-amber-500/10">
              <Sparkles className="size-6" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Order History & Saved Brands */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Requests */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Package className="size-5 text-slate-400" /> Recent Requests
            </h2>
            
            {requests.length === 0 ? (
              <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-500 text-sm bg-slate-50/50">
                You haven't submitted any custom requests yet. Discover artisans to collaborate with!
                <Link to="/discover" className="block mt-4 text-primary font-bold hover:underline">Explore Brands</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase tracking-widest">
                      <th className="pb-4 font-bold">Request Type</th>
                      <th className="pb-4 font-bold">Brand</th>
                      <th className="pb-4 font-bold">Deadline</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold text-right">Budget</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {requests.map((req) => (
                      <tr key={req._id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 pr-4 max-w-[200px]">
                          <p className="font-semibold text-slate-900 truncate">{req.requestType}</p>
                        </td>
                        <td className="py-5 px-4">
                          <div className="flex items-center gap-2">
                            <img src={req.brandLogo} alt={req.brandName} className="w-6 h-6 rounded-md object-cover border border-slate-200" />
                            <span className="text-slate-700 font-medium truncate max-w-[120px]">{req.brandName}</span>
                          </div>
                        </td>
                        <td className="py-5 px-4 text-slate-500">
                          {new Date(req.deadline).toLocaleDateString()}
                        </td>
                        <td className="py-5 px-4">
                          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                            req.status === 'completed' 
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                              : req.status === 'accepted' 
                              ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' 
                              : req.status === 'quote_sent'
                              ? 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                              : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                          }`}>
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-5 pl-4 text-right font-bold text-slate-900">
                          ${req.budget}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Saved Brands */}
          <div id="saved-brands" className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60 scroll-mt-24">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Heart className="size-5 text-rose-500" /> Saved Brands
            </h2>
            
            {favorites.length === 0 ? (
              <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-500 text-sm bg-slate-50/50">
                You haven't saved any brands yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <div key={fav.brand?._id} className="border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors bg-slate-50/50">
                    <img 
                      src={fav.brand?.logo || defaultLogo} 
                      alt={fav.brand?.name} 
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <Link to={`/brands/${fav.brand?._id}`} className="font-semibold text-slate-900 truncate hover:text-primary transition-colors block">{fav.brand?.name}</Link>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 truncate">{fav.brand?.industry}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveFavorite(fav.brandId)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column - AI Recommendations */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60 relative overflow-hidden sticky top-24">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <Sparkles className="size-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900">Recommended Brands</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Curated for You</p>
              </div>
            </div>

            {recommendations.length === 0 ? (
              <div className="p-8 border border-dashed border-slate-200 rounded-3xl text-center text-slate-500 text-sm bg-slate-50/50 relative z-10">
                Explore more to get personalized brand recommendations.
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                {recommendations.map((rec) => (
                  <div key={rec.brand?._id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-3 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.brand?.logo || defaultLogo}
                        alt={rec.brand?.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-white"
                      />
                      <div className="min-w-0 flex-1">
                        <Link to={`/brands/${rec.brand?._id}`} className="font-semibold text-slate-900 text-sm truncate hover:text-primary">{rec.brand?.name}</Link>
                        <span className="block text-[9px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                          <TrendingUp className="size-3" /> {rec.score}% Match
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic">"{rec.reason}"</p>
                  </div>
                ))}
              </div>
            )}
            
            <Link to="/discover" className="block text-center mt-6 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
              Browse All Brands &rarr;
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
