import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Copy,
  Trash2,
  Edit2,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  X,
  Check,
  Clock,
  User,
  Phone,
  Mail,
  Key,
  Zap
} from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../../config/api'

function AccessCodeModal({ isOpen, onClose, onSave, editingCode }) {
  const [formData, setFormData] = useState({
    code: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: '',
    maxUsage: 0,
    expiresAt: ''
  })
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (editingCode) {
      setFormData({
        code: editingCode.code || '',
        customerName: editingCode.customerName || '',
        customerPhone: editingCode.customerPhone || '',
        customerEmail: editingCode.customerEmail || '',
        notes: editingCode.notes || '',
        maxUsage: editingCode.maxUsage || 0,
        expiresAt: editingCode.expiresAt ? new Date(editingCode.expiresAt).toISOString().split('T')[0] : ''
      })
    } else {
      setFormData({
        code: '',
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        notes: '',
        maxUsage: 0,
        expiresAt: ''
      })
    }
  }, [editingCode, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave(formData, !!editingCode)
      onClose()
    } catch (error) {
      // Error handled in parent
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await api('/api/admin/access-codes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          notes: formData.notes,
          maxUsage: formData.maxUsage || 0,
          expiresAt: formData.expiresAt || null
        })
      })

      if (!res.ok) throw new Error('Failed to generate code')

      const data = await res.json()
      toast.success(`Code generated: ${data.code}`)
      onClose()
      window.location.reload()
    } catch (error) {
      toast.error('Failed to generate code')
    } finally {
      setGenerating(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-light-gray">
          <h2 className="text-xl font-bold text-midnight-navy">
            {editingCode ? 'Edit Access Code' : 'Create Access Code'}
          </h2>
          <button onClick={onClose} className="text-medium-gray hover:text-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!editingCode && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Key className="w-4 h-4 inline mr-2" />
                Access Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="Enter custom code or generate"
                  className="input-field flex-1"
                  required={!editingCode}
                />
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="btn-secondary flex items-center gap-2 whitespace-nowrap"
                >
                  <Zap className="w-4 h-4" />
                  {generating ? 'Generating...' : 'Auto Generate'}
                </button>
              </div>
              <p className="text-xs text-medium-gray mt-1">
                Leave empty and click Auto Generate to create a random code with the info below
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Customer Name
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="Customer's name"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </label>
              <input
                type="text"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="+965..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                placeholder="email@example.com"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any notes about this customer..."
              className="input-field"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Max Usage (0 = unlimited)
              </label>
              <input
                type="number"
                value={formData.maxUsage}
                onChange={(e) => setFormData({ ...formData, maxUsage: parseInt(e.target.value) || 0 })}
                min="0"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Expires On
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading || (!editingCode && !formData.code)} className="btn-primary flex-1">
              {loading ? 'Saving...' : editingCode ? 'Update' : 'Create Code'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminAccessCodes() {
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingCode, setEditingCode] = useState(null)

  useEffect(() => {
    fetchCodes()
  }, [])

  const fetchCodes = async () => {
    try {
      const res = await api('/api/admin/access-codes')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setCodes(data)
    } catch (error) {
      toast.error('Failed to load access codes')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (formData, isEditing) => {
    try {
      const url = isEditing
        ? `/api/admin/access-codes/${editingCode._id}`
        : '/api/admin/access-codes'

      const res = await api(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt || null
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      toast.success(isEditing ? 'Access code updated' : 'Access code created')
      fetchCodes()
      setEditingCode(null)
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  const handleToggle = async (code) => {
    try {
      const res = await api(`/api/admin/access-codes/${code._id}/toggle`, {
        method: 'PATCH'
      })

      if (!res.ok) throw new Error('Failed to toggle')

      toast.success(code.isActive ? 'Code deactivated' : 'Code activated')
      fetchCodes()
    } catch (error) {
      toast.error('Failed to toggle code status')
    }
  }

  const handleDelete = async (code) => {
    if (!window.confirm(`Delete access code "${code.code}"? This cannot be undone.`)) {
      return
    }

    try {
      const res = await api(`/api/admin/access-codes/${code._id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast.success('Access code deleted')
      fetchCodes()
    } catch (error) {
      toast.error('Failed to delete code')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const filteredCodes = codes.filter(code => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      code.code.toLowerCase().includes(query) ||
      code.customerName?.toLowerCase().includes(query) ||
      code.customerPhone?.includes(query) ||
      code.customerEmail?.toLowerCase().includes(query)
    )
  })

  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-light-gray rounded-lg animate-pulse"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-light-gray rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-midnight-navy">Access Codes</h1>
          <p className="text-medium-gray">Manage customer access passwords</p>
        </div>
        <button
          onClick={() => { setEditingCode(null); setShowModal(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Code
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by code, name, phone, or email..."
          className="input-field pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-medium-gray">Total Codes</p>
          <p className="text-2xl font-bold text-midnight-navy">{codes.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-medium-gray">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {codes.filter(c => c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-medium-gray">Inactive</p>
          <p className="text-2xl font-bold text-red-500">
            {codes.filter(c => !c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-medium-gray">Total Usage</p>
          <p className="text-2xl font-bold text-deep-teal">
            {codes.reduce((sum, c) => sum + c.usageCount, 0)}
          </p>
        </div>
      </div>

      {/* Codes List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredCodes.length === 0 ? (
          <div className="p-12 text-center">
            <Key className="w-12 h-12 text-medium-gray mx-auto mb-4" />
            <h3 className="font-bold text-midnight-navy mb-2">
              {searchQuery ? 'No codes found' : 'No access codes yet'}
            </h3>
            <p className="text-medium-gray mb-4">
              {searchQuery ? 'Try a different search' : 'Create your first access code to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => { setEditingCode(null); setShowModal(true) }}
                className="btn-primary"
              >
                Create Access Code
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-gray">
                <tr>
                  <th className="text-left p-4 font-semibold text-charcoal">Code</th>
                  <th className="text-left p-4 font-semibold text-charcoal">Customer</th>
                  <th className="text-left p-4 font-semibold text-charcoal hidden md:table-cell">Usage</th>
                  <th className="text-left p-4 font-semibold text-charcoal hidden lg:table-cell">Last Used</th>
                  <th className="text-left p-4 font-semibold text-charcoal">Status</th>
                  <th className="text-right p-4 font-semibold text-charcoal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.map((code) => (
                  <tr key={code._id} className="border-t border-light-gray hover:bg-off-white">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-light-gray px-2 py-1 rounded font-mono text-sm">
                          {code.code}
                        </code>
                        <button
                          onClick={() => copyToClipboard(code.code)}
                          className="text-medium-gray hover:text-deep-teal"
                          title="Copy"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-midnight-navy">
                          {code.customerName || '-'}
                        </p>
                        <p className="text-sm text-medium-gray">
                          {code.customerPhone || code.customerEmail || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-charcoal">
                        {code.usageCount}
                        {code.maxUsage > 0 && ` / ${code.maxUsage}`}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-medium-gray">
                      {formatDate(code.lastUsedAt)}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggle(code)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          code.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {code.isActive ? (
                          <>
                            <ToggleRight className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-3 h-3" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditingCode(code); setShowModal(true) }}
                          className="p-2 text-medium-gray hover:text-deep-teal rounded-lg hover:bg-light-gray"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(code)}
                          className="p-2 text-medium-gray hover:text-red-500 rounded-lg hover:bg-light-gray"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AccessCodeModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingCode(null) }}
        onSave={handleSave}
        editingCode={editingCode}
      />
    </div>
  )
}
