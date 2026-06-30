import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Brands from './pages/Brands';
import BrandProfile from './pages/BrandProfile';
import Creators from './pages/Creators';
import CreatorProfile from './pages/CreatorProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDiscovery from './pages/CustomerDiscovery';
import BrandOnboarding from './pages/BrandOnboarding';
import CreatorOnboarding from './pages/CreatorOnboarding';

// Dashboard Pages
import BrandDashboard from './pages/dashboard/BrandDashboard';
import BrandProfileEdit from './pages/dashboard/BrandProfileEdit';
import BrandProducts from './pages/dashboard/BrandProducts';
import CreatorDashboard from './pages/dashboard/CreatorDashboard';
import CreatorProfileEdit from './pages/dashboard/CreatorProfileEdit';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import BrandAiStudio from './pages/dashboard/BrandAiStudio';
import AiMatching from './pages/dashboard/AiMatching';
import CampaignManagement from './pages/dashboard/CampaignManagement';
import Messages from './pages/dashboard/Messages';
import Notifications from './pages/dashboard/Notifications';
import Settings from './pages/dashboard/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Public Routing */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<CustomerDiscovery />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:id" element={<BrandProfile />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creators/:id" element={<CreatorProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding/brand" element={<BrandOnboarding />} />
            <Route path="/onboarding/creator" element={<CreatorOnboarding />} />
          </Route>

          {/* Protected Brand Dashboard */}
          <Route 
            path="/dashboard/brand" 
            element={
              <ProtectedRoute allowedRoles={['brand_owner']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<BrandDashboard />} />
            <Route path="profile" element={<BrandProfileEdit />} />
            <Route path="products" element={<BrandProducts />} />
            <Route path="collaborations" element={<BrandDashboard />} />
            <Route path="ai-matching" element={<AiMatching />} />
            <Route path="ai-studio" element={<BrandAiStudio />} />
            <Route path="campaigns" element={<CampaignManagement />} />
          </Route>

          {/* Protected Creator Dashboard */}
          <Route 
            path="/dashboard/creator" 
            element={
              <ProtectedRoute allowedRoles={['creator']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CreatorDashboard />} />
            <Route path="profile" element={<CreatorProfileEdit />} />
            <Route path="requests" element={<CreatorDashboard />} />
            <Route path="campaigns" element={<CampaignManagement />} />
          </Route>

          {/* Protected Customer Dashboard */}
          <Route 
            path="/dashboard/customer" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerDashboard />} />
            <Route path="favorites" element={<CustomerDashboard />} />
          </Route>

          {/* Protected Shared Dashboard Pages */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['brand_owner', 'creator', 'customer']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
