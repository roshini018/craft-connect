// LocalStorage key constants
const AUTH_KEY = 'craftconnect_user';
const TOKEN_KEY = 'craftconnect_token';
const BRANDS_KEY = 'craftconnect_brands';
const CREATORS_KEY = 'craftconnect_creators';
const COLLABS_KEY = 'craftconnect_collabs';
const PRODUCTS_KEY = 'craftconnect_products';
const MESSAGES_KEY = 'craftconnect_messages';
const NOTIFICATIONS_KEY = 'craftconnect_notifications';
const CUSTOMER_FAVORITES_KEY = 'craftconnect_customer_favorites';
const CUSTOMER_REQUESTS_KEY = 'craftconnect_customer_requests';

// Helper to get/set data
const getDB = (key, defaultVal) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(data);
};
const setDB = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Initial Mock Data
const INITIAL_BRANDS = [
  {
    _id: 'brand-1',
    name: 'Terra Clay Studio',
    industry: 'Ceramics',
    description: 'We craft slow-made organic stoneware, dinnerware, and sculptural clay pieces designed for slow living. Every cup, bowl, and vase carries the touch of our small studio in Portland, Oregon.',
    location: 'Portland, OR',
    website: 'terraclaystudio.com',
    logo: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200',
    owner: { _id: 'user-brand-1', name: 'Elena Rostova', email: 'elena@terraclay.com' },
    socialLinks: { instagram: 'https://instagram.com/terraclay', youtube: 'https://youtube.com/terraclay' },
    isVerified: true,
    isTrending: true,
    aiTrustScore: 98,
    story: 'Terra Clay Studio began in a garage as a passion project to bring tactile, authentic earthen objects back into everyday rituals. We focus on earth-sourced materials, mineral glazes, and clean firing techniques. Our goal is to create heirloom ceramics that last generations.',
    collaborations: [
      { creatorName: 'Marcus Aurel', platform: 'Instagram Reels', reach: '142k views', engagement: '8.4%', image: 'https://images.unsplash.com/photo-1597484211625-24d31d044f56?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    _id: 'brand-2',
    name: 'Linen & Loom',
    industry: 'Fashion',
    description: 'Premium organic linen garments tailored by hand. Our focus is breathable, high-comfort luxury clothing that respects both the artisan weavers and our planet.',
    location: 'Savannah, GA',
    website: 'linenloom.co',
    logo: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=200',
    owner: { _id: 'user-brand-2', name: 'Julian Vance', email: 'julian@linenloom.co' },
    socialLinks: { instagram: 'https://instagram.com/linenloom' },
    isVerified: true,
    isTrending: false,
    aiTrustScore: 95,
    story: 'Inspired by coastal winds and effortless European silhouettes, Linen & Loom uses 100% GOTS-certified flax linen. We believe that what you wear should breathe with your body, drape beautifully, and leave no trace behind.',
    collaborations: [
      { creatorName: 'Sofia Chen', platform: 'TikTok Haul', reach: '98k views', engagement: '10.2%', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    _id: 'brand-3',
    name: 'Sylvan Botanicals',
    industry: 'Gourmet Foods',
    description: 'Small-batch herbal teas, raw forest honeys, and botanical elixirs wild-harvested from the deep woodlands of the Pacific Northwest.',
    location: 'Seattle, WA',
    website: 'sylvanbotanicals.com',
    logo: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=200',
    owner: { _id: 'user-brand-3', name: 'Maeve Thorne', email: 'maeve@sylvan.com' },
    socialLinks: { instagram: 'https://instagram.com/sylvanbotanicals', youtube: 'https://youtube.com/sylvan' },
    isVerified: false,
    isTrending: true,
    aiTrustScore: 89,
    story: 'Sylvan Botanicals is built on deep ecology principles. We wild-forage pine needles, elderberries, and forest herbs with permission, crafting them into soothing teas and elixirs that bridge the gap between wilderness and modern wellness.',
    collaborations: []
  },
  {
    _id: 'brand-4',
    name: 'Oak & Amber',
    industry: 'Home Decor',
    description: 'Soy candles hand-poured in custom ceramic jars, featuring notes of tobacco, moss, cedar, and vetiver. Pure wooden wicks that crackle like a campfire.',
    location: 'Denver, CO',
    website: 'oakandamber.com',
    logo: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=200',
    owner: { _id: 'user-brand-4', name: 'Dan Higgins', email: 'dan@oakamber.com' },
    socialLinks: { instagram: 'https://instagram.com/oakandamber' },
    isVerified: true,
    isTrending: true,
    aiTrustScore: 92,
    story: 'Oak & Amber candles are formulated to evoke the atmosphere of mountain cabins, forest retreats, and cozy rainy nights. We use custom oil blends, clean-burning soy wax, and local clay jars you can reuse indefinitely.',
    collaborations: [
      { creatorName: 'Marcus Aurel', platform: 'YouTube Room Tour', reach: '210k views', engagement: '7.1%', image: 'https://images.unsplash.com/photo-1608755731920-3f936a672927?auto=format&fit=crop&q=80&w=300' }
    ]
  }
];

const INITIAL_CREATORS = [
  {
    _id: 'creator-1',
    name: 'Marcus Aurel',
    bio: 'Visual artist and interior designer sharing modern minimalist lifestyles, cozy spaces, and slow morning routines. Love showcasing high-quality local crafts.',
    niche: ['Home decor', 'Artistic', 'Lifestyle'],
    user: {
      _id: 'user-creator-1',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      email: 'marcus@creators.com'
    },
    socialMetrics: { followers: 125000, engagementRate: 7.8 },
    platforms: ['Instagram', 'YouTube'],
    portfolio: [
      { title: 'Oak & Amber Showcase', link: '#', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300' },
      { title: 'Minimal Kitchen Restructure', link: '#', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=300' }
    ],
    audienceInsights: { location: 'USA (65%), UK (15%), Canada (10%)', gender: 'Female (58%), Male (42%)', age: '25-34 (54%), 18-24 (28%)' }
  },
  {
    _id: 'creator-2',
    name: 'Sofia Chen',
    bio: 'Eco-conscious fashion creator focusing on sustainable capsules, vintage sourcing, and organic linen styling tutorials. Sharing how to build a beautiful conscious closet.',
    niche: ['Eco-friendly', 'Fashion', 'Lifestyle'],
    user: {
      _id: 'user-creator-2',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      email: 'sofia@creators.com'
    },
    socialMetrics: { followers: 89000, engagementRate: 9.4 },
    platforms: ['Instagram', 'TikTok'],
    portfolio: [
      { title: 'Summer Linen Capsule', link: '#', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=300' }
    ],
    audienceInsights: { location: 'USA (48%), Australia (22%), Germany (12%)', gender: 'Female (82%), Male (18%)', age: '18-24 (62%), 25-34 (26%)' }
  },
  {
    _id: 'creator-3',
    name: 'Lars Vander',
    bio: 'Architectural photographer and ceramics collector. Exploring texture, light, and the raw beauty of hand-thrown kitchenware.',
    niche: ['Photography', 'Home decor', 'Handmade craft'],
    user: {
      _id: 'user-creator-3',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      email: 'lars@creators.com'
    },
    socialMetrics: { followers: 42000, engagementRate: 11.2 },
    platforms: ['Pinterest', 'Instagram'],
    portfolio: [
      { title: 'Rustic Stoneware In Studio', link: '#', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=300' }
    ],
    audienceInsights: { location: 'Netherlands (40%), USA (30%), France (15%)', gender: 'Female (52%), Male (48%)', age: '25-34 (40%), 35-44 (35%)' }
  }
];

const INITIAL_PRODUCTS = [
  { _id: 'prod-1', brandId: 'brand-1', name: 'Rustic Earth Mug', price: 28, description: 'Hand-thrown textured coffee mug glazed in satin mineral cream. Safe for dishwasher and microwave.', purchaseLink: 'https://terraclaystudio.com/shop/mug', images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300'] },
  { _id: 'prod-2', brandId: 'brand-1', name: 'Faceted Clay Pitcher', price: 64, description: 'A sculptural serving pitcher crafted from coarse speckled clay. Excellent for table water or fresh wildflowers.', purchaseLink: 'https://terraclaystudio.com/shop/pitcher', images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=300'] },
  { _id: 'prod-3', brandId: 'brand-2', name: 'Everyday Linen Smock', price: 110, description: 'Comfortable oversized long shirt made from organic local weave. Features double front pockets and mock horn buttons.', purchaseLink: 'https://linenloom.co/shop/smock', images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300'] },
  { _id: 'prod-4', brandId: 'brand-4', name: 'Smoked Spruce & Vetiver Candle', price: 34, description: 'Soy wax candle in hand-fired slate jar. Crackling wood wick with notes of spruce needle, cypress wood, and earthy vetiver.', purchaseLink: 'https://oakandamber.com/shop/spruce', images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300'] }
];

const INITIAL_COLLABS = [
  { _id: 'collab-1', brandId: 'brand-1', brand: { name: 'Terra Clay Studio', logo: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200', industry: 'Ceramics' }, creatorId: 'creator-1', creator: { name: 'Marcus Aurel', niche: ['Home decor', 'Artistic'], user: { profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' } }, message: 'Hello Elena! I absolutely love your rustic mugs and would love to style them in my slow morning vlog on YouTube. Let me know if you would be open to a gifting collaboration!', proposedCompensation: 'Gifting (Free products)', status: 'pending', sender: 'user-creator-1' },
  { _id: 'collab-2', brandId: 'brand-2', brand: { name: 'Linen & Loom', logo: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=200', industry: 'Fashion' }, creatorId: 'creator-2', creator: { name: 'Sofia Chen', niche: ['Eco-friendly', 'Fashion'], user: { profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' } }, message: 'We would love to invite Sofia to showcase our upcoming Linen Tunic collection in an Instagram Reel. We are proposing a paid sponsorship of $350 plus gifting.', proposedCompensation: 'Paid Sponsorship', status: 'accepted', sender: 'user-brand-2' }
];

const INITIAL_MESSAGES = [
  {
    chatId: 'chat-1',
    participants: {
      brandId: 'brand-1', brandName: 'Terra Clay Studio',
      creatorId: 'creator-1', creatorName: 'Marcus Aurel'
    },
    messages: [
      { sender: 'brand', text: 'Hi Marcus! Love your recent architectural shoots.', timestamp: '2026-06-18T10:00:00Z' },
      { sender: 'creator', text: 'Thanks! The lighting was perfect that day.', timestamp: '2026-06-18T10:30:00Z' },
      { sender: 'brand', text: 'We have a new brutalist collection launching. Would you be open to a shoot?', timestamp: '2026-06-18T11:00:00Z' }
    ]
  },
  {
    chatId: 'chat-2',
    participants: {
      brandId: 'brand-1', brandName: 'Terra Clay Studio',
      customerId: 'user-customer-1', customerName: 'Sarah Miller'
    },
    messages: [
      { sender: 'customer', text: 'Hello! Im interested in getting a custom set of espresso cups made.', timestamp: '2026-06-19T09:00:00Z' },
      { sender: 'brand', text: 'Hi Sarah! We would love to make those for you. What colors were you thinking?', timestamp: '2026-06-19T10:15:00Z' }
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  { _id: 'n-1', type: 'message', text: 'Marcus Aurel sent you a direct message.', timestamp: '2026-06-18T11:00:00Z', read: false },
  { _id: 'n-2', type: 'collab', text: 'Your collaboration request with Linen & Loom was accepted!', timestamp: '2026-06-17T15:00:00Z', read: true },
  { _id: 'n-3', type: 'request', text: 'Oak & Amber invited you to join their Summer Cabin launch.', timestamp: '2026-06-16T09:30:00Z', read: false }
];

const INITIAL_CUSTOMER_FAVORITES = [
  { customerId: 'user-customer-1', brandId: 'brand-1', savedAt: '2026-06-15T09:00:00Z' },
  { customerId: 'user-customer-1', brandId: 'brand-2', savedAt: '2026-06-16T14:30:00Z' },
  { customerId: 'user-customer-1', brandId: 'brand-4', savedAt: '2026-06-17T11:00:00Z' }
];

const INITIAL_CUSTOMER_REQUESTS = [
  { _id: 'req-1', customerId: 'user-customer-1', requestType: 'Custom Mug Set', brandName: 'Terra Clay Studio', brandLogo: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200', budget: 120, status: 'completed', submittedAt: '2026-06-10T08:00:00Z', deadline: '2026-06-30T00:00:00Z' },
  { _id: 'req-2', customerId: 'user-customer-1', requestType: 'Wedding Candle Favors', brandName: 'Oak & Amber', brandLogo: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=200', budget: 350, status: 'quote_sent', submittedAt: '2026-06-17T12:00:00Z', deadline: '2026-08-15T00:00:00Z' },
  { _id: 'req-3', customerId: 'user-customer-1', requestType: 'Personalized Linen Apron', brandName: 'Linen & Loom', brandLogo: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=200', budget: 85, status: 'in_discussion', submittedAt: '2026-06-19T15:00:00Z', deadline: '2026-07-10T00:00:00Z' },
  { _id: 'req-4', customerId: 'user-customer-1', requestType: 'Large Statement Planter', brandName: 'Terra Clay Studio', brandLogo: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200', budget: 200, status: 'submitted', submittedAt: '2026-06-20T10:30:00Z', deadline: '2026-07-25T00:00:00Z' }
];

// Database initializers
const initializeDB = () => {
  getDB(BRANDS_KEY, INITIAL_BRANDS);
  getDB(CREATORS_KEY, INITIAL_CREATORS);
  getDB(PRODUCTS_KEY, INITIAL_PRODUCTS);
  getDB(COLLABS_KEY, INITIAL_COLLABS);
  getDB(MESSAGES_KEY, INITIAL_MESSAGES);
  getDB(NOTIFICATIONS_KEY, INITIAL_NOTIFICATIONS);
  getDB(CUSTOMER_FAVORITES_KEY, INITIAL_CUSTOMER_FAVORITES);
  getDB(CUSTOMER_REQUESTS_KEY, INITIAL_CUSTOMER_REQUESTS);
};
initializeDB();

// Mock response wrapping helper
const mockResponse = (data, success = true, error = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success, data, error, count: Array.isArray(data) ? data.length : undefined } });
    }, 250);
  });
};

// API mock interface
const api = {
  get: async (url, config = {}) => {
    const params = config.params || {};
    
    // Auth get me
    if (url === '/auth/me') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (activeUser) {
        return mockResponse({ user: activeUser });
      }
      return mockResponse(null, false, 'No token/auth found');
    }

    // Brands Directory
    if (url === '/brands') {
      let brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
      if (params.search) {
        const query = params.search.toLowerCase();
        brands = brands.filter(b => 
          b.name.toLowerCase().includes(query) || 
          b.industry.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query)
        );
      }
      if (params.industry && params.industry !== 'All') {
        brands = brands.filter(b => b.industry.toLowerCase() === params.industry.toLowerCase());
      }
      if (params.verified === 'true') {
        brands = brands.filter(b => b.isVerified);
      }
      if (params.trending === 'true') {
        brands = brands.filter(b => b.isTrending);
      }
      return mockResponse(brands);
    }

    // Brand Profile Detail
    if (url.startsWith('/brands/')) {
      const id = url.split('/').pop();
      const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
      const brand = brands.find(b => b._id === id);
      if (brand) return mockResponse(brand);
      return mockResponse(null, false, 'Brand profile not found');
    }

    // Creators Directory
    if (url === '/creators') {
      let creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
      if (params.search) {
        const query = params.search.toLowerCase();
        creators = creators.filter(c => 
          c.name.toLowerCase().includes(query) || 
          c.bio.toLowerCase().includes(query) ||
          c.niche.some(n => n.toLowerCase().includes(query))
        );
      }
      if (params.niche && params.niche !== 'All') {
        creators = creators.filter(c => c.niche.some(n => n.toLowerCase() === params.niche.toLowerCase()));
      }
      if (params.minFollowers) {
        creators = creators.filter(c => c.socialMetrics.followers >= Number(params.minFollowers));
      }
      return mockResponse(creators);
    }

    // Creator Profile Detail
    if (url.startsWith('/creators/')) {
      const id = url.split('/').pop();
      const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
      const creator = creators.find(c => c._id === id);
      if (creator) return mockResponse(creator);
      return mockResponse(null, false, 'Creator profile not found');
    }

    // Products list by brand
    if (url.startsWith('/products/brand/')) {
      const brandId = url.split('/').pop();
      const products = getDB(PRODUCTS_KEY, INITIAL_PRODUCTS);
      const brandProducts = products.filter(p => p.brandId === brandId);
      return mockResponse(brandProducts);
    }

    // Collaboration Requests
    if (url === '/collaborations/requests') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      const collabs = getDB(COLLABS_KEY, INITIAL_COLLABS);
      if (!activeUser) return mockResponse([], false, 'Unauthorized');

      // Filter based on user profile
      let filtered = [];
      if (activeUser.role === 'brand_owner') {
        // Find if user owns a brand
        const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
        const myBrand = brands.find(b => b.owner?._id === activeUser._id);
        if (myBrand) {
          filtered = collabs.filter(c => c.brandId === myBrand._id || c.sender === activeUser._id);
        }
      } else if (activeUser.role === 'creator') {
        const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
        const myCreator = creators.find(c => c.user?._id === activeUser._id);
        if (myCreator) {
          filtered = collabs.filter(c => c.creatorId === myCreator._id || c.sender === activeUser._id);
        }
      } else {
        filtered = collabs.filter(c => c.sender === activeUser._id);
      }
      return mockResponse(filtered);
    }

    // AI Matching Recommendations
    if (url === '/collaborations/recommendations') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse([], false, 'Unauthorized');

      const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
      const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);

      if (activeUser.role === 'brand_owner') {
        const myBrand = brands.find(b => b.owner?._id === activeUser._id);
        // Recommend creators matching industry
        const recs = creators.map((c, idx) => ({
          creator: c,
          score: 85 + (idx * 4) % 15,
          matchedTags: c.niche.slice(0, 2),
          overlap: 72 + idx * 7,
          suggestedCampaign: myBrand?.industry === 'Ceramics' ? 'Product Gifting Video' : 'Sponsored Feed Post'
        }));
        return mockResponse(recs);
      } else {
        // Recommend brands
        const recs = brands.map((b, idx) => ({
          brand: b,
          score: 82 + (idx * 5) % 18,
          matchedTags: [b.industry, 'Authentic'],
          overlap: 68 + idx * 6,
          suggestedCampaign: 'Affiliate Marketing'
        }));
        return mockResponse(recs);
      }
    }

    // Messages Get
    if (url === '/messages') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse([], false, 'Unauthorized');
      const messages = getDB(MESSAGES_KEY, INITIAL_MESSAGES);
      return mockResponse(messages);
    }

    // Notifications Get
    if (url === '/notifications') {
      const notifications = getDB(NOTIFICATIONS_KEY, INITIAL_NOTIFICATIONS);
      return mockResponse(notifications);
    }

    // Customer Favorites Get
    if (url === '/customer/favorites') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse([], false, 'Unauthorized');
      const favorites = getDB(CUSTOMER_FAVORITES_KEY, INITIAL_CUSTOMER_FAVORITES);
      const myFavorites = favorites.filter(f => f.customerId === activeUser._id);
      // Enrich with brand data
      const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
      const enriched = myFavorites.map(fav => {
        const brand = brands.find(b => b._id === fav.brandId);
        return { ...fav, brand };
      }).filter(f => f.brand);
      return mockResponse(enriched);
    }

    // Customer Requests Get
    if (url === '/customer/requests') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse([], false, 'Unauthorized');
      const requests = getDB(CUSTOMER_REQUESTS_KEY, INITIAL_CUSTOMER_REQUESTS);
      const myRequests = requests.filter(o => o.customerId === activeUser._id);
      return mockResponse(myRequests);
    }

    // Customer AI Recommendations Get
    if (url === '/customer/recommendations') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse([], false, 'Unauthorized');
      const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
      const products = getDB(PRODUCTS_KEY, INITIAL_PRODUCTS);
      const recs = brands.map((brand, idx) => {
        const brandProducts = products.filter(p => p.brandId === brand._id);
        return {
          brand,
          score: 80 + (idx * 6) % 20,
          reason: [
            'Based on your purchase history',
            'Popular with similar shoppers',
            'Trending in your area',
            'Matches your taste profile'
          ][idx % 4],
          topProduct: brandProducts[0] || null
        };
      });
      return mockResponse(recs);
    }

    // Generic fallback for any unregistered get route
    return mockResponse({ message: 'Success' });
  },

  post: async (url, data) => {
    // Login
    if (url === '/auth/login') {
      const { email, password } = data;
      // Default sample credentials or simple auto-auth
      let name = 'Elena Rostova';
      let role = 'brand_owner';
      let userId = 'user-brand-1';
      
      if (email.includes('creator') || email.includes('marcus')) {
        name = 'Marcus Aurel';
        role = 'creator';
        userId = 'user-creator-1';
      } else if (email.includes('customer')) {
        name = 'Sarah Miller';
        role = 'customer';
        userId = 'user-customer-1';
      }

      const activeUser = { _id: userId, name, email, role };
      localStorage.setItem(AUTH_KEY, JSON.stringify(activeUser));
      localStorage.setItem(TOKEN_KEY, 'mock-jwt-token');
      return mockResponse({ success: true, token: 'mock-jwt-token', user: activeUser });
    }

    // Register
    if (url === '/auth/register') {
      const { name, email, role } = data;
      const activeUser = { _id: 'user-' + Math.random().toString(36).substr(2, 9), name, email, role };
      localStorage.setItem(AUTH_KEY, JSON.stringify(activeUser));
      localStorage.setItem(TOKEN_KEY, 'mock-jwt-token');

      // Proactively create matching profile shell
      if (role === 'brand_owner') {
        const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
        const newBrand = {
          _id: 'brand-' + Math.random().toString(36).substr(2, 9),
          name: name + '\'s Hand-Grown Shop',
          industry: 'Textiles',
          description: 'A starting brand dedicated to high craftsmanship and natural materials.',
          location: 'San Francisco, CA',
          website: 'craftconnect.com',
          logo: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200',
          owner: { _id: activeUser._id, name: activeUser.name, email: activeUser.email },
          socialLinks: { instagram: '' },
          isVerified: false,
          isTrending: false,
          aiTrustScore: 70,
          story: 'Our story has just begun on CraftConnect. We focus on ethical making and connecting with creators.',
          collaborations: []
        };
        brands.push(newBrand);
        setDB(BRANDS_KEY, brands);
      } else if (role === 'creator') {
        const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
        const newCreator = {
          _id: 'creator-' + Math.random().toString(36).substr(2, 9),
          name,
          bio: 'I am a creator newly registered on CraftConnect. Eager to collaborate with home-grown brands.',
          niche: ['Lifestyle'],
          user: { _id: activeUser._id, profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', email: activeUser.email },
          socialMetrics: { followers: 5000, engagementRate: 4.5 },
          platforms: ['Instagram'],
          portfolio: [],
          audienceInsights: { location: 'USA (80%)', gender: 'Female (70%), Male (30%)', age: '18-24 (50%), 25-34 (30%)' }
        };
        creators.push(newCreator);
        setDB(CREATORS_KEY, creators);
      }

      return mockResponse({ success: true, token: 'mock-jwt-token', user: activeUser });
    }

    // Collaboration Submit
    if (url === '/collaborations') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse(null, false, 'Unauthorized');

      const collabs = getDB(COLLABS_KEY, INITIAL_COLLABS);
      const newCollab = {
        _id: 'collab-' + Math.random().toString(36).substr(2, 9),
        sender: activeUser._id,
        status: 'pending',
        proposedCompensation: data.proposedCompensation || 'Gifting',
        message: data.message
      };

      if (activeUser.role === 'creator') {
        const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
        const myCreator = creators.find(c => c.user?._id === activeUser._id);
        const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
        const targetBrand = brands.find(b => b._id === data.targetId);

        newCollab.creatorId = myCreator?._id;
        newCollab.creator = { name: activeUser.name, niche: myCreator?.niche || ['Lifestyle'], user: { profileImage: myCreator?.user?.profileImage } };
        newCollab.brandId = data.targetId;
        newCollab.brand = { name: targetBrand?.name || 'Home Brand', logo: targetBrand?.logo, industry: targetBrand?.industry || 'Artisan' };
      } else {
        const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
        const myBrand = brands.find(b => b.owner?._id === activeUser._id);
        const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
        const targetCreator = creators.find(c => c._id === data.targetId);

        newCollab.brandId = myBrand?._id;
        newCollab.brand = { name: myBrand?.name || 'My Brand', logo: myBrand?.logo, industry: myBrand?.industry || 'Craft' };
        newCollab.creatorId = data.targetId;
        newCollab.creator = { name: targetCreator?.name || 'Creator', niche: targetCreator?.niche || ['Lifestyle'], user: { profileImage: targetCreator?.user?.profileImage } };
      }

      collabs.push(newCollab);
      setDB(COLLABS_KEY, collabs);
      return mockResponse(newCollab);
    }

    // Add Product
    if (url === '/products') {
      const products = getDB(PRODUCTS_KEY, INITIAL_PRODUCTS);
      const newProduct = {
        _id: 'prod-' + Math.random().toString(36).substr(2, 9),
        ...data
      };
      products.push(newProduct);
      setDB(PRODUCTS_KEY, products);
      return mockResponse(newProduct);
    }

    // Post Messages
    if (url.startsWith('/messages/')) {
      const chatId = url.split('/').pop();
      const messages = getDB(MESSAGES_KEY, INITIAL_MESSAGES);
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      
      const chat = messages.find(m => m.chatId === chatId);
      if (chat) {
        // Determine if active user is brand, creator, or customer
        let senderType = 'brand';
        if (activeUser.role === 'creator') senderType = 'creator';
        if (activeUser.role === 'customer') senderType = 'customer';
        
        const newMsg = {
          sender: senderType,
          text: data.text,
          timestamp: new Date().toISOString()
        };
        chat.messages.push(newMsg);
        setDB(MESSAGES_KEY, messages);
        return mockResponse(chat);
      }
    }
    // Customer Add Favorite
    if (url === '/customer/favorites') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse(null, false, 'Unauthorized');
      const favorites = getDB(CUSTOMER_FAVORITES_KEY, INITIAL_CUSTOMER_FAVORITES);
      const exists = favorites.find(f => f.customerId === activeUser._id && f.brandId === data.brandId);
      if (!exists) {
        favorites.push({ customerId: activeUser._id, brandId: data.brandId, savedAt: new Date().toISOString() });
        setDB(CUSTOMER_FAVORITES_KEY, favorites);
      }
      return mockResponse({ success: true });
    }

    return mockResponse({ success: true });
  },

  put: async (url, data) => {
    // Update Collab Request Status
    if (url.startsWith('/collaborations/')) {
      const id = url.split('/').pop();
      const collabs = getDB(COLLABS_KEY, INITIAL_COLLABS);
      const idx = collabs.findIndex(c => c._id === id);
      if (idx !== -1) {
        collabs[idx].status = data.status;
        setDB(COLLABS_KEY, collabs);
        return mockResponse(collabs[idx]);
      }
      return mockResponse(null, false, 'Collaboration not found');
    }

    // Brand Profile Update
    if (url === '/brands/profile') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      const brands = getDB(BRANDS_KEY, INITIAL_BRANDS);
      const idx = brands.findIndex(b => b.owner?._id === activeUser._id);
      if (idx !== -1) {
        brands[idx] = { ...brands[idx], ...data };
        setDB(BRANDS_KEY, brands);
        return mockResponse(brands[idx]);
      }
    }

    // Creator Profile Update
    if (url === '/creators/profile') {
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      const creators = getDB(CREATORS_KEY, INITIAL_CREATORS);
      const idx = creators.findIndex(c => c.user?._id === activeUser._id);
      if (idx !== -1) {
        creators[idx] = { ...creators[idx], ...data };
        setDB(CREATORS_KEY, creators);
        return mockResponse(creators[idx]);
      }
    }

    return mockResponse({ success: true });
  },

  delete: async (url) => {
    // Delete product
    if (url.startsWith('/products/')) {
      const id = url.split('/').pop();
      let products = getDB(PRODUCTS_KEY, INITIAL_PRODUCTS);
      products = products.filter(p => p._id !== id);
      setDB(PRODUCTS_KEY, products);
      return mockResponse({ success: true });
    }

    // Delete customer favorite
    if (url.startsWith('/customer/favorites/')) {
      const brandId = url.split('/').pop();
      const activeUser = JSON.parse(localStorage.getItem(AUTH_KEY));
      if (!activeUser) return mockResponse(null, false, 'Unauthorized');
      let favorites = getDB(CUSTOMER_FAVORITES_KEY, INITIAL_CUSTOMER_FAVORITES);
      favorites = favorites.filter(f => !(f.customerId === activeUser._id && f.brandId === brandId));
      setDB(CUSTOMER_FAVORITES_KEY, favorites);
      return mockResponse({ success: true });
    }

    return mockResponse({ success: true });
  },

  // Mock interceptors for compatibility
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} }
  }
};

export default api;
