import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  Compass, 
  Loader2, 
  Search,
  ShoppingBag,
  ExternalLink,
  Star,
  ArrowRight,
  Sparkles,
  Filter
} from 'lucide-react';

export default function CustomerDiscovery() {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ceramics', 'Fashion', 'Gourmet Foods', 'Home Decor'];

  const fetchData = async () => {
    try {
      setLoading(true);
      const [brandsRes] = await Promise.all([
        api.get('/brands', { params: { search: searchQuery, industry: selectedCategory } })
      ]);

      if (brandsRes.data.success) {
        setBrands(brandsRes.data.data);
        
        // Fetch all products across brands
        const allProducts = [];
        for (const brand of brandsRes.data.data) {
          const prodRes = await api.get(`/products/brand/${brand._id}`);
          if (prodRes.data.success) {
            allProducts.push(...prodRes.data.data.map(p => ({ ...p, brandName: brand.name, brandLogo: brand.logo })));
          }
        }
        setProducts(allProducts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-slate-600 bg-[#FAFAFA]">
        <Loader2 className="size-10 animate-spin text-primary mb-6" />
        <p className="text-sm tracking-widest uppercase font-bold text-slate-500 animate-pulse">Curating Your Feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
            <Compass className="size-3.5" />
            Customer Discovery
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">
            Discover Handcrafted<br />with Intention
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base mb-10">
            Explore verified artisan brands, browse curated products, and shop directly from the makers who care about craft, quality, and sustainability.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands, products, or categories..."
              className="w-full pl-14 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors shadow-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

        {/* Category Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="size-4 text-slate-400" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Brands Section */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Verified Artisan Brands</h2>
              <p className="text-slate-600 text-sm mt-1">Curated brands committed to authentic craftsmanship.</p>
            </div>
            <Link to="/brands" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map(brand => (
              <Link 
                key={brand._id}
                to={`/brands/${brand._id}`}
                className="group bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  {brand.isVerified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Star className="size-2.5 fill-emerald-500 text-emerald-500" /> Verified
                    </div>
                  )}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">{brand.industry}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{brand.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{brand.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{brand.location}</span>
                    <ExternalLink className="size-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Shop Curated Products</h2>
              <p className="text-slate-600 text-sm mt-1">Handpicked items from our artisan community.</p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-300 rounded-3xl text-slate-500">
              <ShoppingBag className="size-10 text-slate-300 mx-auto mb-4" />
              <p className="text-sm font-medium">No products found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div 
                  key={product._id}
                  className="group bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    <img 
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                      ${product.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">{product.brandName}</p>
                    <h3 className="font-heading font-bold text-slate-900 mb-1.5">{product.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>
                    <a 
                      href={product.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
                    >
                      <ShoppingBag className="size-3.5" /> Shop Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Recommendations CTA */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-10 md:p-14 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 border border-primary/20">
            <Sparkles className="size-7" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Want Personalized Picks?
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm">
            Create a free account and our AI will curate product recommendations based on your taste, values, and browsing history.
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors shadow-xl"
          >
            Get Started — It's Free <ArrowRight className="size-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
