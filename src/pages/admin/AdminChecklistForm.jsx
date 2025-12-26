import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../../config/api'

export default function AdminChecklistForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const [order, setOrder] = useState(0)
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    if (isEditing) {
      fetchChecklist()
    }
  }, [id])

  const fetchChecklist = async () => {
    try {
      const res = await api('/api/admin/checklists')
      if (res.ok) {
        const data = await res.json()
        const checklist = data.find(c => c._id === id)
        if (checklist) {
          setTitle(checklist.title)
          setItems(checklist.items || [])
          setOrder(checklist.order || 0)
        }
      }
    } catch (error) {
      console.error('Failed to fetch checklist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = () => {
    if (!newItem.trim()) return
    setItems(prev => [
      ...prev,
      {
        _id: `temp-${Date.now()}`,
        text: newItem.trim(),
        order: prev.length
      }
    ])
    setNewItem('')
  }

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(item => item._id !== itemId))
  }

  const updateItemText = (itemId, text) => {
    setItems(prev =>
      prev.map(item =>
        item._id === itemId ? { ...item, text } : item
      )
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) {
      toast.error('Please add at least one item')
      return
    }
    setSaving(true)

    try {
      const payload = {
        title,
        items: items.map((item, index) => ({
          text: item.text,
          order: index
        })),
        order
      }

      const url = isEditing
        ? `/api/admin/checklists/${id}`
        : '/api/admin/checklists'

      const res = await api(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        toast.success(isEditing ? 'Checklist updated' : 'Checklist created')
        navigate('/admin/checklists')
      } else {
        toast.error('Failed to save checklist')
      }
    } catch (error) {
      toast.error('Failed to save checklist')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/checklists')}
          className="flex items-center gap-2 text-medium-gray hover:text-midnight-navy mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to checklists
        </button>
        <h1 className="text-3xl font-bold text-midnight-navy">
          {isEditing ? 'Edit Checklist' : 'Create New Checklist'}
        </h1>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Checklist Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="e.g., Business Setup Checklist"
              required
            />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              className="input-field"
              min={0}
            />
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Checklist Items
          </label>

          {/* Add new item */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="input-field flex-1"
              placeholder="Add a new item..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
            />
            <button
              type="button"
              onClick={addItem}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Items list */}
          {items.length === 0 ? (
            <div className="p-8 bg-gray-50 rounded-lg text-center">
              <p className="text-medium-gray">No items yet. Add your first item above.</p>
            </div>
          ) : (
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={setItems}
              className="space-y-2"
            >
              {items.map((item) => (
                <Reorder.Item
                  key={item._id}
                  value={item}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
                >
                  <div className="cursor-grab active:cursor-grabbing text-medium-gray hover:text-charcoal">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateItemText(item._id, e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-charcoal"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                    className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
          <p className="text-sm text-medium-gray mt-2">
            Drag items to reorder. {items.length} item{items.length !== 1 ? 's' : ''} total.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/admin/checklists')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-gold flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-midnight-navy border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Checklist' : 'Create Checklist'}
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  )
}
