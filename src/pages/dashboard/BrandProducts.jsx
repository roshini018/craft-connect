import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, X, Loader2, ImagePlus, ExternalLink } from 'lucide-react';

export default function BrandProducts() {
  const [products, setProducts] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Form overlay states
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Field states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [purchaseLink, setPurchaseLink] = useState('');
  const [productFile, setProductFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  
  const [submitting, setSubmitting] = useState(false);

  const defaultImg = `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=300`;

  const fetchBrandAndProducts = async () => {
    try {
      setLoading(true);
      const brandsRes = await api.get('/brands');
      // Find brand profile owned by active user
      const myBrand = brandsRes.data.data.find(b => b.owner);
      if (myBrand) {
        setBrandId(myBrand._id);
        const prodRes = await api.get(`/products/brand/${myBrand._id}`);
        if (prodRes.data.success) {
          setProducts(prodRes.data.data);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandAndProducts();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setPurchaseLink('');
    setProductFile(null);
    setFilePreview('');
    setEditingProduct(null);
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setName(prod.name || '');
    setDescription(prod.description || '');
    setPrice(prod.price || '');
    setCategory(prod.category || '');
    setPurchaseLink(prod.purchaseLink || '');
    setFilePreview(prod.images?.[0] || '');
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandId) return alert('Please set up your Brand Profile first!');
    
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('purchaseLink', purchaseLink);
      if (productFile) {
        formData.append('image', productFile);
      }

      let res;
      if (editingProduct) {
        res = await api.put(`/products/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        fetchBrandAndProducts();
        setShowModal(false);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to submit product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data.success) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete product');
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
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">Product Showcase Manager</h1>
          <p className="text-slate-600 text-sm mt-1">Manage items exhibited on your public directory profile.</p>
        </div>
        
        {brandId ? (
          <Button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="size-5" />
            Add Product
          </Button>
        ) : (
          <span className="text-sm text-rose-600 font-semibold bg-rose-500/10 border border-rose-500/20 py-2 px-4 rounded-xl">
            Configure Brand Profile First
          </span>
        )}
      </div>

      {/* Grid listing */}
      {products.length === 0 ? (
        <div className="p-16 border border-dashed border-slate-200 rounded-3xl text-center text-slate-500 max-w-4xl">
          <p className="text-lg font-medium">No products registered.</p>
          <p className="text-sm mt-1">Showcase your best items to attract creators and customer orders.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div key={prod._id} className="group bg-white/30 border border-slate-200/80 rounded-3xl p-4 flex flex-col hover:border-slate-300 transition-all duration-300">
              <div className="relative">
                <img
                  src={prod.images?.[0] || defaultImg}
                  alt={prod.name}
                  className="w-full h-44 object-cover rounded-2xl border border-slate-300 bg-slate-50 mb-4"
                />
                
                {/* Float Actions */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(prod)}
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    <Edit className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-rose-450 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-semibold text-slate-800 truncate">{prod.name}</h4>
              <span className="inline-block self-start mt-1 px-2 py-0.2 rounded-full text-[9px] font-semibold bg-slate-50 text-slate-600 border border-slate-300 uppercase">
                {prod.category || 'General'}
              </span>
              <p className="text-slate-600 text-xs mt-2 leading-normal line-clamp-2 flex-1">{prod.description}</p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-300">
                <span className="font-bold text-sm text-slate-800">${prod.price}</span>
                {prod.purchaseLink && (
                  <a
                    href={prod.purchaseLink.startsWith('http') ? prod.purchaseLink : `https://${prod.purchaseLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-300 flex items-center gap-1 hover:underline"
                  >
                    Buy Link <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X className="size-6 text-slate-500 hover:text-slate-800" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Image */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-300">
                <div className="relative group shrink-0">
                  <img
                    src={filePreview || defaultImg}
                    alt="Product"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-slate-50/70 opacity-0 group-hover:opacity-100 rounded-xl cursor-pointer transition-all">
                    <ImagePlus className="size-4 text-slate-700" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-600">Product Photo</h4>
                  <p className="text-[10px] text-slate-500">Max size: 5MB</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Linen Cushion Cover"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Price (USD)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="45"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Home Decor"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details on sizing, washing instructions, and materials..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5 pl-1">Purchase / Shop Link</label>
                <input
                  type="text"
                  value={purchaseLink}
                  onChange={(e) => setPurchaseLink(e.target.value)}
                  placeholder="www.yourstore.com/product/linen-cover"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-300">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 rounded-xl text-slate-600 text-sm font-semibold tracking-wide transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
