import { motion } from 'framer-motion'
import { CheckSquare, Clock } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Checklists() {
  const { isRTL } = useLanguage()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-kuwait-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckSquare className="w-10 h-10 text-kuwait-gold" />
        </div>

        <h1 className="text-3xl font-bold text-midnight-navy mb-4">
          {isRTL ? 'قريباً' : 'Coming Soon'}
        </h1>

        <p className="text-medium-gray mb-6">
          {isRTL
            ? 'قوائم المهام التفاعلية قيد الإعداد. ستتمكن قريباً من تتبع تقدمك!'
            : 'Interactive checklists are being prepared. You\'ll soon be able to track your progress!'
          }
        </p>

        <div className="flex items-center justify-center gap-2 text-deep-teal">
          <Clock className="w-5 h-5" />
          <span className="font-medium">
            {isRTL ? 'قيد التطوير' : 'Under Development'}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
