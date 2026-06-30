import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  ArrowLeft,
  Users,
  BarChart2,
  Sparkles,
  Loader2,
  FolderOpen,
  Camera,
  Play,
  Globe,
  MapPin,
  TrendingUp,
  PieChart
} from 'lucide-react';

export default function CreatorProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Collab invite states
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [compensation, setCompensation] = useState('Gifting');
  const [requestSending, setRequestSending] = useState(false);
  const [requestStatus, setRequestStatus] = useState({ success: null, msg: '' });

  const defaultAvatar = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`;
  const defaultPortfolioImg = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/creators/${id}`);
      if (res.data.success) {
        setCreator(res.data.data);
      }
    } catch (error) {
      console.error('Failed to load creator profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      setRequestSending(true);
      setRequestStatus({ success: null, msg: '' });
      
      const res = await api.post('/collaborations', {
        targetId: creator._id,
        message,
        proposedCompensation: compensation
      });

      if (res.data.success) {
        setRequestStatus({ success: true, msg: 'Collaboration invitation sent successfully!' });
        setMessage('');
        setTimeout(() => {
          setShowModal(false);
          setRequestStatus({ success: null, msg: '' });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setRequestStatus({ 
        success: false, 
        msg: err.response?.data?.error || 'Failed to submit collaboration request.' 
      });
    } finally {
      setRequestSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-600 bg-[#FAFAFA] min-h-screen">
        <Loader2 className="size-8 animate-spin text-primary mb-4" />
        <p className="text-sm tracking-widest uppercase font-semibold text-slate-500">Loading Creator Profile...</p>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-[#FAFAFA] min-h-screen">
        <p className="text-slate-500 text-lg font-medium">Creator profile not found.</p>
        <Link to="/creators" className="text-primary font-semibold text-sm mt-4 flex items-center gap-1 hover:underline">
          <ArrowLeft className="size-4" /> Return to Directory
        </Link>
      </div>
    );
  }

  const formatFollowers = (count) => {
    if (!count) return '0';
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count.toString();
  };

  return (
    <div className="flex-1 bg-[#FAFAFA] relative w-full min-h-screen">
      
      {/* Editorial Hero Banner */}
      <div className="relative w-full h-[450px] lg:h-[500px] bg-slate-900 overflow-hidden">
        {/* Blurred Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110"
          style={{ backgroundImage: `url(${creator.user?.profileImage || defaultAvatar})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent"></div>

        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/creators" 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <ArrowLeft className="size-5" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-6 lg:px-12 py-8 z-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="flex items-end gap-6 w-full">
              <img
                src={creator.user?.profileImage || defaultAvatar}
                alt={creator.name}
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-3xl object-cover border-4 border-white shadow-2xl bg-white relative translate-y-8"
              />
              <div className="pb-2 w-full flex justify-between items-end">
                <div>
                  <h1 className="font-heading text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                    {creator.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {creator.niche?.map((n, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 uppercase tracking-widest"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="hidden md:flex gap-4">
                  {user?.role === 'brand_owner' ? (
                    <Button 
                      onClick={() => setShowModal(true)}
                      className="rounded-full px-8 py-6 bg-slate-900 text-white hover:bg-slate-800 font-semibold text-sm shadow-xl flex items-center gap-2"
                    >
                      <Sparkles className="size-4" />
                      Invite to Collaborate
                    </Button>
                  ) : user?.id === creator.user?._id ? (
                    <Button 
                      asChild
                      variant="outline"
                      className="rounded-full px-8 py-6 border-slate-300 text-slate-700 hover:bg-slate-100"
                    >
                      <Link to="/dashboard/creator/profile">Edit Profile</Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Quick Stats & Platforms */}
        <div className="lg:col-span-4 space-y-12">
          
          <div className="md:hidden">
            {user?.role === 'brand_owner' && (
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full rounded-full py-6 bg-slate-900 text-white hover:bg-slate-800 font-semibold text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="size-4" />
                Invite to Collaborate
              </Button>
            )}
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Audience Overview</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Users className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Followers</p>
                  <p className="font-heading text-2xl font-bold text-slate-900">{formatFollowers(creator.socialMetrics?.followers)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Avg. Engagement</p>
                  <p className="font-heading text-2xl font-bold text-slate-900">{creator.socialMetrics?.engagementRate}%</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Platforms</h3>
            <div className="flex flex-wrap gap-3">
              {creator.platforms?.map(platform => (
                <div key={platform} className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 text-sm font-semibold flex items-center gap-2">
                  {platform === 'Instagram' && <Camera className="size-4" />}
                  {platform === 'YouTube' && <Play className="size-4" />}
                  {platform}
                </div>
              ))}
            </div>
          </div>

          {creator.audienceInsights && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <PieChart className="size-4" /> Audience Insights
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Top Locations</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{creator.audienceInsights.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Age Distribution</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{creator.audienceInsights.age}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gender</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{creator.audienceInsights.gender}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Bio, Portfolio */}
        <div className="lg:col-span-8 space-y-16 mt-8 lg:mt-0">
          
          <div>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">About the Creator</h2>
            <p className="text-lg leading-relaxed text-slate-700">
              {creator.bio || 'Professional creator and artisan storyteller available for collaborations.'}
            </p>
          </div>

          {/* Portfolio Showcase */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="size-6 text-primary" />
                  Portfolio Showcase
                </h2>
                <p className="text-sm text-slate-500 mt-2">Past work and content style.</p>
              </div>
            </div>

            {!creator.portfolio || creator.portfolio.length === 0 ? (
              <div className="p-12 border border-dashed border-slate-300 rounded-3xl text-center text-slate-500">
                No portfolio pieces uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {creator.portfolio.map((item, idx) => (
                  <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={item.image || defaultPortfolioImg}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        {item.link && (
                          <a
                            href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-colors"
                          >
                            View Post <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      {item.description && <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Collaboration Invite Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="size-6 text-primary" />
              Invite to Collaborate
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              Invite {creator.name} to collaborate with your brand. Outline your proposal details below.
            </p>

            {requestStatus.msg && (
              <div className={`mb-6 p-4 rounded-xl border text-sm flex items-center gap-3 ${
                requestStatus.success 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}>
                <span>{requestStatus.msg}</span>
              </div>
            )}

            <form onSubmit={handleSendInvite} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Compensation Offer</label>
                <select
                  value={compensation}
                  onChange={(e) => setCompensation(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                >
                  <option value="Gifting (Free products)">Gifting (Free products)</option>
                  <option value="Paid Sponsorship">Paid Sponsorship</option>
                  <option value="Affiliate / Commission">Affiliate / Commission</option>
                  <option value="Content Exchange">Content Exchange</option>
                  <option value="Other">Other / Discuss details</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Offer Details</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey! We love your photography style and would love to send you our new collection..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none transition-all"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-6 rounded-2xl border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={requestSending}
                  className="flex-1 py-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10"
                >
                  {requestSending ? 'Sending...' : 'Send Invite'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
