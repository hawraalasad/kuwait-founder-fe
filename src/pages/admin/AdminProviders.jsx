import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../../config/api'

export default function AdminProviders() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    try {
      const res = await api('/api/admin/providers')
      if (res.ok) {
        const data = await res.json()
        setProviders(data)
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      const res = await api(`/api/admin/providers/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Provider deleted')
        setProviders(prev => prev.filter(p => p._id !== id))
      } else {
        toast.error('Failed to delete provider')
      }
    } catch (error) {
      toast.error('Failed to delete provider')
    }
  }

  const filteredProviders = providers.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const priceLabels = {
    budget: 'Budget',
    mid: 'Mid-Range',
    premium: 'Premium'
  }

  const priceColors = {
    budget: 'bg-green-100 text-green-700',
    mid: 'bg-blue-100 text-blue-700',
    premium: 'bg-kuwait-gold/20 text-kuwait-gold'
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
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Service Providers</h1>
          <p className="text-medium-gray">Manage directory listings</p>
        </div>
        <Link to="/admin/providers/new" className="btn-gold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Provider
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search providers..."
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredProviders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-medium-gray mb-4">
              {searchQuery ? 'No providers found' : 'No providers yet'}
            </p>
            {!searchQuery && (
              <Link to="/admin/providers/new" className="btn-primary">
                Add your first provider
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-medium text-medium-gray">Provider</th>
                  <th className="text-left p-4 font-medium text-medium-gray">Categories</th>
                  <th className="text-left p-4 font-medium text-medium-gray">Price Range</th>
                  <th className="text-right p-4 font-medium text-medium-gray">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProviders.map((provider, index) => (
                  <motion.tr
                    key={provider._id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-light-gray rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          {provider.logo ? (
                            <img src={provider.logo} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-medium-gray">
                              {provider.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-midnight-navy">{provider.name}</p>
                          {provider.featured && (
                            <span className="text-xs text-kuwait-gold">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {provider.categories && provider.categories.length > 0 ? (
                          provider.categories.map((cat, idx) => (
                            <span key={idx} className="px-2 py-1 bg-deep-teal/10 text-deep-teal text-sm rounded">
                              {cat?.name || cat}
                            </span>
                          ))
                        ) : provider.category ? (
                          <span className="px-2 py-1 bg-deep-teal/10 text-deep-teal text-sm rounded">
                            {provider.category?.name || 'Uncategorized'}
                          </span>
                        ) : (
                          <span className="text-medium-gray text-sm">Uncategorized</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-sm rounded ${priceColors[provider.priceRange]}`}>
                        {priceLabels[provider.priceRange]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/providers/${provider._id}`}
                          className="p-2 hover:bg-deep-teal/10 rounded-lg text-deep-teal transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(provider._id, provider.name)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
