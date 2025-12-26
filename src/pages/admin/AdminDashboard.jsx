import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Tag, Clock, ArrowRight } from 'lucide-react'
import { api } from '../../config/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await api('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Dashboard</h1>
        <p className="text-medium-gray">Welcome to the admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-deep-teal/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-deep-teal" />
            </div>
            <div>
              <p className="text-sm text-medium-gray">Service Providers</p>
              <p className="text-3xl font-bold text-midnight-navy">{stats?.providersCount || 0}</p>
            </div>
          </div>
          <Link
            to="/admin/providers"
            className="mt-4 flex items-center gap-2 text-deep-teal hover:text-ocean-blue text-sm font-medium"
          >
            Manage providers <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-kuwait-gold/10 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-kuwait-gold" />
            </div>
            <div>
              <p className="text-sm text-medium-gray">Categories</p>
              <p className="text-3xl font-bold text-midnight-navy">{stats?.categoriesCount || 0}</p>
            </div>
          </div>
          <Link
            to="/admin/categories"
            className="mt-4 flex items-center gap-2 text-deep-teal hover:text-ocean-blue text-sm font-medium"
          >
            Manage categories <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm md:col-span-2 lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-medium-gray">Recent Access</p>
              <p className="text-3xl font-bold text-midnight-navy">{stats?.recentLogs?.length || 0}</p>
            </div>
          </div>
          <Link
            to="/admin/access-log"
            className="mt-4 flex items-center gap-2 text-deep-teal hover:text-ocean-blue text-sm font-medium"
          >
            View access log <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Recent Access Log */}
      <motion.div
        className="bg-white rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-lg text-midnight-navy">Recent Access Log</h2>
        </div>
        <div className="p-6">
          {stats?.recentLogs?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-medium-gray">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">IP Address</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.recentLogs.slice(0, 5).map((log) => (
                    <tr key={log._id}>
                      <td className="py-3 text-sm text-charcoal">{formatDate(log.timestamp)}</td>
                      <td className="py-3 text-sm text-charcoal font-mono">{log.ipAddress || 'Unknown'}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            log.success
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {log.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-medium-gray text-center py-4">No recent access logs</p>
          )}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/admin/sections"
          className="bg-gradient-to-r from-deep-teal to-ocean-blue text-white rounded-xl p-6 hover:opacity-90 transition-opacity"
        >
          <h3 className="font-bold text-lg mb-2">Edit Playbook Content</h3>
          <p className="text-white/80 text-sm">Update the 10 playbook sections</p>
        </Link>
        <Link
          to="/admin/providers/new"
          className="bg-gradient-to-r from-kuwait-gold to-yellow-500 text-midnight-navy rounded-xl p-6 hover:opacity-90 transition-opacity"
        >
          <h3 className="font-bold text-lg mb-2">Add New Provider</h3>
          <p className="text-midnight-navy/80 text-sm">Add a service provider to the directory</p>
        </Link>
      </motion.div>
    </div>
  )
}
