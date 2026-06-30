import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  LogOut,
  Save,
  Camera,
  Globe,
  Moon,
  Palette,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  ChevronRight,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    website: '',
    location: ''
  });

  const [notifSettings, setNotifSettings] = useState({
    emailCollabs: true,
    emailMessages: true,
    emailMarketing: false,
    pushCollabs: true,
    pushMessages: true,
    pushRecommendations: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showMetrics: true,
    allowDiscovery: true
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'account', label: 'Account', icon: SettingsIcon }
  ];

  const Toggle = ({ checked, onChange }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-slate-200'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <SettingsIcon className="size-5 text-primary" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Settings</h1>
          </div>
          <p className="text-slate-600 text-sm">Manage your account preferences and profile information.</p>
        </div>
        <Button 
          onClick={handleSave}
          className="rounded-full px-6 py-5 bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
        >
          {saved ? (
            <><Save className="size-4 mr-2" /> Saved!</>
          ) : (
            <><Save className="size-4 mr-2" /> Save Changes</>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors border-b border-slate-100 last:border-0 ${
                    activeTab === tab.id 
                      ? 'bg-primary/5 text-primary border-l-4 border-l-primary' 
                      : 'text-slate-600 hover:bg-slate-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-5 py-4 mt-4 text-sm font-medium text-rose-600 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:bg-rose-50 transition-colors"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 space-y-8">
              
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 font-heading font-bold text-2xl overflow-hidden">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                    <Camera className="size-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">{user?.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.role === 'brand_owner' ? 'Brand Owner' : user?.role === 'creator' ? 'Creator' : 'Customer'}</p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                  <input 
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Email</label>
                  <input 
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
                  <input 
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))}
                    placeholder="Portland, OR"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Website</label>
                  <input 
                    type="url"
                    value={profileForm.website}
                    onChange={(e) => setProfileForm(p => ({ ...p, website: e.target.value }))}
                    placeholder="https://your-site.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Bio</label>
                <textarea 
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell the community about yourself..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm divide-y divide-slate-100">
              
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">Email Notifications</h3>
                <p className="text-xs text-slate-500">Choose what updates you receive in your inbox.</p>
              </div>

              {[
                { key: 'emailCollabs', label: 'Collaboration Requests', desc: 'When a brand or creator sends you a pitch', icon: Mail },
                { key: 'emailMessages', label: 'Direct Messages', desc: 'When someone sends you a new message', icon: Mail },
                { key: 'emailMarketing', label: 'Marketing & Tips', desc: 'CraftConnect product updates and growth tips', icon: Mail }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <item.icon className="size-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle 
                    checked={notifSettings[item.key]} 
                    onChange={(v) => setNotifSettings(p => ({ ...p, [item.key]: v }))} 
                  />
                </div>
              ))}

              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">Push Notifications</h3>
                <p className="text-xs text-slate-500">Real-time alerts in your dashboard.</p>
              </div>

              {[
                { key: 'pushCollabs', label: 'New Pitches', desc: 'Instant alerts for incoming collaboration requests', icon: Smartphone },
                { key: 'pushMessages', label: 'Chat Messages', desc: 'Real-time message notifications', icon: Smartphone },
                { key: 'pushRecommendations', label: 'AI Recommendations', desc: 'When we find a high-match partner for you', icon: Smartphone }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <item.icon className="size-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle 
                    checked={notifSettings[item.key]} 
                    onChange={(v) => setNotifSettings(p => ({ ...p, [item.key]: v }))} 
                  />
                </div>
              ))}
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm divide-y divide-slate-100">
              
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">Visibility & Discovery</h3>
                <p className="text-xs text-slate-500">Control how others find and see your profile.</p>
              </div>

              {[
                { key: 'profileVisible', label: 'Public Profile', desc: 'Make your profile visible in the directory', icon: Eye },
                { key: 'showEmail', label: 'Show Email Address', desc: 'Display your email on your public profile', icon: Mail },
                { key: 'showMetrics', label: 'Show Social Metrics', desc: 'Display follower count and engagement rate publicly', icon: Globe },
                { key: 'allowDiscovery', label: 'AI Discovery', desc: 'Allow AI to recommend you to matching partners', icon: Palette }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <item.icon className="size-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle 
                    checked={privacySettings[item.key]} 
                    onChange={(v) => setPrivacySettings(p => ({ ...p, [item.key]: v }))} 
                  />
                </div>
              ))}
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">Account Details</h3>
                  <p className="text-xs text-slate-500">Your account type and membership information.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Type</p>
                    <p className="font-heading font-bold text-slate-900 capitalize">{user?.role?.replace('_', ' ') || 'Member'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Plan</p>
                    <p className="font-heading font-bold text-slate-900">Free Tier</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                    <p className="font-heading font-bold text-slate-900">June 2026</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">User ID</p>
                    <p className="font-heading font-bold text-slate-900 text-xs">{user?._id || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-3xl border border-rose-200 shadow-sm p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 shrink-0">
                    <Trash2 className="size-5 text-rose-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg text-rose-900 mb-1">Danger Zone</h3>
                    <p className="text-xs text-rose-600/70 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <Button variant="outline" className="rounded-full border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 px-6">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
