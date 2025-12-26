import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Book,
  Search,
  CheckSquare,
  LogOut,
  Menu,
  X,
  Building,
  Palette,
  Monitor,
  TrendingUp,
  MapPin,
  Users,
  Settings,
  Calculator,
  AlertTriangle
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import LanguageToggle from '../../components/LanguageToggle'
import toast from 'react-hot-toast'

const sectionIcons = {
  'business-setup': Building,
  'branding-identity': Palette,
  'digital-tech': Monitor,
  'marketing-growth': TrendingUp,
  'offices-logistics': MapPin,
  'hiring-employees': Users,
  'operations-tools': Settings,
  'sample-budgets': Calculator,
  'common-mistakes': AlertTriangle,
  'checklists-action': CheckSquare
}

export default function PlaybookLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const { t, isRTL } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success(isRTL ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully')
    navigate('/')
  }

  const navLinks = [
    { to: '/playbook/directory', label: t('directory'), icon: Search },
    { to: '/playbook/dashboard', label: t('playbook'), icon: Book },
    { to: '/playbook/checklists', label: t('checklists'), icon: CheckSquare }
  ]

  return (
    <div className="min-h-screen bg-off-white">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-light-gray">
        <div className="flex items-center justify-between px-4 py-3">
          <img src="/assets/logo-primary-v2.svg" alt="Kuwait Founder Playbook" className="h-8" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-charcoal hover:bg-light-gray rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
              className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-64 bg-white border-${isRTL ? 'l' : 'r'} border-light-gray z-50 lg:z-30 flex flex-col`}
              initial={{ x: isRTL ? 256 : -256 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 256 : -256 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              {/* Logo */}
              <div className="p-6 border-b border-light-gray flex items-center justify-between">
                <img src="/assets/logo-primary-v2.svg" alt="Kuwait Founder Playbook" className="h-10" />
                <div className="hidden lg:block">
                  <LanguageToggle />
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
                              ? 'bg-deep-teal text-white'
                              : 'text-charcoal hover:bg-light-gray'
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
              <div className="p-4 border-t border-light-gray">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-medium-gray hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('logout')}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`${isRTL ? 'lg:mr-64' : 'lg:ml-64'} pt-16 lg:pt-0 min-h-screen`}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
