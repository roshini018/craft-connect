import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Target,
  Users,
  Briefcase,
  TrendingUp,
  Heart,
  MessageCircle,
  ThumbsDown,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AiMatching() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actionMessage, setActionMessage] = useState('');

  const defaultAvatar = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300`;

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await api.get('/collaborations/recommendations');
      if (res.data.success) {
        setRecommendations(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleAction = (type, targetId) => {
    // Show a temporary message
    if (type === 'pass') {
      setActionMessage('Passed');
    } else {
      setActionMessage('Saved for later');
    }

    setTimeout(() => {
      setActionMessage('');
      if (currentIndex < recommendations.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Run out of matches
        setRecommendations([]);
      }
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-slate-600 bg-[#FAFAFA]">
        <Loader2 className="size-10 animate-spin text-primary mb-6" />
        <p className="text-sm tracking-widest uppercase font-bold text-slate-500 animate-pulse">Running AI Match Engine...</p>
      </div>
    );
  }

  if (recommendations.length === 0 || currentIndex >= recommendations.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-center bg-[#FAFAFA] px-6">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-6 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
          <Sparkles className="size-10 text-primary relative z-10" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">You're all caught up!</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-8">We've shown you all the top matches for today based on your current profile and aesthetic alignment.</p>
        <Button onClick={fetchMatches} className="rounded-full px-8 py-6 bg-slate-900 text-white hover:bg-slate-800 shadow-xl">
          Refresh Matches
        </Button>
      </div>
    );
  }

  const currentMatch = recommendations[currentIndex];
  const isBrand = user?.role === 'brand_owner';
  
  // Resolve data based on user role
  const targetEntity = isBrand ? currentMatch.creator : currentMatch.brand;
  const targetName = targetEntity?.name;
  const targetImage = targetEntity?.user?.profileImage || targetEntity?.logo || defaultAvatar;
  const targetSubtitle = isBrand ? targetEntity?.niche?.join(' • ') : targetEntity?.industry;
  const targetLink = isBrand ? `/creators/${targetEntity?._id}` : `/brands/${targetEntity?._id}`;
  const targetDesc = isBrand ? targetEntity?.bio : targetEntity?.description;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Sparkles className="size-5 text-primary" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">AI Match</h1>
          </div>
          <p className="text-slate-600 text-sm max-w-xl">Curated partnership opportunities based on audience overlap, aesthetic alignment, and brand values.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Match Score</p>
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <TrendingUp className="size-5 text-emerald-600" />
            <span className="font-heading text-2xl font-bold text-emerald-700">{currentMatch.score}%</span>
          </div>
        </div>
      </div>

      <div className="relative">
        
        {/* Action Overlay Message */}
        {actionMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-[2.5rem]">
            <div className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl animate-in zoom-in duration-300">
              {actionMessage}
            </div>
          </div>
        )}

        {/* Premium Match Card */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/60 transition-transform duration-500">
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Image & Quick Details */}
            <div className="relative h-72 md:h-full bg-slate-100">
              <img 
                src={targetImage} 
                alt={targetName} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
                    {currentMatch.suggestedCampaign}
                  </span>
                </div>
                <h2 className="font-heading text-4xl font-bold mb-1 tracking-tight">{targetName}</h2>
                <p className="text-white/80 font-medium text-sm tracking-wide capitalize">{targetSubtitle}</p>
              </div>
            </div>

            {/* Right: Insights & Stats */}
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">About</h3>
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
                    {targetDesc}
                  </p>
                </div>

                {/* Score Breakdown (CSS Bars) */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Why it's a match</h3>
                  
                  <div className="space-y-4">
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5"><Users className="size-3 text-primary" /> Audience Overlap</span>
                        <span className="font-bold text-slate-900">{currentMatch.overlap}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${currentMatch.overlap}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5"><Target className="size-3 text-amber-500" /> Aesthetic Alignment</span>
                        <span className="font-bold text-slate-900">92%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all duration-1000 delay-100" style={{ width: `92%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5"><Briefcase className="size-3 text-emerald-500" /> Value Synergy</span>
                        <span className="font-bold text-slate-900">88%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000 delay-200" style={{ width: `88%` }}></div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
                  <Info className="size-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    Strong synergy detected in <span className="font-bold">{currentMatch.matchedTags?.join(' and ')}</span> content. Perfect fit for a <span className="font-bold">{currentMatch.suggestedCampaign}</span>.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-10">
                <Button 
                  onClick={() => handleAction('pass', targetEntity?._id)}
                  variant="outline"
                  className="flex-1 py-7 rounded-2xl border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 shadow-sm"
                >
                  <ThumbsDown className="size-5 mr-2" /> Pass
                </Button>
                <Button 
                  asChild
                  className="flex-1 py-7 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl"
                >
                  <Link to={targetLink}>
                    View Profile <ExternalLink className="size-4 ml-2" />
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Stack Effect Visuals */}
        {currentIndex < recommendations.length - 1 && (
          <>
            <div className="absolute top-0 w-full h-full bg-white/50 rounded-[2.5rem] border border-slate-200/50 shadow-sm -z-10 translate-y-4 scale-[0.98]"></div>
            <div className="absolute top-0 w-full h-full bg-white/30 rounded-[2.5rem] border border-slate-200/30 shadow-sm -z-20 translate-y-8 scale-[0.96]"></div>
          </>
        )}

      </div>
    </div>
  );
}
