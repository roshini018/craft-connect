import { Link } from 'react-router-dom';
import { MapPin, Globe, ArrowRight } from 'lucide-react';

export default function BrandCard({ brand }) {
  const defaultLogo = `https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200`;

  return (
    <div className="group relative flex flex-col bg-white/30 border border-slate-200/80 rounded-3xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      
      {/* Brand Header */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={brand.logo || defaultLogo}
          alt={brand.name}
          className="w-14 h-14 rounded-2xl object-cover border border-slate-200/80 bg-slate-50 shrink-0"
        />
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {brand.name}
          </h3>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 uppercase tracking-wide">
            {brand.industry}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
        {brand.description}
      </p>

      {/* Details Footer */}
      <div className="flex flex-col gap-2.5 mb-6 pt-4 border-t border-slate-200/50 text-xs text-slate-500">
        {brand.location && (
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-slate-600" />
            <span className="truncate">{brand.location}</span>
          </div>
        )}
        {brand.website && (
          <div className="flex items-center gap-2">
            <Globe className="size-4 shrink-0 text-slate-600" />
            <span className="truncate">{brand.website}</span>
          </div>
        )}
      </div>

      {/* Link to Detail Page */}
      <Link 
        to={`/brands/${brand._id}`}
        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50/60 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-slate-800 text-sm font-semibold tracking-wide transition-all"
      >
        View Profile
        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
