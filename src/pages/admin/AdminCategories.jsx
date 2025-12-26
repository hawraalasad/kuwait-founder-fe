import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../../config/api'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [newName, setNewName] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api('/api/admin/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!newName.trim()) return
    setSaving(true)

    try {
      const res = await api('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() })
      })

      if (res.ok) {
        const category = await res.json()
        setCategories(prev => [...prev, category])
        setNewName('')
        setShowAdd(false)
        toast.success('Category created')
      } else {
        toast.error('Failed to create category')
      }
    } catch (error) {
      toast.error('Failed to create category')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async (id) => {
    if (!editingName.trim()) return
    setSaving(true)

    try {
      const res = await api(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName.trim() })
      })

      if (res.ok) {
        const updated = await res.json()
        setCategories(prev => prev.map(c => c._id === id ? updated : c))
        setEditingId(null)
        toast.success('Category updated')
      } else {
        toast.error('Failed to update category')
      }
    } catch (error) {
      toast.error('Failed to update category')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This will fail if providers are using this category.`)) {
      return
    }

    try {
      const res = await api(`/api/admin/categories/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setCategories(prev => prev.filter(c => c._id !== id))
        toast.success('Category deleted')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to delete category')
      }
    } catch (error) {
      toast.error('Failed to delete category')
    }
  }

  const startEdit = (category) => {
    setEditingId(category._id)
    setEditingName(category.name)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName('')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
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
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Categories</h1>
          <p className="text-medium-gray">Manage service provider categories</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-gold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Add form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-gray-100 overflow-hidden"
            >
              <div className="p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Category name"
                    className="input-field flex-1"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                  />
                  <button
                    onClick={handleAdd}
                    disabled={saving || !newName.trim()}
                    className="btn-gold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowAdd(false)
                      setNewName('')
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-medium-gray" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories list */}
        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-medium-gray mb-4">No categories yet</p>
            <button
              onClick={() => setShowAdd(true)}
              className="btn-primary"
            >
              Add your first category
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                className="p-4 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                {editingId === category._id ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="input-field flex-1"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && handleEdit(category._id)}
                    />
                    <button
                      onClick={() => handleEdit(category._id)}
                      disabled={saving}
                      className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 hover:bg-gray-200 rounded-lg text-medium-gray transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-deep-teal/10 rounded-lg flex items-center justify-center text-deep-teal font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-midnight-navy">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 hover:bg-deep-teal/10 rounded-lg text-deep-teal transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id, category.name)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
