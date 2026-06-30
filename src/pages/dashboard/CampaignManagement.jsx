import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { 
  FolderKanban, 
  Loader2, 
  MoreHorizontal,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function CampaignManagement() {
  const { user } = useAuth();
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultAvatar = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`;

  const fetchCollabs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/collaborations/requests');
      if (res.data.success) {
        setCollabs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabs();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await api.put(`/collaborations/${id}`, { status: newStatus });
      if (res.data.success) {
        setCollabs(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-slate-600 bg-[#FAFAFA]">
        <Loader2 className="size-10 animate-spin text-primary mb-6" />
        <p className="text-sm tracking-widest uppercase font-bold text-slate-500">Loading Workspace...</p>
      </div>
    );
  }

  // Filter columns
  const pending = collabs.filter(c => c.status === 'pending');
  const active = collabs.filter(c => c.status === 'accepted');
  const completed = collabs.filter(c => c.status === 'completed' || c.status === 'rejected');

  const isBrand = user?.role === 'brand_owner';

  const CollabCard = ({ collab }) => {
    const targetEntity = isBrand ? collab.creator : collab.brand;
    const targetName = targetEntity?.name;
    const targetImage = targetEntity?.user?.profileImage || targetEntity?.logo || defaultAvatar;
    const targetSubtitle = isBrand ? targetEntity?.niche?.join(', ') : targetEntity?.industry;

    return (
      <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={targetImage} alt={targetName} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm truncate max-w-[140px]">{targetName}</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{targetSubtitle}</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {collab.message}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-widest">
            {collab.proposedCompensation}
          </span>
          
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {collab.status === 'pending' && collab.sender !== user?._id && (
              <>
                <button 
                  onClick={() => handleUpdateStatus(collab._id, 'accepted')}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  <CheckCircle2 className="size-3.5" />
                </button>
              </>
            )}
            {collab.status === 'accepted' && (
              <button 
                onClick={() => handleUpdateStatus(collab._id, 'completed')}
                className="text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                Complete <ArrowRight className="size-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <FolderKanban className="size-5 text-primary" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Campaigns</h1>
        </div>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">Manage your ongoing partnerships, review pitches, and track deliverables from a single workspace.</p>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
        
        {/* Column 1: Pending */}
        <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-200/50 flex flex-col h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-amber-500" />
              <h3 className="font-heading text-lg font-bold text-slate-900">Pending Pitches</h3>
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {pending.length === 0 ? (
              <div className="text-center p-8 text-slate-400 text-xs font-medium border border-dashed border-slate-300 rounded-2xl">
                No pending requests.
              </div>
            ) : (
              pending.map(c => <CollabCard key={c._id} collab={c} />)
            )}
          </div>
        </div>

        {/* Column 2: Active */}
        <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-200/50 flex flex-col h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-indigo-500" />
              <h3 className="font-heading text-lg font-bold text-slate-900">Active Campaigns</h3>
            </div>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">{active.length}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {active.length === 0 ? (
              <div className="text-center p-8 text-slate-400 text-xs font-medium border border-dashed border-slate-300 rounded-2xl">
                No active campaigns.
              </div>
            ) : (
              active.map(c => <CollabCard key={c._id} collab={c} />)
            )}
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-200/50 flex flex-col h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <h3 className="font-heading text-lg font-bold text-slate-900">Completed</h3>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">{completed.length}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {completed.length === 0 ? (
              <div className="text-center p-8 text-slate-400 text-xs font-medium border border-dashed border-slate-300 rounded-2xl">
                No completed items.
              </div>
            ) : (
              completed.map(c => <CollabCard key={c._id} collab={c} />)
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
