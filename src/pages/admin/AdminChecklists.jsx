import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, CheckSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminChecklists() {
  const [checklists, setChecklists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChecklists()
  }, [])

  const fetchChecklists = async () => {
    try {
      const res = await fetch('/api/admin/checklists', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setChecklists(data)
      }
    } catch (error) {
      console.error('Failed to fetch checklists:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/checklists/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (res.ok) {
        setChecklists(prev => prev.filter(c => c._id !== id))
        toast.success('Checklist deleted')
      } else {
        toast.error('Failed to delete checklist')
      }
    } catch (error) {
      toast.error('Failed to delete checklist')
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Checklists</h1>
          <p className="text-medium-gray">Manage interactive checklists</p>
        </div>
        <Link to="/admin/checklists/new" className="btn-gold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Checklist
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {checklists.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-medium-gray mb-4">No checklists yet</p>
            <Link to="/admin/checklists/new" className="btn-primary">
              Create your first checklist
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {checklists.map((checklist, index) => (
              <motion.div
                key={checklist._id}
                className="p-4 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-kuwait-gold/10 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-kuwait-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-midnight-navy">{checklist.title}</h3>
                      <p className="text-sm text-medium-gray">
                        {checklist.items?.length || 0} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/checklists/${checklist._id}`}
                      className="p-2 hover:bg-deep-teal/10 rounded-lg text-deep-teal transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(checklist._id, checklist.title)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
