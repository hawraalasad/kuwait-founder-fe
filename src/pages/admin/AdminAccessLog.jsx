import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, RefreshCw, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminAccessLog() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [clearing, setClearing] = useState(false)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/access-log', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setLogs(data)
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    if (!window.confirm('Are you sure you want to clear all access logs?')) {
      return
    }

    setClearing(true)
    try {
      const res = await fetch('/api/admin/access-log', {
        method: 'DELETE',
        credentials: 'include'
      })

      if (res.ok) {
        setLogs([])
        toast.success('Access log cleared')
      } else {
        toast.error('Failed to clear log')
      }
    } catch (error) {
      toast.error('Failed to clear log')
    } finally {
      setClearing(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const formatUserAgent = (ua) => {
    if (!ua) return 'Unknown'
    // Simplified user agent parsing
    if (ua.includes('Mobile')) return 'Mobile'
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari')) return 'Safari'
    return 'Other'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Access Log</h1>
          <p className="text-medium-gray">View login attempts and access history</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchLogs}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleClear}
            disabled={clearing || logs.length === 0}
            className="btn-outline flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear Log
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-medium-gray">No access logs yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-medium text-medium-gray">Timestamp</th>
                  <th className="text-left p-4 font-medium text-medium-gray">IP Address</th>
                  <th className="text-left p-4 font-medium text-medium-gray">Browser</th>
                  <th className="text-left p-4 font-medium text-medium-gray">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log, index) => (
                  <motion.tr
                    key={log._id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <td className="p-4 text-sm text-charcoal">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="p-4 text-sm text-charcoal font-mono">
                      {log.ipAddress || 'Unknown'}
                    </td>
                    <td className="p-4 text-sm text-charcoal">
                      {formatUserAgent(log.userAgent)}
                    </td>
                    <td className="p-4">
                      {log.success ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          <Check className="w-3 h-3" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                          <X className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {logs.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <p className="text-sm text-medium-gray">
              Showing {logs.length} log entries (most recent first)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
