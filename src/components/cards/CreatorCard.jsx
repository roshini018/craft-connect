import { Link } from 'react-router-dom';
import { ArrowRight, Users, BarChart } from 'lucide-react';

export default function CreatorCard({ creator }) {
  const defaultAvatar = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`;

  const formatFollowers = (count) => {
    if (!count) return '0';
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count.toString();
  };

  return (
    <div className="group relative flex flex-col bg-white/30 border border-slate-200/80 rounded-3xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      
      {/* Creator Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={creator.user?.profileImage || defaultAvatar}
          alt={creator.name}
          className="w-14 h-14 rounded-full object-cover border border-slate-200/80 bg-slate-50 shrink-0"
        />
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {creator.name}
          </h3>
          {/* Niches List */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {creator.niche?.slice(0, 2).map((n, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/20 capitalize"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
        {creator.bio || 'CraftConnect artisan partner ready for exciting collaboration proposals.'}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-slate-50/40 rounded-2xl border border-slate-300 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-indigo-600 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Followers</p>
            <p className="font-bold text-slate-700">{formatFollowers(creator.socialMetrics?.followers)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart className="size-4 text-purple-600 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">Engagement</p>
            <p className="font-bold text-slate-700">{creator.socialMetrics?.engagementRate}%</p>
          </div>
        </div>
      </div>

      {/* View Profile CTA */}
      <Link 
        to={`/creators/${creator._id}`}
        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50/60 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-2xl text-slate-800 text-sm font-semibold tracking-wide transition-all"
      >
        View Portfolio
        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
