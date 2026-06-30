import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Check, ChevronRight, UploadCloud, MapPin, Store, Camera, Globe, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function BrandOnboarding() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    industry: 'Ceramics',
    story: '',
    location: '',
    logo: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200', // Default placeholder
    website: '',
    instagram: '',
    youtube: '',
  });

  const [products, setProducts] = useState([
    { name: '', price: '', description: '', image: '' }
  ]);

  const handleNext = () => setStep(s => Math.min(5, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const addProduct = () => {
    setProducts([...products, { name: '', price: '', description: '', image: '' }]);
  };

  const updateProduct = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Update brand profile
      await api.put('/brands/profile', {
        name: formData.name,
        industry: formData.industry,
        story: formData.story,
        location: formData.location,
        logo: formData.logo,
        website: formData.website,
        socialLinks: {
          instagram: formData.instagram,
          youtube: formData.youtube
        }
      });

      // Add products
      for (const product of products) {
        if (product.name && product.price) {
          await api.post('/products', {
            name: product.name,
            price: Number(product.price),
            description: product.description,
            images: [product.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300']
          });
        }
      }

      navigate('/dashboard/brand');
    } catch (error) {
      console.error('Failed to complete onboarding', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto">
        
        {/* Header & Progress */}
        <div className="mb-10 text-center relative z-10">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-6">Set up your Brand Profile</h1>
          
          {/* Stepper Progress */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-1 rounded-full transition-all duration-500 ${step >= num ? 'bg-primary' : 'bg-slate-200'}`}></div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-3 font-medium uppercase tracking-widest">
            Step {step} of 5
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 shadow-xl relative z-10 min-h-[400px] flex flex-col justify-between">
          
          <div className="flex-1">
            {/* Step 1: Brand Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Brand Details</h2>
                  <p className="text-slate-500 text-sm">Tell creators about your craft and business.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Brand Name</label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your Brand Name"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Industry</label>
                    <select 
                      value={formData.industry}
                      onChange={e => setFormData({...formData, industry: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                    >
                      <option>Ceramics</option>
                      <option>Fashion</option>
                      <option>Home Decor</option>
                      <option>Gourmet Foods</option>
                      <option>Jewelry</option>
                      <option>Art & Prints</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="e.g. Portland, OR"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Brand Story</label>
                    <textarea 
                      value={formData.story}
                      onChange={e => setFormData({...formData, story: e.target.value})}
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[100px] resize-y"
                      placeholder="Share the inspiration behind your craft..."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Logo */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8 text-center">
                  <h2 className="text-xl font-semibold text-slate-800">Upload your Logo</h2>
                  <p className="text-slate-500 text-sm">A premium visual identity helps attract top creators.</p>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 mb-6 relative group cursor-pointer">
                    <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud className="text-white size-8" />
                    </div>
                  </div>
                  
                  <div className="w-full max-w-sm">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 text-center">Image URL (Mock Upload)</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={formData.logo}
                        onChange={e => setFormData({...formData, logo: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-center focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Products */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Add Starting Products</h2>
                  <p className="text-slate-500 text-sm">Upload 1-2 products to showcase your style to creators.</p>
                </div>

                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {products.map((product, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <input 
                            type="text" 
                            placeholder="Product Name"
                            value={product.name}
                            onChange={e => updateProduct(idx, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary outline-none"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                          <input 
                            type="number" 
                            placeholder="Price"
                            value={product.price}
                            onChange={e => updateProduct(idx, 'price', e.target.value)}
                            className="w-full pl-7 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <input 
                            type="text" 
                            placeholder="Product Image URL (Optional)"
                            value={product.image}
                            onChange={e => updateProduct(idx, 'image', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={addProduct}
                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    + Add Another Product
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Socials */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-800">Online Presence</h2>
                  <p className="text-slate-500 text-sm">Where can creators find your brand online?</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={formData.website}
                        onChange={e => setFormData({...formData, website: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="https://yourbrand.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Instagram Profile</label>
                    <div className="relative">
                      <Camera className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={formData.instagram}
                        onChange={e => setFormData({...formData, instagram: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="https://instagram.com/yourbrand"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Finish */}
            {step === 5 && (
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[250px]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">You're ready to grow!</h2>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Your profile looks amazing. You can now start matching with creators and launching campaigns on your dashboard.
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

            {step < 5 ? (
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
