import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Public Pages
import LandingPage from './pages/LandingPage'
import AccessPage from './pages/AccessPage'
import DirectoryPage from './pages/DirectoryPage'

// Protected Pages
import PlaybookLayout from './pages/playbook/PlaybookLayout'
import PlaybookDashboard from './pages/playbook/PlaybookDashboard'
import Directory from './pages/playbook/Directory'
import Checklists from './pages/playbook/Checklists'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminSections from './pages/admin/AdminSections'
import AdminSectionEdit from './pages/admin/AdminSectionEdit'
import AdminProviders from './pages/admin/AdminProviders'
import AdminProviderForm from './pages/admin/AdminProviderForm'
import AdminCategories from './pages/admin/AdminCategories'
import AdminChecklists from './pages/admin/AdminChecklists'
import AdminChecklistForm from './pages/admin/AdminChecklistForm'
import AdminAccessCodes from './pages/admin/AdminAccessCodes'
import AdminAccessLog from './pages/admin/AdminAccessLog'
import AdminAnalytics from './pages/admin/AdminAnalytics'

// Loading component
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-deep-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-medium-gray">Loading...</p>
      </div>
    </div>
  )
}

// Protected route wrapper for playbook pages
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/access" replace />
  }

  return children
}

// Protected route wrapper for admin pages
function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/access" element={<AccessPage />} />

      {/* Protected Playbook Routes (for future use) */}
      <Route
        path="/playbook"
        element={
          <ProtectedRoute>
            <PlaybookLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/playbook/dashboard" replace />} />
        <Route path="dashboard" element={<PlaybookDashboard />} />
        <Route path="directory" element={<Directory />} />
        <Route path="checklists" element={<Checklists />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="sections" element={<AdminSections />} />
        <Route path="sections/:id" element={<AdminSectionEdit />} />
        <Route path="providers" element={<AdminProviders />} />
        <Route path="providers/new" element={<AdminProviderForm />} />
        <Route path="providers/:id" element={<AdminProviderForm />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="checklists" element={<AdminChecklists />} />
        <Route path="checklists/new" element={<AdminChecklistForm />} />
        <Route path="checklists/:id" element={<AdminChecklistForm />} />
        <Route path="access-codes" element={<AdminAccessCodes />} />
        <Route path="access-log" element={<AdminAccessLog />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
