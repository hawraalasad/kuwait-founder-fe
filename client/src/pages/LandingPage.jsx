import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building,
  Palette,
  Monitor,
  TrendingUp,
  MapPin,
  Users,
  Settings,
  Calculator,
  AlertTriangle,
  CheckSquare,
  MessageCircle,
  Search,
  DollarSign,
  HelpCircle,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Book
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const icons = [Building, Palette, Monitor, TrendingUp, MapPin, Users, Settings, Calculator, AlertTriangle, CheckSquare]
const problemIcons = [Search, DollarSign, HelpCircle, MessageCircle, AlertTriangle]

export default function LandingPage() {
  const { t, language, isRTL } = useLanguage()
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-midnight-navy to-deep-teal text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-sky-teal opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-kuwait-gold opacity-10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <nav className="flex justify-between items-center mb-16">
            <img src="/assets/logo-reversed.svg" alt="Kuwait Founder Playbook" className="h-12" />
            <div className="flex items-center gap-4">
              <LanguageToggle className="text-white" />
              <Link to="/access" className="text-white/80 hover:text-white transition">
                {t('alreadyHaveAccess')}
              </Link>
            </div>
          </nav>

          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              {t('heroSubtitle')}
            </p>
            <a
              href="#access"
              className="inline-flex items-center gap-2 bg-kuwait-gold text-midnight-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              {t('getAccess')}
              <Arrow className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-4">
              {t('problemTitle')}
            </h2>
            <p className="text-medium-gray text-lg">
              {t('problemSubtitle')}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t('problems').map((text, index) => {
              const Icon = problemIcons[index]
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm"
                  variants={fadeInUp}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-charcoal">{text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-warm-sand">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="label mb-4 block">{t('solutionLabel')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-6">
              {t('solutionTitle')}
            </h2>
            <p className="text-lg text-charcoal mb-8">
              {t('solutionDesc')}
            </p>
            <div className="flex justify-center">
              <img src="/assets/icon.svg" alt="Playbook Icon" className="w-24 h-24" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="label mb-4 block">{t('whatsInsideLabel')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy">
              {t('whatsInsideTitle')}
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t('chapters').map((chapter, index) => {
              const Icon = icons[index]
              return (
                <motion.div
                  key={index}
                  className="card hover:shadow-lg transition-shadow group"
                  variants={fadeInUp}
                >
                  <div className="w-12 h-12 bg-deep-teal/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-kuwait-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-deep-teal group-hover:text-kuwait-gold transition-colors" />
                  </div>
                  <h3 className="font-bold text-midnight-navy mb-2">{chapter.title}</h3>
                  <p className="text-sm text-medium-gray">{chapter.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bonus */}
          <motion.div
            className="mt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-deep-teal to-ocean-blue text-white rounded-xl p-6 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t('bonusTitle')}</h3>
                <p className="text-white/80">{t('bonusDesc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-midnight-navy text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="label mb-4 block">{t('pricingLabel')}</span>
            <div className="bg-deep-teal/30 rounded-2xl p-8 backdrop-blur">
              <div className="text-5xl font-bold mb-2">{language === 'ar' ? '١٠ د.ك' : '10 KWD'}</div>
              <p className="text-white/60 mb-6">{t('oneTimePayment')}</p>

              <ul className="space-y-3 text-start mb-8">
                {t('pricingFeatures').map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-kuwait-gold flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#access"
                className="btn-gold w-full inline-flex justify-center items-center gap-2"
              >
                {t('getAccessNow')}
                <Arrow className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Get Access Section */}
      <section id="access" className="py-20 bg-off-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="label mb-4 block">{t('getStartedLabel')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy">
              {t('howToGetAccess')}
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t('steps').map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-kuwait-gold text-midnight-navy rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {language === 'ar' ? ['١', '٢', '٣', '٤'][index] : index + 1}
                </div>
                <h3 className="font-bold text-midnight-navy mb-2">{item.title}</h3>
                <p className="text-sm text-medium-gray">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <a
              href="https://wa.me/PHONENUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              {t('messageOnWhatsApp')}
            </a>
            <p className="mt-4 text-medium-gray">
              {t('alreadyHaveAccess')}{' '}
              <Link to="/access" className="text-deep-teal hover:underline font-medium">
                {t('enterPasswordHere')}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 bg-warm-sand">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy">
              {t('isThisForYou')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For */}
            <motion.div
              className="bg-white rounded-xl p-8"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-xl text-midnight-navy">{t('thisIsForYou')}</h3>
              </div>
              <ul className="space-y-4">
                {t('forYouList').map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not For */}
            <motion.div
              className="bg-white rounded-xl p-8"
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold text-xl text-midnight-navy">{t('thisIsNotForYou')}</h3>
              </div>
              <ul className="space-y-4">
                {t('notForYouList').map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-deep-teal to-ocean-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Book className="w-16 h-16 mx-auto mb-6 text-kuwait-gold" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('readyToBuild')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('joinFounders')}
            </p>
            <a
              href="https://wa.me/PHONENUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-kuwait-gold text-midnight-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
            >
              {t('getAccess')}
              <Arrow className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-midnight-navy text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img src="/assets/logo-reversed.svg" alt="Kuwait Founder Playbook" className="h-10" />
            <p className="text-white/60 text-sm">
              {t('builtForFounders')} © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
