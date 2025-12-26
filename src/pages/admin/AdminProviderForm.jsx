import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import API_BASE_URL, { api } from '../../config/api'

export default function AdminProviderForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState('mid')
  const [bestFor, setBestFor] = useState('')
  const [contactWhatsApp, setContactWhatsApp] = useState('')
  const [contactInstagram, setContactInstagram] = useState('')
  const [contactWebsite, setContactWebsite] = useState('')
  const [practicalNotes, setPracticalNotes] = useState('')
  const [featured, setFeatured] = useState(false)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const catRes = await api('/api/admin/categories')
      if (catRes.ok) {
        const catData = await catRes.json()
        setCategories(catData)
        if (catData.length > 0 && !category) {
          setCategory(catData[0]._id)
        }
      }

      if (isEditing) {
        const provRes = await api('/api/admin/providers')
        if (provRes.ok) {
          const providers = await provRes.json()
          const provider = providers.find(p => p._id === id)
          if (provider) {
            setName(provider.name)
            setDescription(provider.description || '')
            setLogoPreview(provider.logo || '')
            setCategory(provider.category?._id || '')
            setPriceRange(provider.priceRange)
            setBestFor(provider.bestFor?.join(', ') || '')
            setContactWhatsApp(provider.contactWhatsApp || '')
            setContactInstagram(provider.contactInstagram || '')
            setContactWebsite(provider.contactWebsite || '')
            setPracticalNotes(provider.practicalNotes || '')
            setFeatured(provider.featured || false)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 500 * 1024) {
        toast.error('Logo must be less than 500KB')
        return
      }
      setLogo(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('priceRange', priceRange)
      formData.append('bestFor', bestFor)
      formData.append('contactWhatsApp', contactWhatsApp)
      formData.append('contactInstagram', contactInstagram)
      formData.append('contactWebsite', contactWebsite)
      formData.append('practicalNotes', practicalNotes)
      formData.append('featured', featured)
      if (logo) {
        formData.append('logo', logo)
      }

      const endpoint = isEditing
        ? `/api/admin/providers/${id}`
        : '/api/admin/providers'

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: isEditing ? 'PUT' : 'POST',
        credentials: 'include',
        body: formData
      })

      if (res.ok) {
        toast.success(isEditing ? 'Provider updated' : 'Provider created')
        navigate('/admin/providers')
      } else {
        toast.error('Failed to save provider')
      }
    } catch (error) {
      toast.error('Failed to save provider')
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
          onClick={() => navigate('/admin/providers')}
          className="flex items-center gap-2 text-medium-gray hover:text-midnight-navy mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to providers
        </button>
        <h1 className="text-3xl font-bold text-midnight-navy">
          {isEditing ? 'Edit Provider' : 'Add New Provider'}
        </h1>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="input-field"
            >
              <option value="budget">Budget</option>
              <option value="mid">Mid-Range</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Best For */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Best For (comma-separated tags)
            </label>
            <input
              type="text"
              value={bestFor}
              onChange={(e) => setBestFor(e.target.value)}
              placeholder="e.g., Startups, E-commerce, Restaurants"
              className="input-field"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-field"
            placeholder="Describe what this provider offers..."
          />
        </div>

        {/* Logo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Logo (max 500KB)
          </label>
          <div className="flex items-start gap-4">
            {logoPreview && (
              <div className="relative w-20 h-20 bg-light-gray rounded-lg overflow-hidden">
                <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setLogo(null)
                    setLogoPreview('')
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-light-gray rounded-lg cursor-pointer hover:border-deep-teal transition-colors">
              <Upload className="w-5 h-5 text-medium-gray" />
              <span className="text-medium-gray">Upload logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={contactWhatsApp}
              onChange={(e) => setContactWhatsApp(e.target.value)}
              placeholder="+965XXXXXXXX"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Instagram Handle
            </label>
            <input
              type="text"
              value={contactInstagram}
              onChange={(e) => setContactInstagram(e.target.value)}
              placeholder="username (without @)"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={contactWebsite}
              onChange={(e) => setContactWebsite(e.target.value)}
              placeholder="https://example.com"
              className="input-field"
            />
          </div>
        </div>

        {/* Practical Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Practical Notes
          </label>
          <textarea
            value={practicalNotes}
            onChange={(e) => setPracticalNotes(e.target.value)}
            rows={3}
            className="input-field"
            placeholder="Add notes about working with this provider..."
          />
        </div>

        {/* Featured */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-light-gray text-kuwait-gold focus:ring-kuwait-gold"
            />
            <span className="text-charcoal">Featured provider</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/admin/providers')}
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
                {isEditing ? 'Update Provider' : 'Create Provider'}
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  )
}
