import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Loader2, 
  Trash2, 
  Plus, 
  X, 
  BarChart, 
  Users, 
  FolderPlus, 
  ImagePlus, 
  ExternalLink 
} from 'lucide-react';

export default function CreatorProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ success: null, text: '' });

  // Form states
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [youtube, setYoutube] = useState('');
  const [followers, setFollowers] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [portfolio, setPortfolio] = useState([]);

  // Add portfolio modal states
  const [showPortModal, setShowPortModal] = useState(false);
  const [portTitle, setPortTitle] = useState('');
  const [portDesc, setPortDesc] = useState('');
  const [portLink, setPortLink] = useState('');
  const [portFile, setPortFile] = useState(null);
  const [portPreview, setPortPreview] = useState('');
  const [uploadingPort, setUploadingPort] = useState(false);

  const defaultImg = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300`;

  const loadCreatorProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/creators');
      // Find current user's profile
      const myProfile = res.data.data.find(c => c.user);
      if (myProfile) {
        setName(myProfile.name || '');
        setBio(myProfile.bio || '');
        setNiche(myProfile.niche?.join(', ') || '');
        setInstagram(myProfile.socialLinks?.instagram || '');
        setTiktok(myProfile.socialLinks?.tiktok || '');
        setYoutube(myProfile.socialLinks?.youtube || '');
        setFollowers(myProfile.socialMetrics?.followers || '');
        setEngagementRate(myProfile.socialMetrics?.engagementRate || '');
        setAiKeywords(myProfile.aiKeywords?.join(', ') || '');
        setPortfolio(myProfile.portfolio || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreatorProfile();
  }, []);

  const handlePortFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPortFile(file);
      setPortPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ success: null, text: '' });

    try {
      // Creator save is JSON body post
      const res = await api.post('/creators', {
        name,
        bio,
        niche,
        instagram,
        tiktok,
        youtube,
        followers,
        engagementRate,
        aiKeywords,
        portfolio // send existing portfolio array
      });

      if (res.data.success) {
        setMsg({ success: true, text: res.data.message });
      }
    } catch (err) {
      console.error(err);
      setMsg({ success: false, text: err.response?.data?.error || 'Failed to update creator profile' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddPortfolioItem = async (e) => {
    e.preventDefault();
    if (!portTitle) return;

    try {
      setUploadingPort(true);
      let imageUrl = '';

      // Upload portfolio item image if file is selected
      if (portFile) {
        // Since portfolio items are embedded inside Creator schema, we can convert the portfolio image 
        // to a data URI locally on the client (using FileReader) before sending, 
        // OR post it to a temp server endpoint. 
        // A client FileReader converting to Base64 is extremely fast and robust for this embedded schema!
        const getBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
        };
        imageUrl = await getBase64(portFile);
      }

      const newItem = {
        title: portTitle,
        description: portDesc,
        link: portLink,
        image: imageUrl || defaultImg
      };

      const updatedPortfolio = [...portfolio, newItem];
      
      // Save profile with new portfolio item
      const res = await api.post('/creators', {
        name,
        bio,
        niche,
        instagram,
        tiktok,
        youtube,
        followers,
        engagementRate,
        aiKeywords,
        portfolio: updatedPortfolio
      });

      if (res.data.success) {
        setPortfolio(updatedPortfolio);
        setShowPortModal(false);
        // Reset modal fields
        setPortTitle('');
        setPortDesc('');
        setPortLink('');
        setPortFile(null);
        setPortPreview('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to add portfolio item');
    } finally {
      setUploadingPort(false);
    }
  };

  const handleDeletePortfolioItem = async (indexToDelete) => {
    if (!window.confirm('Delete this portfolio project?')) return;

    try {
      const updatedPortfolio = portfolio.filter((_, idx) => idx !== indexToDelete);
      
      const res = await api.post('/creators', {
        name,
        bio,
        niche,
        instagram,
        tiktok,
        youtube,
        followers,
        engagementRate,
        aiKeywords,
        portfolio: updatedPortfolio
      });

      if (res.data.success) {
        setPortfolio(updatedPortfolio);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete portfolio item');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">Creator Profile Editor</h1>
        <p className="text-slate-600 text-sm mt-1">Configure your personal portfolio, niching categories, and socials metrics.</p>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-2xl border text-sm ${
          msg.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Grid: Details on Left, Portfolio Items list at Bottom/Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Settings Form */}
        <div className="lg:col-span-2 bg-white/20 border border-slate-200/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-6 border-b border-slate-300 pb-3">Creator Settings</h2>
          
          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Profile Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Jane Artisan"
                  className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Niches */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 pl-1">Creator Niches (Comma Separated)</label>
                <span className="block text-[9px] text-slate-500 mb-2 pl-1">E.g. Eco-friendly, Home decor, Fashion</span>
                <input
                  type="text"
                  required
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Eco-friendly, Home decor, Fashion"
                  className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Biography / About Me</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your story, design philosophy, and content creation focus..."
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm resize-none"
              />
            </div>

            {/* Followers and Engagement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50/40 border border-slate-300 rounded-2xl">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1 flex items-center gap-1">
                  <Users className="size-3.5 text-indigo-600" /> Follower Count
                </label>
                <input
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  placeholder="12500"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1 flex items-center gap-1">
                  <BarChart className="size-3.5 text-purple-600" /> Engagement Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(e.target.value)}
                  placeholder="4.5"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
            </div>

            {/* AI Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 pl-1">AI Recommendation Tags (Comma Separated)</label>
              <span className="block text-[9px] text-slate-500 mb-2 pl-1">E.g., hand-knitted, organic wool, sustainable style, photography</span>
              <input
                type="text"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                placeholder="hand-knitted, organic wool, sustainable style, photography"
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-4 border-t border-slate-300">
              <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Social Channels Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 uppercase mb-1">Instagram</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Instagram URL"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 uppercase mb-1">TikTok</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">♬</span>
                    <input
                      type="text"
                      value={tiktok}
                      onChange={(e) => setTiktok(e.target.value)}
                      placeholder="TikTok URL"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 uppercase mb-1">YouTube</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.5 5.2 4.4 5.2C6.3 5.2 12 5.2 12 5.2C12 5.2 17.7 5.2 19.6 5.2C21.5 5.2 21.5 7.1 21.5 7.1C21.5 7.1 21.5 12 21.5 12C21.5 12 21.5 16.9 19.6 16.9C17.7 16.9 12 16.9 12 16.9C12 16.9 6.3 16.9 4.4 16.9C2.5 16.9 2.5 12 2.5 12C2.5 12 2.5 7.1 2.5 7.1Z"/><path d="M9.5 8.6L15.5 12L9.5 15.4V8.6Z"/></svg>
                    <input
                      type="text"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      placeholder="YouTube URL"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              {submitting ? 'Saving Profile...' : 'Save Profile Settings'}
            </Button>

          </form>
        </div>

        {/* Portfolio Manager Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/20 border border-slate-200/80 rounded-3xl p-6 backdrop-blur-md">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-base font-bold text-slate-900">My Portfolio</h2>
              <button 
                onClick={() => setShowPortModal(true)}
                className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1 text-[10px] font-bold border border-indigo-500/20"
              >
                <Plus className="size-3" /> Add Project
              </button>
            </div>

            {portfolio.length === 0 ? (
              <div className="p-8 border border-dashed border-slate-200 rounded-2xl text-center text-slate-500 text-xs">
                No portfolio items added yet. Click Add Project to showcase your work.
              </div>
            ) : (
              <div className="space-y-4">
                {portfolio.map((item, idx) => (
                  <div key={idx} className="group p-3 bg-slate-50/40 border border-slate-300 rounded-2xl flex items-center gap-3">
                    <img
                      src={item.image || defaultImg}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800 text-xs truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.description || 'No description'}</p>
                    </div>
                    
                    {/* Delete Item */}
                    <button
                      onClick={() => handleDeletePortfolioItem(idx)}
                      className="p-1 rounded-lg hover:bg-rose-500/10 text-slate-650 hover:text-rose-455 transition-colors shrink-0"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Add Portfolio Item Modal */}
      {showPortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm" onClick={() => setShowPortModal(false)}></div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <FolderPlus className="size-5 text-indigo-600" />
                Add Portfolio Project
              </h3>
              <button onClick={() => setShowPortModal(false)}>
                <X className="size-6 text-slate-500 hover:text-slate-800" />
              </button>
            </div>

            <form onSubmit={handleAddPortfolioItem} className="space-y-4">
              
              {/* Image Upload */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-300">
                <div className="relative group shrink-0">
                  <img
                    src={portPreview || defaultImg}
                    alt="Portfolio Cover"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-slate-50/70 opacity-0 group-hover:opacity-100 rounded-xl cursor-pointer transition-all">
                    <ImagePlus className="size-4 text-slate-700" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-600">Project Cover Image</h4>
                  <p className="text-[10px] text-slate-500">Max size: 5MB</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={portTitle}
                  onChange={(e) => setPortTitle(e.target.value)}
                  placeholder="E.g., Sustainable Styling Campaign"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Project Description</label>
                <textarea
                  rows={3}
                  value={portDesc}
                  onChange={(e) => setPortDesc(e.target.value)}
                  placeholder="Briefly describe the theme, products showcased, and engagement outcome..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">External Link (Optional)</label>
                <input
                  type="text"
                  value={portLink}
                  onChange={(e) => setPortLink(e.target.value)}
                  placeholder="www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-300">
                <button
                  type="button"
                  onClick={() => setShowPortModal(false)}
                  className="flex-1 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 rounded-xl text-slate-600 text-sm font-semibold tracking-wide transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingPort}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  {uploadingPort ? 'Saving...' : 'Add Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
