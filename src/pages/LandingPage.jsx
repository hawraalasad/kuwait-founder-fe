import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Users,
  Building,
  Palette,
  Code,
  TrendingUp,
  Briefcase,
  Megaphone
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import { api } from '../config/api'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const categoryIcons = [Building, Palette, Code, TrendingUp, Briefcase, Megaphone]

export default function LandingPage() {
  const [categories, setCategories] = useState([])
  const { t, isRTL } = useLanguage()
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  useEffect(() => {
    fetchCategories()
  }, [])

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-midnight-navy to-deep-teal text-white overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-teal opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-kuwait-gold opacity-10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 py-8 relative z-10">
          <nav className="flex justify-between items-center mb-16">
            <img src="/assets/logo-reversed.svg" alt="Kuwait Founder" className="h-12" />
            <LanguageToggle className="text-white" />
          </nav>

          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {t('directoryHeroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('directoryHeroSubtitle')}
            </p>

            <Link
              to="/directory"
              className="inline-flex items-center gap-2 bg-kuwait-gold text-midnight-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              <Search className="w-5 h-5" />
              {t('browseDirectory')}
              <Arrow className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What are you looking for Section */}
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-4">
              {t('whatLookingFor')}
            </h2>
            <p className="text-medium-gray text-lg max-w-2xl mx-auto">
              {t('clickCategoryToExplore')}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length]
              return (
                <Link
                  key={category._id}
                  to={`/directory?category=${category._id}`}
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-deep-teal/20"
                    variants={fadeInUp}
                  >
                    <div className="w-12 h-12 bg-deep-teal/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-deep-teal" />
                    </div>
                    <h3 className="font-bold text-midnight-navy mb-2">
                      {isRTL && category.nameAr ? category.nameAr : category.name}
                    </h3>
                    <p className="text-medium-gray text-sm">
                      {isRTL && category.descriptionAr ? category.descriptionAr : category.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-deep-teal text-sm font-medium mt-3">
                      {isRTL ? 'استعرض' : 'Browse'}
                      <Arrow className="w-4 h-4" />
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </motion.div>

          {/* Browse All Button */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 text-deep-teal font-semibold hover:text-ocean-blue transition-colors"
            >
              {t('browseAllProviders')}
              <Arrow className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-deep-teal to-ocean-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-kuwait-gold" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('readyToFind')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('startBrowsing')}
            </p>
            <Link
              to="/directory"
              className="inline-flex items-center gap-3 bg-kuwait-gold text-midnight-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
            >
              <Search className="w-5 h-5" />
              {t('browseDirectory')}
              <Arrow className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-warm-sand">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-deep-teal/10 text-deep-teal text-sm font-medium rounded-full mb-4">
              {t('comingSoon')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-midnight-navy mb-4">
              {t('playbookComingSoon')}
            </h2>
            <p className="text-medium-gray">
              {t('playbookComingSoonDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-midnight-navy text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img src="/assets/logo-reversed.svg" alt="Kuwait Founder" className="h-10" />
            <p className="text-white/60 text-sm">
              {t('builtForFounders')} © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
