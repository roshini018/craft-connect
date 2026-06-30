import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from '@/components/ui/button';
import { Sparkles, Globe, MapPin, User, Loader2, ImagePlus, Camera, Play } from 'lucide-react';

export default function BrandProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ success: null, text: '' });

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('Textiles');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [youtube, setYoutube] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  const loadBrandProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/brands');
      // Find current user's brand
      const myBrand = res.data.data.find(b => b.owner); // backend filter or client filter
      if (myBrand) {
        setName(myBrand.name || '');
        setDescription(myBrand.description || '');
        setIndustry(myBrand.industry || 'Textiles');
        setLocation(myBrand.location || '');
        setWebsite(myBrand.website || '');
        setInstagram(myBrand.socialLinks?.instagram || '');
        setTiktok(myBrand.socialLinks?.tiktok || '');
        setYoutube(myBrand.socialLinks?.youtube || '');
        setAiKeywords(myBrand.aiKeywords?.join(', ') || '');
        setLogoPreview(myBrand.logo || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrandProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ success: null, text: '' });

    try {
      // Use FormData to support file upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('industry', industry);
      formData.append('location', location);
      formData.append('website', website);
      formData.append('instagram', instagram);
      formData.append('tiktok', tiktok);
      formData.append('youtube', youtube);
      formData.append('aiKeywords', aiKeywords);
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const res = await api.post('/brands', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setMsg({ success: true, text: res.data.message });
        if (res.data.data?.logo) {
          setLogoPreview(res.data.data.logo);
        }
      }
    } catch (err) {
      console.error(err);
      setMsg({ success: false, text: err.response?.data?.error || 'Failed to update brand profile' });
    } finally {
      setSubmitting(false);
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
    <div className="max-w-3xl space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">Brand Profile Settings</h1>
        <p className="text-slate-600 text-sm mt-1">Configure your public storefront directory settings and social feeds.</p>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-2xl border text-sm ${
          msg.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Editor Box */}
      <div className="bg-white/20 border border-slate-200/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Logo Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-300">
            <div className="relative group shrink-0">
              <img
                src={logoPreview || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200'}
                alt="Brand Logo"
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200 bg-slate-50"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-slate-50/70 opacity-0 group-hover:opacity-100 rounded-2xl cursor-pointer transition-all">
                <ImagePlus className="size-5 text-slate-800" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold text-slate-800">Brand Logo / Artwork</h4>
              <p className="text-xs text-slate-500 mt-1">Accepts PNG, JPG, GIF. Max file size 5MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Brand Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Earthy Textiles"
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Industry Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Industry Category</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="Textiles">Textiles</option>
                <option value="Ceramics">Ceramics</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Fashion">Fashion</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Art & Prints">Art & Prints</option>
                <option value="Gourmet Foods">Gourmet Foods</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Physical Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="E.g., Portland, OR"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="E.g., www.earthytextiles.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 pl-1">Brand Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell creators and customers about your story, materials, and product quality..."
              className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm resize-none"
            />
          </div>

          {/* AI Matching Keywords */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 pl-1">AI Recommendation Tags (Comma Separated)</label>
            <span className="block text-[10px] text-slate-500 mb-2 pl-1">These tags help our matcher similarity scores align with the correct creator niches.</span>
            <input
              type="text"
              value={aiKeywords}
              onChange={(e) => setAiKeywords(e.target.value)}
              placeholder="organic linen, home decoration, earth tones, sustainability, minimalist"
              className="w-full px-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Social Feeds */}
          <div className="pt-6 border-t border-slate-300 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Social Connections</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1.5 pl-1">Instagram Link</label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1.5 pl-1">TikTok Link</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">♬</span>
                  <input
                    type="text"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    placeholder="https://tiktok.com/@..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1.5 pl-1">YouTube Link</label>
                <div className="relative">
                  <Play className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
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
            {submitting ? 'Saving settings...' : 'Save Settings'}
          </Button>

        </form>

      </div>

    </div>
  );
}
