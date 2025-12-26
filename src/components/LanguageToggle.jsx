import { useLanguage } from '../context/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageToggle({ className = '' }) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${className}`}
      title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'عربي' : 'EN'}
      </span>
    </button>
  )
}
