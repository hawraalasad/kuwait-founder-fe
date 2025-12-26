import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Edit, Eye, EyeOff } from 'lucide-react'
import { api } from '../../config/api'

export default function AdminSections() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      const res = await api('/api/admin/sections')
      if (res.ok) {
        const data = await res.json()
        setSections(data)
      }
    } catch (error) {
      console.error('Failed to fetch sections:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Playbook Sections</h1>
        <p className="text-medium-gray">Edit the content of your 10 playbook sections</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {sections.map((section, index) => (
            <motion.div
              key={section._id}
              className="p-4 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-deep-teal/10 rounded-lg flex items-center justify-center text-deep-teal font-bold">
                  {section.order}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-midnight-navy truncate">{section.title}</h3>
                    {section.status === 'draft' && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-medium-gray">
                    {section.content ? `${section.content.slice(0, 100)}...` : 'No content yet'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {section.status === 'published' ? (
                    <Eye className="w-5 h-5 text-green-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-medium-gray" />
                  )}
                  <Link
                    to={`/admin/sections/${section._id}`}
                    className="p-2 hover:bg-deep-teal/10 rounded-lg text-deep-teal transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
