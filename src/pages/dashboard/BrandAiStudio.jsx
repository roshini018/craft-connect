import { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  PenTool, 
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Target,
  FileText,
  BarChart,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';

export default function BrandAiStudio() {
  // States for each tool's loading and result
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyResult, setStoryResult] = useState(null);

  const [descLoading, setDescLoading] = useState(false);
  const [descResult, setDescResult] = useState(null);

  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const [campaignLoading, setCampaignLoading] = useState(false);
  const [campaignResult, setCampaignResult] = useState(null);

  const [requestLoading, setRequestLoading] = useState(false);
  const [requestResult, setRequestResult] = useState(null);

  const [contentLoading, setContentLoading] = useState(false);
  const [contentResult, setContentResult] = useState(null);

  // Mock Generation Functions
  const generateStory = (e) => {
    e.preventDefault();
    setStoryLoading(true);
    setTimeout(() => {
      setStoryResult("Maison Clay transforms earth into timeless handcrafted pieces inspired by nature and modern living. Founded on the belief that everyday objects should bring quiet joy, our ceramics blend traditional techniques with contemporary aesthetics, creating functional art for your home.");
      setStoryLoading(false);
    }, 1500);
  };

  const generateDesc = (e) => {
    e.preventDefault();
    setDescLoading(true);
    setTimeout(() => {
      setDescResult("Elevate your morning ritual with our signature Speckled Matte Mug. Hand-thrown by master artisans, this 12oz ceramic vessel features a unique reactive glaze that ensures no two pieces are exactly alike. Its ergonomic handle and heat-retaining clay body keep your coffee perfectly warm. Ideal for minimalist kitchens and slow mornings.");
      setDescLoading(false);
    }, 1500);
  };

  const generateMatches = (e) => {
    e.preventDefault();
    setMatchLoading(true);
    setTimeout(() => {
      setMatchResult([
        { name: "Sarah Jenkins", handle: "@sarah.creates", match: "98%", followers: "45K", eng: "4.2%", tags: ["Home Decor", "Lifestyle"] },
        { name: "The Minimalist Maker", handle: "@min.maker", match: "94%", followers: "112K", eng: "3.8%", tags: ["Ceramics", "Design"] },
        { name: "Cozy Spaces", handle: "@cozy.spaces", match: "89%", followers: "28K", eng: "5.5%", tags: ["Interiors", "Art"] }
      ]);
      setMatchLoading(false);
    }, 2000);
  };

  const generateCampaign = (e) => {
    e.preventDefault();
    setCampaignLoading(true);
    setTimeout(() => {
      setCampaignResult({
        creators: "5 Micro-Influencers",
        timeline: "4 Weeks (Oct 1 - Oct 28)",
        reach: "Est. 150K - 200K Impressions",
        content: ["3 Instagram Reels (Process videos)", "5 Carousel Posts (Styling ideas)", "10+ Story Shoutouts with Links"]
      });
      setCampaignLoading(false);
    }, 2000);
  };

  const analyzeRequest = (e) => {
    e.preventDefault();
    setRequestLoading(true);
    setTimeout(() => {
      setRequestResult({
        category: "Ceramic Drinkware",
        quantity: 50,
        budget: "₹15,000",
        occasion: "Wedding Favors",
        response: "Hello! We would love to create 50 customized ceramic mugs for your wedding. With a budget of ₹15,000 (₹300/mug), we can offer our standard glaze with a custom stamped initial on the base. Production takes 3 weeks. Would you like to see a sample photo?"
      });
      setRequestLoading(false);
    }, 1500);
  };

  const generateContent = (e) => {
    e.preventDefault();
    setContentLoading(true);
    setTimeout(() => {
      setContentResult([
        { type: "Reel", idea: "ASMR Pottery throwing: 15s satisfying video of centering clay with trending calm audio." },
        { type: "Post", idea: "Carousel: 3 ways to style our new speckled bowl in a modern kitchen setting." },
        { type: "Hook", idea: "\"Stop buying mass-produced mugs. Here's why handmade changes how your coffee tastes...\"" },
        { type: "Story", idea: "Poll: 'Which glaze test should we put into production next?' with A/B options." }
      ]);
      setContentLoading(false);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Hero Section */}
      <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-8 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Wand2 className="size-4" />
            <span>AI Studio</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Your AI Growth Partner
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed mb-10">
            Everything you need to build your brand, connect with creators, and scale customer engagement using the power of AI.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "AI Usage This Month", value: "84 / 100", icon: BarChart },
              { label: "Content Generated", value: "32 Items", icon: FileText },
              { label: "Creator Matches", value: "15 Found", icon: Users },
              { label: "Campaigns Planned", value: "4 Active", icon: Target }
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                  <stat.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Tools Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tool 1: Brand Story */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <PenTool className="size-6" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">Brand Story Generator</h2>
                <p className="text-sm text-slate-500">Craft a compelling narrative for your profile</p>
              </div>
            </div>
            <form onSubmit={generateStory} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Brand Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Category (e.g. Ceramics, Fashion)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
              </div>
              <textarea placeholder="Briefly describe your craft, materials, and inspiration..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[100px]" required></textarea>
              <button disabled={storyLoading} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                {storyLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Generate Story
              </button>
            </form>
            
            {storyResult && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 leading-relaxed animate-in fade-in zoom-in-95">
                {storyResult}
              </div>
            )}
          </div>

          {/* Tool 2: Product Description */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <FileText className="size-6" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">Product Description Generator</h2>
                <p className="text-sm text-slate-500">SEO-friendly copy that converts</p>
              </div>
            </div>
            <form onSubmit={generateDesc} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Product Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Product Category" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
              </div>
              <input type="text" placeholder="Key Features (e.g. handmade, organic, blue glaze)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
              <button disabled={descLoading} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                {descLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Generate Description
              </button>
            </form>
            
            {descResult && (
              <div className="mt-6 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-900 leading-relaxed animate-in fade-in zoom-in-95">
                {descResult}
              </div>
            )}
          </div>

          {/* Tool 3: Creator Match AI */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="size-6" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">Creator Match AI</h2>
                <p className="text-sm text-slate-500">Find the perfect influencers for your niche</p>
              </div>
            </div>
            <form onSubmit={generateMatches} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Product Type" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Target Audience" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Budget (e.g. Barter, ₹5k)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Campaign Goal" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
              </div>
              <button disabled={matchLoading} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                {matchLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Find Matches
              </button>
            </form>
            
            {matchResult && (
              <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
                {matchResult.map((creator, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all bg-white group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <ImageIcon className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{creator.name}</h4>
                        <p className="text-sm text-slate-500">{creator.handle}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-slate-900">{creator.followers}</p>
                        <p className="text-xs text-slate-500 uppercase">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-slate-900">{creator.eng}</p>
                        <p className="text-xs text-slate-500 uppercase">Engagement</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-primary">{creator.match}</p>
                        <p className="text-xs text-slate-500 uppercase">Match</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors">
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tool 4: Campaign Planner */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Target className="size-6" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">Campaign Planner</h2>
                <p className="text-sm text-slate-500">Data-driven collaboration strategies</p>
              </div>
            </div>
            <form onSubmit={generateCampaign} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Campaign Goal" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Budget" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                <input type="text" placeholder="Product Category" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
              </div>
              <button disabled={campaignLoading} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                {campaignLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Generate Campaign
              </button>
            </form>
            
            {campaignResult && (
              <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in zoom-in-95">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Recommended Creators</p>
                    <p className="font-bold text-slate-900">{campaignResult.creators}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Timeline</p>
                    <p className="font-bold text-slate-900">{campaignResult.timeline}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-sm text-slate-500 font-medium mb-1">Expected Reach</p>
                    <p className="font-bold text-primary">{campaignResult.reach}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-3">Content Suggestions</p>
                  <ul className="space-y-2">
                    {campaignResult.content.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="size-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Tool 5: Request Analyzer */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <MessageSquare className="size-6" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">Request Analyzer</h2>
                <p className="text-sm text-slate-500">Extract insights from custom requests</p>
              </div>
            </div>
            <form onSubmit={analyzeRequest} className="space-y-4">
              <textarea placeholder="Paste customer request here (e.g. Need 50 customized ceramic mugs for a wedding. Budget ₹15,000)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[100px]" required></textarea>
              <button disabled={requestLoading} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                {requestLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Analyze Request
              </button>
            </form>
            
            {requestResult && (
              <div className="mt-6 space-y-4 animate-in fade-in zoom-in-95">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Category</p>
                    <p className="font-bold text-slate-900">{requestResult.category}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Quantity</p>
                    <p className="font-bold text-slate-900">{requestResult.quantity}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Budget</p>
                    <p className="font-bold text-primary">{requestResult.budget}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Occasion</p>
                    <p className="font-bold text-slate-900">{requestResult.occasion}</p>
                  </div>
                </div>
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-semibold mb-2">Suggested Response:</p>
                  <p className="text-slate-700 italic">"{requestResult.response}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Tool 6: Content Inspiration */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600">
                <Lightbulb className="size-6" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900">Content Inspiration</h2>
                <p className="text-sm text-slate-500">Generate viral hooks and content formats</p>
              </div>
            </div>
            <form onSubmit={generateContent} className="space-y-4">
              <input type="text" placeholder="Topic or Product (e.g. Hand poured soy candles)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
              <button disabled={contentLoading} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                {contentLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Generate Ideas
              </button>
            </form>
            
            {contentResult && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95">
                {contentResult.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm hover:border-primary/20 transition-all">
                    <span className="inline-block px-2 py-1 rounded-md bg-fuchsia-100 text-fuchsia-700 text-xs font-bold uppercase tracking-wider mb-3">
                      {item.type}
                    </span>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.idea}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="size-5 text-gold" />
                AI Insights
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Trending Categories</h4>
                  <ul className="space-y-2">
                    {["Wabi-Sabi Ceramics", "Sustainable Linen", "Hand-poured Candles"].map((cat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                        <TrendingUp className="size-3 text-emerald-400" />
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Fastest Growing</h4>
                  <ul className="space-y-3">
                    {[
                      { name: "Ochre & Earth", growth: "+42%" },
                      { name: "Loom Studio", growth: "+28%" }
                    ].map((brand, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-200">{brand.name}</span>
                        <span className="text-emerald-400 font-medium bg-emerald-400/10 px-2 py-0.5 rounded-md">{brand.growth}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Opportunity</h4>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                    <p className="text-sm text-slate-200 leading-relaxed">
                      "Unboxing videos" are currently seeing a <span className="text-gold font-bold">150%</span> higher engagement rate in the home decor niche. Consider offering gifting packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
              <Sparkles className="size-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Need a custom AI model?</h4>
            <p className="text-sm text-slate-600 mb-4">Train our AI on your specific brand voice and historical data.</p>
            <button className="w-full py-2.5 bg-white text-primary font-semibold rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
