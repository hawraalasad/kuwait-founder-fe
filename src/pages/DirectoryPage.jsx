import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
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
  const priceColors = {
    budget: 'bg-green-100 text-green-700',
    mid: 'bg-blue-100 text-blue-700',
    premium: 'bg-kuwait-gold/20 text-kuwait-gold'
  }

  const priceLabels = {
    budget: t('budget'),
    mid: t('mid'),
    premium: t('premium')
  }

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
              <span className={`px-2 py-1 text-xs font-medium rounded ${priceColors[provider.priceRange]}`}>
                {priceLabels[provider.priceRange]}
              </span>
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

export default function DirectoryPage() {
  const [providers, setProviders] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const { t, isRTL } = useLanguage()
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [providersRes, categoriesRes] = await Promise.all([
        api('/api/providers'),
        api('/api/categories')
      ])

      if (!providersRes.ok || !categoriesRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const [providersData, categoriesData] = await Promise.all([
        providersRes.json(),
        categoriesRes.json()
      ])

      setProviders(providersData)
      setCategories(categoriesData)
    } catch (err) {
      setError(isRTL ? 'فشل تحميل الدليل. يرجى المحاولة مرة أخرى.' : 'Failed to load directory. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredProviders = providers.filter(provider => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        provider.name.toLowerCase().includes(query) ||
        provider.description?.toLowerCase().includes(query) ||
        (provider.nameAr && provider.nameAr.includes(searchQuery)) ||
        (provider.descriptionAr && provider.descriptionAr.includes(searchQuery))
      if (!matchesSearch) return false
    }

    if (selectedCategory) {
      const hasCategory = provider.categories?.some(cat => (cat._id || cat) === selectedCategory)
        || provider.category?._id === selectedCategory
      if (!hasCategory) return false
    }

    if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes(provider.priceRange)) {
      return false
    }

    return true
  })

  const togglePriceRange = (range) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedPriceRanges([])
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedPriceRanges.length > 0

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
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">
            {t('serviceProviderDirectory')}
          </h1>
          <p className="text-medium-gray">
            {t('vettedProviders')}
          </p>
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
            <button onClick={fetchData} className="mt-4 btn-primary">
              {isRTL ? 'حاول مرة أخرى' : 'Try Again'}
            </button>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
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

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-light-gray rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                  {isRTL ? 'الفلاتر' : 'Filters'}
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-kuwait-gold rounded-full"></span>
                  )}
                </button>

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

                  <div className="flex gap-2">
                    {['budget', 'mid', 'premium'].map(range => (
                      <button
                        key={range}
                        onClick={() => togglePriceRange(range)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedPriceRanges.includes(range)
                            ? 'bg-deep-teal text-white'
                            : 'bg-light-gray text-charcoal hover:bg-gray-200'
                        }`}
                      >
                        {range === 'budget' ? t('budget') : range === 'mid' ? t('mid') : t('premium')}
                      </button>
                    ))}
                  </div>

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

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden mt-4 pt-4 border-t border-light-gray overflow-hidden"
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        {isRTL ? 'الفئة' : 'Category'}
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="">{t('allCategories')}</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>
                            {isRTL && cat.nameAr ? cat.nameAr : cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        {isRTL ? 'نطاق السعر' : 'Price Range'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['budget', 'mid', 'premium'].map(range => (
                          <button
                            key={range}
                            onClick={() => togglePriceRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedPriceRanges.includes(range)
                                ? 'bg-deep-teal text-white'
                                : 'bg-light-gray text-charcoal'
                            }`}
                          >
                            {range === 'budget' ? t('budget') : range === 'mid' ? t('mid') : t('premium')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-red-500"
                      >
                        {t('clearFilters')}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results count */}
            <p className="text-sm text-medium-gray mb-4">
              {t('showing')} {filteredProviders.length} {t('providers')}
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
              <div className="grid gap-4">
                {filteredProviders.map(provider => (
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
