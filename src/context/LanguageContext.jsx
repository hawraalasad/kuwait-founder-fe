import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    // Navigation
    playbook: 'Playbook',
    directory: 'Directory',
    checklists: 'Checklists',
    logout: 'Logout',

    // Landing Page - Directory Focus
    freeAccess: 'Free Access',
    directoryHeroTitle: 'Find trusted service providers for your Kuwait business',
    directoryHeroSubtitle: 'A curated directory of agencies, freelancers, and service providers — vetted by founders, for founders.',
    browseDirectory: 'Browse Directory',

    whatYoullFind: 'What You\'ll Find',
    whatYoullFindDesc: 'Browse through categories of service providers that every Kuwait founder needs.',

    directoryCategories: [
      { title: 'Legal & Licensing', desc: 'Company formation, trade licenses, legal consultants' },
      { title: 'Branding & Design', desc: 'Logo design, brand identity, graphic designers' },
      { title: 'Web & Tech', desc: 'Website development, apps, IT services' },
      { title: 'Marketing', desc: 'Social media, advertising, PR agencies' },
      { title: 'Accounting', desc: 'Bookkeeping, tax, financial services' },
      { title: 'Office & Logistics', desc: 'Workspaces, shipping, suppliers' }
    ],

    whyUseDirectory: 'Why Use This Directory?',
    directoryBenefits: [
      { title: 'Vetted Providers', desc: 'Every provider is reviewed based on real founder experiences' },
      { title: 'Practical Notes', desc: 'Honest feedback on pricing, quality, and what to expect' },
      { title: 'Save Time', desc: 'Skip the Instagram hunting and WhatsApp recommendations' }
    ],

    readyToFind: 'Ready to find your next service provider?',
    startBrowsing: 'Browse our directory of trusted providers and find the right fit for your business.',

    comingSoon: 'Coming Soon',
    playbookComingSoon: 'The Kuwait Founder Playbook',
    playbookComingSoonDesc: 'A comprehensive guide covering everything from business setup to hiring. Coming soon with checklists, budgets, and step-by-step guidance.',

    builtForFounders: 'Built for Kuwait founders',

    // Access Page
    enterPassword: 'Enter your access password',
    usePassword: 'Use the password you received after payment',
    password: 'Password',
    enterYourPassword: 'Enter your password',
    unlockPlaybook: 'Unlock Playbook',
    dontHaveAccess: 'Don\'t have access?',
    getItHere: 'Get it here',
    backToHome: 'Back to home',
    invalidPassword: 'Invalid password. Please try again.',
    verifying: 'Verifying...',
    accessGranted: 'Access granted! Welcome to the Playbook.',

    // Playbook Dashboard
    welcomeToPlaybook: 'Welcome to the Playbook',
    exploreBelow: 'Everything you need to build a business in Kuwait. Explore the sections below.',

    // Directory
    serviceProviderDirectory: 'Service Provider Directory',
    vettedProviders: 'Vetted service providers with practical notes from real experience.',
    searchProviders: 'Search providers...',
    allCategories: 'All Categories',
    budget: 'Budget',
    mid: 'Mid',
    premium: 'Premium',
    noProvidersFound: 'No providers found',
    tryAdjusting: 'Try adjusting your search or filters',
    clearFilters: 'Clear Filters',
    showing: 'Showing',
    providers: 'providers',
    about: 'About',
    practicalNotes: 'Practical Notes',
    bestFor: 'Best For',

    // Checklists
    checklistsTitle: 'Checklists & Action Plans',
    trackProgress: 'Track your progress with interactive checklists. Your progress is saved automatically.',
    overallProgress: 'Overall Progress',
    itemsCompleted: 'items completed',
    reset: 'Reset',
    print: 'Print',
    checklistComplete: 'Checklist complete! Great work!',

    // Admin
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    playbookSections: 'Playbook Sections',
    serviceProviders: 'Service Providers',
    categories: 'Categories',
    accessLog: 'Access Log'
  },
  ar: {
    // Navigation
    playbook: 'الدليل',
    directory: 'مقدمي الخدمات',
    checklists: 'قوائم المهام',
    logout: 'تسجيل خروج',

    // Landing Page - Directory Focus
    freeAccess: 'وصول مجاني',
    directoryHeroTitle: 'ابحث عن مقدمي خدمات موثوقين لعملك في الكويت',
    directoryHeroSubtitle: 'دليل منتقى من الوكالات والمستقلين ومقدمي الخدمات — موثق من مؤسسين، للمؤسسين.',
    browseDirectory: 'تصفح الدليل',

    whatYoullFind: 'ماذا ستجد',
    whatYoullFindDesc: 'تصفح فئات مقدمي الخدمات التي يحتاجها كل مؤسس في الكويت.',

    directoryCategories: [
      { title: 'القانونية والتراخيص', desc: 'تأسيس الشركات، الرخص التجارية، المستشارين القانونيين' },
      { title: 'العلامة التجارية والتصميم', desc: 'تصميم الشعار، الهوية البصرية، المصممين' },
      { title: 'الويب والتقنية', desc: 'تطوير المواقع، التطبيقات، خدمات تقنية المعلومات' },
      { title: 'التسويق', desc: 'وسائل التواصل الاجتماعي، الإعلانات، وكالات العلاقات العامة' },
      { title: 'المحاسبة', desc: 'مسك الدفاتر، الضرائب، الخدمات المالية' },
      { title: 'المكاتب واللوجستيات', desc: 'مساحات العمل، الشحن، الموردين' }
    ],

    whyUseDirectory: 'لماذا تستخدم هذا الدليل؟',
    directoryBenefits: [
      { title: 'مقدمو خدمات موثقون', desc: 'كل مقدم خدمة تم تقييمه بناءً على تجارب مؤسسين حقيقية' },
      { title: 'ملاحظات عملية', desc: 'تقييمات صادقة عن الأسعار والجودة وما يمكن توقعه' },
      { title: 'وفّر وقتك', desc: 'تجاوز البحث في انستغرام وتوصيات الواتساب' }
    ],

    readyToFind: 'مستعد للعثور على مقدم الخدمة المناسب؟',
    startBrowsing: 'تصفح دليلنا من مقدمي الخدمات الموثوقين واعثر على المناسب لعملك.',

    comingSoon: 'قريباً',
    playbookComingSoon: 'دليل المؤسس الكويتي',
    playbookComingSoonDesc: 'دليل شامل يغطي كل شيء من تأسيس العمل إلى التوظيف. قريباً مع قوائم مهام وميزانيات وإرشادات خطوة بخطوة.',

    builtForFounders: 'مصمم للمؤسسين في الكويت',

    // Access Page
    enterPassword: 'أدخل كلمة المرور',
    usePassword: 'استخدم كلمة المرور التي استلمتها بعد الدفع',
    password: 'كلمة المرور',
    enterYourPassword: 'أدخل كلمة المرور',
    unlockPlaybook: 'افتح الدليل',
    dontHaveAccess: 'ليس لديك وصول؟',
    getItHere: 'احصل عليه هنا',
    backToHome: 'العودة للرئيسية',
    invalidPassword: 'كلمة مرور غير صحيحة. حاول مرة أخرى.',
    verifying: 'جاري التحقق...',
    accessGranted: 'تم منح الوصول! مرحباً بك في الدليل.',

    // Playbook Dashboard
    welcomeToPlaybook: 'مرحباً بك في الدليل',
    exploreBelow: 'كل ما تحتاجه لبناء عملك في الكويت. استكشف الأقسام أدناه.',

    // Directory
    serviceProviderDirectory: 'دليل مقدمي الخدمات',
    vettedProviders: 'مقدمو خدمات موثوقون مع ملاحظات عملية من تجارب حقيقية.',
    searchProviders: 'البحث عن مقدمي خدمات...',
    allCategories: 'جميع الفئات',
    budget: 'اقتصادي',
    mid: 'متوسط',
    premium: 'ممتاز',
    noProvidersFound: 'لم يتم العثور على مقدمي خدمات',
    tryAdjusting: 'حاول تعديل البحث أو الفلاتر',
    clearFilters: 'مسح الفلاتر',
    showing: 'عرض',
    providers: 'مقدمي خدمات',
    about: 'حول',
    practicalNotes: 'ملاحظات عملية',
    bestFor: 'الأفضل لـ',

    // Checklists
    checklistsTitle: 'قوائم المهام وخطط العمل',
    trackProgress: 'تتبع تقدمك مع قوائم مهام تفاعلية. يتم حفظ تقدمك تلقائياً.',
    overallProgress: 'التقدم الإجمالي',
    itemsCompleted: 'عناصر مكتملة',
    reset: 'إعادة تعيين',
    print: 'طباعة',
    checklistComplete: 'اكتملت القائمة! عمل رائع!',

    // Admin
    adminPanel: 'لوحة الإدارة',
    dashboard: 'لوحة التحكم',
    playbookSections: 'أقسام الدليل',
    serviceProviders: 'مقدمو الخدمات',
    categories: 'الفئات',
    accessLog: 'سجل الوصول'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isRTL: language === 'ar'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
