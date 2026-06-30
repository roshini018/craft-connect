import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, UploadCloud, User as UserIcon, AlignLeft, Camera, Play, Sparkles, Image as ImageIcon, ArrowRight, Tag, Users, BarChart3, Link as LinkIcon } from 'lucide-react';
import api from '../services/api';

const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'Pinterest'];
const CATEGORIES = ['Handmade', 'Eco-friendly', 'Fashion', 'Home Decor', 'Ceramics', 'Lifestyle', 'Artistic', 'Photography'];

export default function CreatorOnboarding() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: '',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    platforms: [],
    followers: '',
    engagementRate: '',
    portfolio: [{ title: '', link: '', image: '' }],
    niche: []
  });

  const handleNext = () => setStep(s => Math.min(6, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const togglePlatform = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform) 
        ? prev.platforms.filter(p => p !== platform) 
        : [...prev.platforms, platform]
    }));
  };

  const toggleCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      niche: prev.niche.includes(category) 
        ? prev.niche.filter(c => c !== category) 
        : [...prev.niche, category]
    }));
  };

  const addPortfolio = () => {
    setFormData(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, { title: '', link: '', image: '' }]
    }));
  };

  const updatePortfolio = (index, field, value) => {
    const newPortfolio = [...formData.portfolio];
    newPortfolio[index][field] = value;
    setFormData(prev => ({ ...prev, portfolio: newPortfolio }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await api.put('/creators/profile', {
        name: formData.name,
        bio: formData.bio,
        user: {
          profileImage: formData.profileImage
        },
        platforms: formData.platforms,
        socialMetrics: {
          followers: Number(formData.followers) || 0,
          engagementRate: Number(formData.engagementRate) || 0
        },
        portfolio: formData.portfolio.filter(p => p.title),
        niche: formData.niche
      });
      navigate('/dashboard/creator');
    } catch (error) {
      console.error('Failed to complete onboarding', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 -ml-32 -mt-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -mr-32 -mb-32 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto">
        
        {/* Header & Progress */}
        <div className="mb-10 text-center relative z-10">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-6">Build your Creator Profile</h1>
          
          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 sm:w-10 h-1 rounded-full transition-all duration-500 ${step >= num ? 'bg-primary' : 'bg-slate-200'}`}></div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-3 font-medium uppercase tracking-widest">
            Step {step} of 6
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 shadow-xl relative z-10 min-h-[450px] flex flex-col justify-between">
          
          <div className="flex-1">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Personal Information</h2>
                  <p className="text-slate-500 text-sm">Introduce yourself to brands.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col items-center justify-start shrink-0">
                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100 mb-4 relative group cursor-pointer">
                      <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <UploadCloud className="text-white size-6" />
                      </div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Image URL"
                      value={formData.profileImage}
                      onChange={e => setFormData({...formData, profileImage: e.target.value})}
                      className="w-full text-xs px-2 py-1.5 bg-white border border-slate-200 rounded text-center focus:border-primary outline-none"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Display Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Creator Bio</label>
                      <div className="relative">
                        <AlignLeft className="absolute left-4 top-4 size-4.5 text-slate-400" />
                        <textarea 
                          value={formData.bio}
                          onChange={e => setFormData({...formData, bio: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[100px]"
                          placeholder="Tell us about your style and audience..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Platforms */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Select Your Platforms</h2>
                  <p className="text-slate-500 text-sm">Where do you post your content?</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {PLATFORMS.map(platform => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        formData.platforms.includes(platform)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                      }`}
                    >
                      {platform === 'Instagram' && <Camera className="size-5" />}
                      {platform === 'YouTube' && <Play className="size-5" />}
                      {(platform === 'TikTok' || platform === 'Pinterest') && <div className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-800">{platform[0]}</div>}
                      <span className="font-semibold text-sm">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Followers */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Audience Metrics</h2>
                  <p className="text-slate-500 text-sm">Brands use this to find the right size audience for their campaign.</p>
                </div>
                
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Total Followers (Combined)</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="number" 
                        value={formData.followers}
                        onChange={e => setFormData({...formData, followers: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="e.g. 15000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Average Engagement Rate (%)</label>
                    <div className="relative">
                      <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="number" 
                        step="0.1"
                        value={formData.engagementRate}
                        onChange={e => setFormData({...formData, engagementRate: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="e.g. 4.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Portfolio */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Past Work Portfolio</h2>
                  <p className="text-slate-500 text-sm">Link 1-2 examples of your best content or previous collaborations.</p>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {formData.portfolio.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Project Title (e.g. Pottery Studio Tour)"
                          value={item.title}
                          onChange={e => updatePortfolio(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative col-span-2 sm:col-span-1">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Post URL"
                            value={item.link}
                            onChange={e => updatePortfolio(idx, 'link', e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary outline-none"
                          />
                        </div>
                        <div className="relative col-span-2 sm:col-span-1">
                          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Preview Image URL"
                            value={item.image}
                            onChange={e => updatePortfolio(idx, 'image', e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={addPortfolio}
                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    + Add Another Link
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Categories */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Your Niche</h2>
                  <p className="text-slate-500 text-sm">Select tags that describe your style and interests.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2 ${
                        formData.niche.includes(cat)
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Tag className="size-3.5" />
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Finish */}
            {step === 6 && (
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[250px]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Welcome to CraftConnect</h2>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Your creator profile is ready! You can now start browsing brands, accepting collab requests, and pitching your ideas.
                </p>
              </div>
            )}

          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={handlePrev}
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Back
              </Button>
            ) : <div></div>}

            {step < 6 ? (
              <Button 
                onClick={handleNext}
                className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 px-8"
              >
                Next Step <ChevronRight className="ml-2 size-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleFinish}
                disabled={loading}
                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold shadow-lg shadow-primary/20"
              >
                {loading ? 'Completing...' : 'Go to Dashboard'} <ArrowRight className="ml-2 size-4" />
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
