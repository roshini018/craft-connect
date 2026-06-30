import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Sparkles, 
  Check, 
  X, 
  ExternalLink,
  Loader2,
  TrendingUp,
  FolderHeart,
  MessageSquare
} from 'lucide-react';

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [collabRequests, setCollabRequests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ portfolio: 0, proposals: 0, pending: 0 });

  const defaultLogo = `https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200`;

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // 1. Get collaborations
      const collabRes = await api.get('/collaborations/requests');
      let requests = [];
      if (collabRes.data.success) {
        requests = collabRes.data.data;
        setCollabRequests(requests);
      }

      // 2. Get AI recommendations
      try {
        const matchRes = await api.get('/collaborations/recommendations');
        if (matchRes.data.success) {
          setRecommendations(matchRes.data.data.slice(0, 5)); // top 5 recommendations
        }
      } catch (err) {
        console.error("AI matching failed to load", err);
      }

      // 3. Find creator portfolio items to populate stats
      let portfolioCount = 0;
      try {
        const creatorProfileRes = await api.get('/creators');
        const myCreator = creatorProfileRes.data.data.find(c => c.user?._id === user._id);
        if (myCreator) {
          portfolioCount = myCreator.portfolio?.length || 0;
        }
      } catch (err) {
        console.error(err);
      }

      setStats({
        portfolio: portfolioCount,
        proposals: requests.length,
        pending: requests.filter(r => r.status === 'pending').length
      });

    } catch (error) {
      console.error('Failed to load dashboard data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      const res = await api.put(`/collaborations/${requestId}`, { status: newStatus });
      if (res.data.success) {
        // Refresh local requests list
        setCollabRequests(prev => 
          prev.map(r => r._id === requestId ? { ...r, status: newStatus } : r)
        );
        // Refresh stats
        setStats(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1)
        }));
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update request status');
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
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Creator Hub</h1>
        <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">Review active collaborations and discover AI-matched authentic home-grown brands.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Campaigns</p>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mt-2">{stats.portfolio}</h3>
              <p className="text-xs text-slate-500 mt-1">Live brand partnerships</p>
            </div>
            <div className="p-4 rounded-2xl bg-primary/5 text-primary border border-primary/10">
              <FolderHeart className="size-6" />
            </div>
          </div>
          <Link to="/dashboard/creator/profile" className="text-xs text-primary font-semibold inline-flex items-center gap-1 mt-6 hover:underline relative z-10">
            Manage Campaigns <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Collaboration Requests</p>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mt-2">{stats.pending}</h3>
              <p className="text-xs text-slate-500 mt-1">Awaiting response</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/5 text-amber-600 border border-amber-500/10">
              <MessageSquare className="size-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Audience Growth</p>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mt-2">{stats.proposals}</h3>
              <p className="text-xs text-slate-500 mt-1">Monthly follower increase</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/5 text-emerald-600 border border-emerald-500/10">
              <Users className="size-6" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Received Invitations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Collaboration Requests</h2>
            
            {collabRequests.length === 0 ? (
              <div className="p-12 border border-dashed border-slate-200 rounded-3xl text-center text-slate-500 text-sm bg-slate-50/50">
                No active collaboration requests yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase tracking-widest">
                      <th className="pb-4 font-bold">Brand Owner</th>
                      <th className="pb-4 font-bold">Details</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {collabRequests.map((req) => (
                      <tr key={req._id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 pr-4 max-w-[150px]">
                          <div className="flex items-center gap-4">
                            <img
                              src={req.brand?.logo || defaultLogo}
                              alt={req.brand?.name}
                              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-50 shadow-sm"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate">{req.brand?.name}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">{req.brand?.industry}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4 max-w-[250px]">
                          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{req.message}</p>
                          <span className="inline-block mt-2 text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
                            Compensation: {req.proposedCompensation}
                          </span>
                        </td>
                        <td className="py-5 px-4">
                          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                            req.status === 'pending' 
                              ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' 
                              : req.status === 'accepted' 
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                              : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="py-5 pl-4 text-right">
                          {req.status === 'pending' && req.sender !== user._id ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleUpdateStatus(req._id, 'accepted')}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white transition-all shadow-sm"
                                title="Accept Offer"
                              >
                                <Check className="size-4" />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(req._id, 'rejected')}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white transition-all shadow-sm"
                                title="Reject Offer"
                              >
                                <X className="size-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                              {req.sender === user._id ? 'Outgoing' : 'Recorded'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - AI Recommended Brands */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <Sparkles className="size-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900">AI Brand Matches</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Recommended Brands</p>
              </div>
            </div>

            {recommendations.length === 0 ? (
              <div className="p-8 border border-dashed border-slate-200 rounded-3xl text-center text-slate-500 text-sm bg-slate-50/50 relative z-10">
                Complete your Creator profile to receive matching recommendations.
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                {recommendations.map((rec) => (
                  <div key={rec.brand?._id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 hover:border-primary/30 transition-colors group">
                    <img
                      src={rec.brand?.logo || defaultLogo}
                      alt={rec.brand?.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-white shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm truncate">{rec.brand?.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {rec.matchedTags?.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] bg-white border border-slate-200 text-slate-500 font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end">
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                        <TrendingUp className="size-3" />
                        {rec.score}% Match
                      </span>
                      <Link 
                        to={`/brands/${rec.brand?._id}`}
                        className="text-[10px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 mt-2 transition-colors uppercase tracking-widest"
                      >
                        Pitch <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
