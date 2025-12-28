import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  MessageCircle,
  Instagram,
  Globe,
  ChevronDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import { api } from '../config/api'

function ProviderCard({ provider, onExpand, isExpanded, t, isRTL }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      layout
    >
      <div
        className="p-6 cursor-pointer hover:bg-light-gray/30 transition-colors"
        onClick={onExpand}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-light-gray rounded-lg flex items-center justify-center overflow-hidden">
            {provider.logo ? (
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-medium-gray">
                {provider.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-midnight-navy truncate">
                {isRTL && provider.nameAr ? provider.nameAr : provider.name}
              </h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-medium-gray flex-shrink-0" />
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {provider.categories && provider.categories.length > 0 ? (
                provider.categories.map((cat, idx) => (
                  <span key={idx} className="px-2 py-1 bg-deep-teal/10 text-deep-teal text-xs font-medium rounded">
                    {isRTL && cat?.nameAr ? cat.nameAr : cat?.name || cat}
                  </span>
                ))
              ) : provider.category && (
                <span className="px-2 py-1 bg-deep-teal/10 text-deep-teal text-xs font-medium rounded">
                  {isRTL && provider.category.nameAr ? provider.category.nameAr : provider.category.name}
                </span>
              )}
            </div>

            <p className="text-sm text-medium-gray mt-2 line-clamp-2">
              {isRTL && provider.descriptionAr ? provider.descriptionAr : provider.description}
            </p>

            {provider.bestFor && provider.bestFor.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {provider.bestFor.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-warm-sand text-charcoal text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {provider.bestFor.length > 3 && (
                  <span className="text-xs text-medium-gray">
                    +{provider.bestFor.length - 3} {isRTL ? 'المزيد' : 'more'}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-light-gray"
          >
            <div className="p-6 bg-off-white/50">
              {provider.description && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-midnight-navy mb-2">{t('about')}</h4>
                  <p className="text-charcoal">
                    {isRTL && provider.descriptionAr ? provider.descriptionAr : provider.description}
                  </p>
                </div>
              )}

              {provider.practicalNotes && (
                <div className="mb-4 p-4 bg-kuwait-gold/10 rounded-lg">
                  <h4 className="font-semibold text-sm text-midnight-navy mb-2">{t('practicalNotes')}</h4>
                  <p className="text-charcoal text-sm">
                    {isRTL && provider.practicalNotesAr ? provider.practicalNotesAr : provider.practicalNotes}
                  </p>
                </div>
              )}

              {provider.bestFor && provider.bestFor.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-midnight-navy mb-2">{t('bestFor')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.bestFor.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-warm-sand text-charcoal text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4 border-t border-light-gray">
                {provider.contactWhatsApp && (
                  <a
                    href={`https://wa.me/${provider.contactWhatsApp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isRTL ? 'واتساب' : 'WhatsApp'}
                  </a>
                )}
                {provider.contactInstagram && (
                  <a
                    href={`https://instagram.com/${provider.contactInstagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    {isRTL ? 'انستغرام' : 'Instagram'}
                  </a>
                )}
                {provider.contactWebsite && (
                  <a
                    href={provider.contactWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-deep-teal text-white rounded-lg hover:bg-ocean-blue transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    {isRTL ? 'الموقع' : 'Website'}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProviders, setAllProviders] = useState([]) // All providers, shuffled
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [expandedId, setExpandedId] = useState(null)
  const [visibleCount, setVisibleCount] = useState(10)

  const { t, isRTL } = useLanguage()
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  // Fetch all data once on mount
  useEffect(() => {
    fetchCategories()
    fetchProviders()
  }, [])

  // Update URL when category changes (use replace to not break browser back button)
  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [selectedCategory])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(10)
  }, [searchQuery, selectedCategory])

  const fetchCategories = async () => {
    try {
      const res = await api('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error('Failed to fetch categories')
    }
  }

  const fetchProviders = async () => {
    try {
      setLoading(true)
      const res = await api('/api/providers')
      if (!res.ok) throw new Error('Failed to fetch providers')

      const data = await res.json()
      const providersData = data.providers || data
      // Shuffle once on load for random order
      setAllProviders(shuffleArray(providersData))
    } catch (err) {
      setError(isRTL ? 'فشل تحميل الدليل. يرجى المحاولة مرة أخرى.' : 'Failed to load directory. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Client-side filtering
  const filteredProviders = allProviders.filter(provider => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = provider.name?.toLowerCase().includes(query) ||
                          provider.nameAr?.toLowerCase().includes(query)
      const matchesDesc = provider.description?.toLowerCase().includes(query) ||
                          provider.descriptionAr?.toLowerCase().includes(query)
      if (!matchesName && !matchesDesc) return false
    }

    // Category filter
    if (selectedCategory) {
      const hasCategory = provider.categories?.some(cat =>
        cat._id === selectedCategory || cat === selectedCategory
      ) || provider.category?._id === selectedCategory
      if (!hasCategory) return false
    }

    return true
  })

  // Client-side pagination
  const visibleProviders = filteredProviders.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProviders.length

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
  }

  const hasActiveFilters = searchQuery || selectedCategory

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-white border-b border-light-gray sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src="/assets/logo-primary-v2.svg" alt="Kuwait Founder" className="h-10" />
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-medium-gray hover:text-midnight-navy mb-6 transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          {t('backToHome')}
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-midnight-navy">
            {t('serviceProviderDirectory')}
          </h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-12 bg-white rounded-lg animate-pulse"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-light-gray rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-light-gray rounded w-1/3"></div>
                    <div className="h-4 bg-light-gray rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button onClick={fetchProviders} className="mt-4 btn-primary">
              {isRTL ? 'حاول مرة أخرى' : 'Try Again'}
            </button>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              {/* Search bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchProviders')}
                    className={`input-field ${isRTL ? 'pr-10' : 'pl-10'}`}
                  />
                </div>

                {/* Desktop dropdown */}
                <div className="hidden md:flex items-center gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field w-48"
                  >
                    <option value="">{t('allCategories')}</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {isRTL && cat.nameAr ? cat.nameAr : cat.name}
                      </option>
                    ))}
                  </select>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-medium-gray hover:text-red-500 transition-colors"
                    >
                      {isRTL ? 'مسح' : 'Clear'}
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile category chips - horizontally scrollable */}
              <div className="md:hidden mt-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 pb-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !selectedCategory
                        ? 'bg-deep-teal text-white'
                        : 'bg-light-gray text-charcoal hover:bg-gray-200'
                    }`}
                  >
                    {t('allCategories')}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat._id}
                      onClick={() => setSelectedCategory(cat._id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat._id
                          ? 'bg-deep-teal text-white'
                          : 'bg-light-gray text-charcoal hover:bg-gray-200'
                      }`}
                    >
                      {isRTL && cat.nameAr ? cat.nameAr : cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-medium-gray mb-4">
              {t('showing')} {visibleProviders.length} {isRTL ? 'من' : 'of'} {filteredProviders.length} {t('providers')}
            </p>

            {/* Providers Grid */}
            {filteredProviders.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <Search className="w-12 h-12 text-medium-gray mx-auto mb-4" />
                <h3 className="font-bold text-midnight-navy mb-2">{t('noProvidersFound')}</h3>
                <p className="text-medium-gray mb-4">{t('tryAdjusting')}</p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn-outline">
                    {t('clearFilters')}
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {visibleProviders.map(provider => (
                    <ProviderCard
                      key={provider._id}
                      provider={provider}
                      isExpanded={expandedId === provider._id}
                      onExpand={() => setExpandedId(expandedId === provider._id ? null : provider._id)}
                      t={t}
                      isRTL={isRTL}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 10)}
                      className="px-6 py-3 bg-deep-teal text-white rounded-lg hover:bg-ocean-blue transition-colors font-medium"
                    >
                      {isRTL ? 'عرض المزيد' : 'See More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-midnight-navy text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/60 text-sm">
            {t('builtForFounders')} © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
