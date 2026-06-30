import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { 
  Bell, 
  Loader2, 
  MessageSquare, 
  Handshake, 
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] text-slate-600 bg-[#FAFAFA]">
        <Loader2 className="size-10 animate-spin text-primary mb-6" />
        <p className="text-sm tracking-widest uppercase font-bold text-slate-500">Loading Notifications...</p>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="size-5 text-indigo-500" />;
      case 'collab':
        return <Handshake className="size-5 text-emerald-500" />;
      case 'request':
        return <Sparkles className="size-5 text-amber-500" />;
      default:
        return <Bell className="size-5 text-slate-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'message':
        return 'bg-indigo-50 border-indigo-100';
      case 'collab':
        return 'bg-emerald-50 border-emerald-100';
      case 'request':
        return 'bg-amber-50 border-amber-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Bell className="size-5 text-primary" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          </div>
          <p className="text-slate-600 text-sm">Stay updated on messages, pitches, and AI recommendations.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1"
        >
          <CheckCircle2 className="size-3" /> Mark all read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-300 rounded-3xl text-slate-500">
            <Bell className="size-10 text-slate-300 mx-auto mb-4" />
            <p className="text-sm font-medium">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif._id} 
              className={`p-5 rounded-2xl border transition-all ${
                notif.read ? 'bg-white border-slate-200/60 shadow-sm' : 'bg-white border-primary shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border shrink-0 ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <p className={`text-sm ${notif.read ? 'text-slate-600 font-medium' : 'text-slate-900 font-bold'}`}>
                      {notif.text}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
                      <Clock className="size-3" />
                      {new Date(notif.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  {notif.type === 'message' && (
                    <Link to="/dashboard/messages" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline mt-2 inline-block">
                      View Message &rarr;
                    </Link>
                  )}
                  {notif.type === 'collab' && (
                    <Link to="/dashboard/campaigns" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline mt-2 inline-block">
                      View Campaign &rarr;
                    </Link>
                  )}
                  {notif.type === 'request' && (
                    <Link to="/dashboard/campaigns" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline mt-2 inline-block">
                      Review Pitch &rarr;
                    </Link>
                  )}
                </div>
                {!notif.read && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
