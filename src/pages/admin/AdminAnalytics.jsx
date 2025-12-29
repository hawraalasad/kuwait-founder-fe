import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, Eye, TrendingUp, Calendar } from 'lucide-react'
import { api } from '../../config/api'

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAnalytics()
  }, [days])

  const fetchAnalytics = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api(`/api/admin/analytics?days=${days}`)
      if (!res.ok) throw new Error('Failed to fetch analytics')
      const data = await res.json()
      setAnalytics(data)
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
      setError('Failed to load analytics data')
    }
    setLoading(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button onClick={fetchAnalytics} className="mt-4 btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  // Calculate max value for chart scaling
  const maxVisits = analytics?.daily?.length > 0
    ? Math.max(...analytics.daily.map(d => d.totalVisits), 1)
    : 1

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Analytics</h1>
          <p className="text-medium-gray">{analytics?.period || `Last ${days} days`}</p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-medium-gray" />
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="input-field w-40"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-medium-gray mb-1">Today's Visits</p>
          <p className="text-3xl font-bold text-midnight-navy">{analytics?.today?.totalVisits || 0}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-medium-gray mb-1">Today's Users</p>
          <p className="text-3xl font-bold text-midnight-navy">{analytics?.today?.uniqueUsers || 0}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-medium-gray mb-1">Total Visits ({days}d)</p>
          <p className="text-3xl font-bold text-midnight-navy">{analytics?.totals?.totalVisits || 0}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-kuwait-gold/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-kuwait-gold" />
            </div>
          </div>
          <p className="text-sm text-medium-gray mb-1">Unique Users ({days}d)</p>
          <p className="text-3xl font-bold text-midnight-navy">{analytics?.totals?.uniqueUsers || 0}</p>
        </motion.div>
      </div>

      {/* Simple Bar Chart */}
      {analytics?.daily?.length > 0 && (
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-bold text-lg text-midnight-navy mb-6">Daily Visits</h2>
          <div className="h-64 flex items-end gap-1 overflow-x-auto pb-2">
            {[...analytics.daily].reverse().map((day, index) => {
              const height = (day.totalVisits / maxVisits) * 100
              return (
                <div
                  key={day.date}
                  className="flex-1 min-w-[24px] flex flex-col items-center group"
                >
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[40px] bg-deep-teal hover:bg-ocean-blue transition-colors rounded-t cursor-pointer"
                      style={{ height: `${Math.max(height, 4)}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-midnight-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {day.totalVisits} visits
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-medium-gray mt-2 transform -rotate-45 origin-top-left whitespace-nowrap">
                    {formatDate(day.date)}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Daily Breakdown Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-bold text-lg text-midnight-navy">Daily Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-medium-gray">Date</th>
                <th className="text-right p-4 font-medium text-medium-gray">Visits</th>
                <th className="text-right p-4 font-medium text-medium-gray">Unique Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analytics?.daily?.length > 0 ? (
                analytics.daily.map((day) => (
                  <tr key={day.date} className="hover:bg-gray-50">
                    <td className="p-4 text-charcoal">{formatDate(day.date)}</td>
                    <td className="p-4 text-right font-medium text-midnight-navy">{day.totalVisits}</td>
                    <td className="p-4 text-right font-medium text-midnight-navy">{day.uniqueUsers}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-medium-gray">
                    No data available for this period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
