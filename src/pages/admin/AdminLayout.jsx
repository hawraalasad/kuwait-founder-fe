import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Users,
  Tag,
  CheckSquare,
  Key,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { adminLogout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await adminLogout()
    toast.success('Logged out from admin')
    navigate('/admin/login')
  }

  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/sections', label: 'Playbook Sections', icon: FileText },
    { to: '/admin/providers', label: 'Service Providers', icon: Users },
    { to: '/admin/categories', label: 'Categories', icon: Tag },
    { to: '/admin/checklists', label: 'Checklists', icon: CheckSquare },
    { to: '/admin/access-codes', label: 'Access Codes', icon: Key },
    { to: '/admin/access-log', label: 'Access Log', icon: ClipboardList }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-midnight-navy text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-kuwait-gold" />
            <span className="font-bold">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Overlay for mobile */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-64 bg-midnight-navy text-white z-50 lg:z-30 flex flex-col"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              {/* Logo */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-kuwait-gold" />
                  <div>
                    <span className="font-bold block">Admin Panel</span>
                    <span className="text-xs text-white/60">Kuwait Founder Playbook</span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.end}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-kuwait-gold text-midnight-navy'
                              : 'text-white/80 hover:bg-white/10'
                          }`
                        }
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-white/80 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
