import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'
import toast from 'react-hot-toast'

export default function AccessPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { t, isRTL } = useLanguage()

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/playbook', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(password)

    if (result.success) {
      toast.success(t('accessGranted'))
      navigate('/playbook', { replace: true })
    } else {
      setError(result.error || t('invalidPassword'))
      setLoading(false)
    }
  }

  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-navy to-deep-teal flex items-center justify-center p-6">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-sky-teal opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-kuwait-gold opacity-10 rounded-full blur-3xl"></div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src="/assets/logo-reversed.svg"
              alt="Kuwait Founder Playbook"
              className="h-14 mx-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-deep-teal" />
            </div>
            <h1 className="text-2xl font-bold text-midnight-navy mb-2">
              {t('enterPassword')}
            </h1>
            <p className="text-medium-gray">
              {t('usePassword')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterYourPassword')}
                  className="input-field pr-12"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-medium-gray hover:text-charcoal transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-midnight-navy border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('verifying')}</span>
                </>
              ) : (
                t('unlockPlaybook')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-medium-gray text-sm">
              {t('dontHaveAccess')}{' '}
              <a
                href="https://wa.me/PHONENUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-deep-teal hover:underline font-medium"
              >
                {t('getItHere')}
              </a>
            </p>
          </div>
        </div>

        {/* Back link */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-white/70 hover:text-white mt-6 transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          {t('backToHome')}
        </Link>
      </motion.div>
    </div>
  )
}
