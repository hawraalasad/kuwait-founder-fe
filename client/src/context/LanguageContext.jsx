import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    // Navigation
    playbook: 'Playbook',
    directory: 'Directory',
    checklists: 'Checklists',
    logout: 'Logout',

    // Landing Page
    heroTitle: 'Everything you need to build a business in Kuwait',
    heroSubtitle: 'Without guesswork, wasted money, or bad advice.',
    getAccess: 'Get Access — 10 KWD',
    alreadyHaveAccess: 'Already have access?',

    problemTitle: 'Starting a business in Kuwait is unnecessarily confusing',
    problemSubtitle: 'We know because we\'ve been there.',
    problems: [
      'Fragmented information across Instagram, WhatsApp, and word of mouth',
      'Overpriced agencies and unclear pricing',
      'No clear guidance on legal setup, licensing, or hiring',
      'Conflicting advice from people with different incentives',
      'Fear of making expensive mistakes early'
    ],

    solutionLabel: 'The Solution',
    solutionTitle: 'One playbook. Everything you need.',
    solutionDesc: 'The Kuwait Founder Playbook is a comprehensive, practical guide that takes you from idea to launch. No fluff, no outdated info — just actionable steps from founders who\'ve done it.',

    whatsInsideLabel: 'What\'s Inside',
    whatsInsideTitle: '10 Comprehensive Chapters',

    chapters: [
      { title: 'Business Setup', desc: 'Legal structure, registration, licensing' },
      { title: 'Branding & Identity', desc: 'Name, logo, visual identity resources' },
      { title: 'Digital & Tech', desc: 'Website, tools, tech stack guidance' },
      { title: 'Marketing & Growth', desc: 'Strategies for Kuwait market' },
      { title: 'Offices & Logistics', desc: 'Workspaces, suppliers, operations' },
      { title: 'Hiring & Employees', desc: 'Recruitment, visas, labor law' },
      { title: 'Operations & Tools', desc: 'Systems, software, founder stack' },
      { title: 'Sample Budgets', desc: 'Real cost breakdowns' },
      { title: 'Common Mistakes', desc: 'What to avoid from day one' },
      { title: 'Checklists', desc: 'Step-by-step action plans' }
    ],

    bonusTitle: 'Bonus: Service Provider Directory',
    bonusDesc: 'Vetted list of agencies, freelancers, and service providers with real notes',

    pricingLabel: 'Simple Pricing',
    oneTimePayment: 'One-time payment',
    pricingFeatures: [
      'Lifetime access to all content',
      'All future updates included',
      'Service provider directory',
      'Actionable checklists',
      'No recurring fees'
    ],
    getAccessNow: 'Get Access Now',

    getStartedLabel: 'Get Started',
    howToGetAccess: 'How to Get Access',
    steps: [
      { title: 'Message Us', desc: 'Send us a message on WhatsApp' },
      { title: 'Complete Payment', desc: 'Pay 10 KWD via your preferred method' },
      { title: 'Receive Password', desc: 'Get your access password instantly' },
      { title: 'Unlock Playbook', desc: 'Access all content immediately' }
    ],
    messageOnWhatsApp: 'Message on WhatsApp',
    enterPasswordHere: 'Enter your password here',

    isThisForYou: 'Is This For You?',
    thisIsForYou: 'This is for you if...',
    thisIsNotForYou: 'This is NOT for you if...',
    forYouList: [
      'You\'re a first-time founder in Kuwait',
      'You want to avoid expensive mistakes',
      'You value practical, actionable information',
      'You\'re tired of conflicting advice',
      'You want to move fast with confidence'
    ],
    notForYouList: [
      'You\'re looking for get-rich-quick schemes',
      'You expect us to do the work for you',
      'You\'re not serious about building a real business',
      'You\'re an experienced serial entrepreneur',
      'You prefer learning by trial and error'
    ],

    readyToBuild: 'Ready to build your business the right way?',
    joinFounders: 'Join founders who are building with confidence using the Kuwait Founder Playbook.',
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

    // Landing Page
    heroTitle: 'كل ما تحتاجه لبناء عملك في الكويت',
    heroSubtitle: 'بدون تخمين أو إهدار للمال أو نصائح سيئة.',
    getAccess: 'احصل على الوصول — ١٠ د.ك',
    alreadyHaveAccess: 'لديك وصول بالفعل؟',

    problemTitle: 'بدء عمل تجاري في الكويت صعب بشكل غير ضروري',
    problemSubtitle: 'نحن نعرف لأننا مررنا بذلك.',
    problems: [
      'معلومات متفرقة عبر انستغرام وواتساب والكلام الشفهي',
      'وكالات باهظة الثمن وأسعار غير واضحة',
      'لا توجد إرشادات واضحة حول الإعداد القانوني والترخيص والتوظيف',
      'نصائح متضاربة من أشخاص بدوافع مختلفة',
      'الخوف من ارتكاب أخطاء مكلفة في البداية'
    ],

    solutionLabel: 'الحل',
    solutionTitle: 'دليل واحد. كل ما تحتاجه.',
    solutionDesc: 'دليل المؤسس الكويتي هو دليل شامل وعملي يأخذك من الفكرة إلى الإطلاق. بدون حشو أو معلومات قديمة — فقط خطوات عملية من مؤسسين مروا بالتجربة.',

    whatsInsideLabel: 'ماذا بالداخل',
    whatsInsideTitle: '١٠ فصول شاملة',

    chapters: [
      { title: 'تأسيس العمل', desc: 'الهيكل القانوني، التسجيل، الترخيص' },
      { title: 'العلامة التجارية', desc: 'الاسم، الشعار، الهوية البصرية' },
      { title: 'التقنية الرقمية', desc: 'الموقع، الأدوات، التقنيات' },
      { title: 'التسويق والنمو', desc: 'استراتيجيات للسوق الكويتي' },
      { title: 'المكاتب واللوجستيات', desc: 'مساحات العمل، الموردين' },
      { title: 'التوظيف والموظفين', desc: 'التوظيف، التأشيرات، قانون العمل' },
      { title: 'العمليات والأدوات', desc: 'الأنظمة، البرامج' },
      { title: 'نماذج الميزانيات', desc: 'تفاصيل التكاليف الحقيقية' },
      { title: 'الأخطاء الشائعة', desc: 'ما يجب تجنبه من اليوم الأول' },
      { title: 'قوائم المهام', desc: 'خطط عمل خطوة بخطوة' }
    ],

    bonusTitle: 'مكافأة: دليل مقدمي الخدمات',
    bonusDesc: 'قائمة موثقة من الوكالات والمستقلين مع ملاحظات حقيقية',

    pricingLabel: 'تسعير بسيط',
    oneTimePayment: 'دفعة واحدة',
    pricingFeatures: [
      'وصول مدى الحياة لجميع المحتوى',
      'جميع التحديثات المستقبلية مشمولة',
      'دليل مقدمي الخدمات',
      'قوائم مهام عملية',
      'بدون رسوم متكررة'
    ],
    getAccessNow: 'احصل على الوصول الآن',

    getStartedLabel: 'ابدأ الآن',
    howToGetAccess: 'كيف تحصل على الوصول',
    steps: [
      { title: 'راسلنا', desc: 'أرسل لنا رسالة على واتساب' },
      { title: 'أكمل الدفع', desc: 'ادفع ١٠ د.ك بالطريقة المفضلة' },
      { title: 'استلم كلمة المرور', desc: 'احصل على كلمة المرور فوراً' },
      { title: 'افتح الدليل', desc: 'وصول فوري لجميع المحتوى' }
    ],
    messageOnWhatsApp: 'راسلنا على واتساب',
    enterPasswordHere: 'أدخل كلمة المرور هنا',

    isThisForYou: 'هل هذا مناسب لك؟',
    thisIsForYou: 'هذا مناسب لك إذا...',
    thisIsNotForYou: 'هذا ليس مناسباً لك إذا...',
    forYouList: [
      'أنت مؤسس لأول مرة في الكويت',
      'تريد تجنب الأخطاء المكلفة',
      'تقدر المعلومات العملية والقابلة للتنفيذ',
      'سئمت من النصائح المتضاربة',
      'تريد التحرك بسرعة وثقة'
    ],
    notForYouList: [
      'تبحث عن مخططات الثراء السريع',
      'تتوقع منا القيام بالعمل بدلاً منك',
      'لست جاداً في بناء عمل حقيقي',
      'أنت رائد أعمال متسلسل ذو خبرة',
      'تفضل التعلم بالتجربة والخطأ'
    ],

    readyToBuild: 'مستعد لبناء عملك بالطريقة الصحيحة؟',
    joinFounders: 'انضم للمؤسسين الذين يبنون بثقة باستخدام دليل المؤسس الكويتي.',
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
