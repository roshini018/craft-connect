import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  MapPin, 
  ExternalLink, 
  ArrowLeft,
  Mail, 
  Sparkles,
  Loader2,
  ShieldCheck,
  Camera,
  Play,
  Quote,
  Star,
  PlayCircle
} from 'lucide-react';

export default function BrandProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Collab request states
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [compensation, setCompensation] = useState('Gifting');
  const [requestSending, setRequestSending] = useState(false);
  const [requestStatus, setRequestStatus] = useState({ success: null, msg: '' });

  const defaultLogo = `https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200`;
  const defaultProductImg = `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=300`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const brandRes = await api.get(`/brands/${id}`);
      if (brandRes.data.success) {
        setBrand(brandRes.data.data);
      }
      
      const productsRes = await api.get(`/products/brand/${id}`);
      if (productsRes.data.success) {
        setProducts(productsRes.data.data);
      }
    } catch (error) {
      console.error('Failed to load profile details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSendProposal = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      setRequestSending(true);
      setRequestStatus({ success: null, msg: '' });
      
      const res = await api.post('/collaborations', {
        targetId: brand._id,
        message,
        proposedCompensation: compensation
      });

      if (res.data.success) {
        setRequestStatus({ success: true, msg: 'Collaboration request sent successfully!' });
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
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-600 bg-slate-50 min-h-screen">
        <Loader2 className="size-8 animate-spin text-primary mb-4" />
        <p className="text-sm tracking-widest uppercase font-semibold text-slate-500">Loading Artisan Profile...</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-slate-50 min-h-screen">
        <p className="text-slate-500 text-lg font-medium">Brand profile not found.</p>
        <Link to="/brands" className="text-primary font-semibold text-sm mt-4 flex items-center gap-1 hover:underline">
          <ArrowLeft className="size-4" /> Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#FAFAFA] relative w-full min-h-screen">
      
      {/* Editorial Hero Banner */}
      <div className="relative w-full h-[450px] lg:h-[550px] bg-slate-900 overflow-hidden">
        {/* Blurred Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-105"
          style={{ backgroundImage: `url(${products[0]?.images?.[0] || defaultProductImg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/brands" 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="size-5" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 z-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="flex items-end gap-6 max-w-3xl">
            <img
              src={brand.logo || defaultLogo}
              alt={brand.name}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover border-4 border-white shadow-2xl bg-white"
            />
            <div className="pb-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white uppercase tracking-widest backdrop-blur-md">
                  {brand.industry}
                </span>
                {brand.isVerified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#E5B25D] uppercase tracking-widest">
                    <ShieldCheck className="size-3.5" /> Verified Brand
                  </span>
                )}
              </div>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                {brand.name}
              </h1>
            </div>
          </div>

          <div className="flex gap-4 pb-2 w-full md:w-auto">
            {user?.role === 'creator' ? (
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto rounded-full px-8 py-6 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="size-4" />
                Propose Collaboration
              </Button>
            ) : !user ? (
              <Button 
                asChild
                className="w-full md:w-auto rounded-full px-8 py-6 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm"
              >
                <Link to="/login">Sign in to Collaborate</Link>
              </Button>
            ) : user.id === brand.owner?._id ? (
              <Button 
                asChild
                variant="outline"
                className="w-full md:w-auto rounded-full px-8 py-6 bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link to="/dashboard/brand/profile">Edit Profile</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Story & Info */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* AI Trust Score */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Trust Indicator</h3>
            
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={`${brand.aiTrustScore * 2.26} 226`} className="text-emerald-500" strokeLinecap="round" />
                </svg>
                <span className="absolute font-heading text-xl font-bold text-slate-900">{brand.aiTrustScore}%</span>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Highly Rated</p>
                <p className="text-xs text-slate-500 mt-1">AI Verified Maker</p>
                <div className="flex text-emerald-500 mt-2 gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="size-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">At a Glance</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              {brand.location && (
                <li className="flex items-center gap-3">
                  <MapPin className="size-5 text-slate-400" />
                  <span>Based in <span className="font-semibold text-slate-800">{brand.location}</span></span>
                </li>
              )}
              {brand.website && (
                <li className="flex items-center gap-3">
                  <Globe className="size-5 text-slate-400" />
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">
                    {brand.website}
                  </a>
                </li>
              )}
              {brand.owner?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-slate-400" />
                  <a href={`mailto:${brand.owner.email}`} className="hover:text-primary transition-colors hover:underline">
                    {brand.owner.email}
                  </a>
                </li>
              )}
            </ul>

            {/* Socials */}
            <div className="flex gap-3 mt-8">
              {brand.socialLinks?.instagram && (
                <a href={brand.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                  <Camera className="size-4.5" />
                </a>
              )}
              {brand.socialLinks?.youtube && (
                <a href={brand.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors">
                  <Play className="size-4.5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Story, Products, Collabs */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Brand Story blockquote */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-8">Our Philosophy</h2>
            <div className="relative bg-[#F5EFE6] rounded-3xl p-8 md:p-12">
              <Quote className="absolute top-6 left-6 size-12 text-[#E6D5B8] opacity-50" />
              <p className="relative z-10 text-lg md:text-xl leading-relaxed text-slate-800 font-serif italic">
                "{brand.story || brand.description}"
              </p>
            </div>
          </div>

          {/* Product Gallery */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-slate-900">Featured Collection</h2>
                <p className="text-sm text-slate-500 mt-2">Pieces ready for styling and promotion</p>
              </div>
              <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-3 py-1 rounded-full">{products.length} Items</span>
            </div>

            {products.length === 0 ? (
              <div className="p-12 border border-dashed border-slate-300 rounded-3xl text-center text-slate-500">
                No products showcased yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((prod) => (
                  <div key={prod._id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={prod.images?.[0] || defaultProductImg}
                        alt={prod.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        {prod.purchaseLink && (
                          <a
                            href={prod.purchaseLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-colors"
                          >
                            View Store <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">{prod.name}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{prod.description}</p>
                      <div className="mt-6 font-semibold text-lg text-primary">${prod.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collaborations Showcase */}
          {brand.collaborations && brand.collaborations.length > 0 && (
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-8">Creator Collaborations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {brand.collaborations.map((collab, idx) => (
                  <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm group">
                    <div className="relative h-48">
                      <img src={collab.image} alt={collab.creatorName} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="size-12 text-white/80" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                          {collab.platform}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                          <img src={collab.image} alt={collab.creatorName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{collab.creatorName}</p>
                          <p className="text-xs text-slate-500">Creator Partner</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reach</p>
                          <p className="font-semibold text-slate-800 text-sm">{collab.reach}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Engagement</p>
                          <p className="font-semibold text-emerald-600 text-sm">{collab.engagement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Collaboration Pitch Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="size-6 text-primary" />
              Propose Collab
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              Pitch yourself to {brand.name}. Share how you plan to showcase their products to your audience.
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

            <form onSubmit={handleSendProposal} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Compensation</label>
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
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Your Pitch</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey! I love your products and would love to review them..."
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
                  {requestSending ? 'Sending...' : 'Send Pitch'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
