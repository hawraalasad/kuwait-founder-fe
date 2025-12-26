import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../../config/api'

const iconOptions = [
  'Building', 'Palette', 'Monitor', 'TrendingUp', 'MapPin',
  'Users', 'Settings', 'Calculator', 'AlertTriangle', 'CheckSquare', 'FileText'
]

export default function AdminSectionEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [section, setSection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')
  const [order, setOrder] = useState(1)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('published')

  useEffect(() => {
    fetchSection()
  }, [id])

  const fetchSection = async () => {
    try {
      const res = await api('/api/admin/sections')
      if (res.ok) {
        const data = await res.json()
        const found = data.find(s => s._id === id)
        if (found) {
          setSection(found)
          setTitle(found.title)
          setIcon(found.icon)
          setOrder(found.order)
          setContent(found.content || '')
          setStatus(found.status)
        }
      }
    } catch (error) {
      console.error('Failed to fetch section:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await api(`/api/admin/sections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, icon, order, content, status })
      })

      if (res.ok) {
        toast.success('Section updated successfully')
        navigate('/admin/sections')
      } else {
        toast.error('Failed to update section')
      }
    } catch (error) {
      toast.error('Failed to update section')
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

  if (!section) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <p className="text-medium-gray">Section not found</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/sections')}
          className="flex items-center gap-2 text-medium-gray hover:text-midnight-navy mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sections
        </button>
        <h1 className="text-3xl font-bold text-midnight-navy">Edit Section</h1>
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
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Icon
            </label>
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="input-field"
            >
              {iconOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              min={1}
              max={10}
              className="input-field"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Content
          </label>
          <p className="text-sm text-medium-gray mb-2">
            Supports basic formatting: **bold**, *italic*, ## headings, - bullet lists
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="input-field font-mono text-sm"
            placeholder="Write your content here..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-medium-gray">
            {status === 'published' ? (
              <>
                <Eye className="w-4 h-4 text-green-500" />
                <span>This section is visible to users</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span>This section is hidden</span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/sections')}
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  )
}
