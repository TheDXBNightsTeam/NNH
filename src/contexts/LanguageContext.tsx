import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.portfolio': 'معرض الأعمال',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.blog': 'المدونة',
    'nav.pricing': 'الأسعار',
    
    // Hero Section
    'hero.title': 'NNH لتطوير وإدارة تطبيقات وسائل التواصل الاجتماعي',
    'hero.subtitle': 'شركة مرخصة لتطوير وإدارة تطبيقات وسائل التواصل الاجتماعي',
    'hero.description': 'متخصصون في تطوير وإدارة تطبيقات وسائل التواصل الاجتماعي مع خبرة واسعة في التسويق الرقمي والحلول التقنية المبتكرة. مرخصون من دائرة السياحة والاقتصاد في دبي.',
    'hero.contact': 'اتصل بنا',
    'hero.viewWork': 'شاهد أعمالنا',
    
    // Services Section
    'services.title': 'خدماتنا المتخصصة',
    'services.subtitle': 'نقدم حلول شاملة في التسويق الرقمي وتطوير وسائل التواصل الاجتماعي مع التركيز على الجودة والابتكار',
    'services.service1.title': 'تطوير تطبيقات وسائل التواصل الاجتماعي',
    'services.service1.description': 'تصميم وتطوير منصات وسائل التواصل الاجتماعي التفاعلية المخصصة بأحدث التقنيات',
    'services.service1.features': 'React & Next.js,التصميم المتجاوب,واجهة تفاعلية,أمان متقدم',
    'services.service2.title': 'إدارة المواقع الإلكترونية',
    'services.service2.description': 'إدارة شاملة للمواقع الإلكترونية مع التحديثات المستمرة والصيانة الدورية',
    'services.service2.features': 'إدارة المحتوى,تحديثات الأمان,النسخ الاحتياطية,الدعم التقني',
    'services.service3.title': 'التسويق الرقمي',
    'services.service3.description': 'استراتيجيات التسويق الرقمي المتقدمة لزيادة الوصول والتفاعل',
    'services.service3.features': 'تحسين محركات البحث,الإعلانات المدفوعة,تحليل البيانات,استراتيجية المحتوى',
    'services.service4.title': 'إدارة وسائل التواصل الاجتماعي',
    'services.service4.description': 'إدارة مهنية لحسابات وسائل التواصل الاجتماعي عبر جميع المنصات',
    'services.service4.features': 'إنشاء المحتوى,جدولة المنشورات,التفاعل مع المجتمع,تقارير الأداء',
    'services.service5.title': 'تصميم الهوية البصرية',
    'services.service5.description': 'تصميم هوية بصرية كاملة تعكس قيم وأهداف علامتك التجارية',
    'services.service5.features': 'تصميم الشعار,إرشادات العلامة التجارية,المواد التسويقية,التصميم الرقمي',
    'services.service6.title': 'تحليل البيانات والتقارير',
    'services.service6.description': 'تحليل شامل لأداء الموقع ووسائل التواصل الاجتماعي مع تقارير مفصلة',
    'services.service6.features': 'Google Analytics,التقارير الشهرية,تحليل المنافسين,توصيات التحسين',
    
    // Portfolio Section
    'portfolio.title': 'معرض أعمالنا',
    'portfolio.subtitle': 'اكتشف مشاريعنا المنجزة التي تعكس خبرتنا في تطوير التطبيقات والتسويق الرقمي',
    'portfolio.all': 'جميع المشاريع',
    'portfolio.web': 'تطبيقات الويب',
    'portfolio.mobile': 'تطبيقات الجوال',
    'portfolio.viewProject': 'عرض المشروع',
    'portfolio.bookConsultation': 'احجز استشارة مجانية',
    'portfolio.project1.title': 'منصة إدارة وسائل التواصل الاجتماعي',
    'portfolio.project1.description': 'منصة شاملة لإدارة حسابات وسائل التواصل الاجتماعي مع تحليلات متقدمة وإدارة المحتوى',
    'portfolio.project1.features': 'إدارة متعددة المنصات,تحليلات مفصلة,جدولة المحتوى,تقارير شهرية',
    'portfolio.project2.title': 'تطبيق متجر إلكتروني',
    'portfolio.project2.description': 'تطبيق جوال متكامل للتجارة الإلكترونية مع دفع آمن وتتبع الطلبات',
    'portfolio.project2.features': 'واجهة سهلة الاستخدام,دفع آمن,تتبع الطلبات,إشعارات فورية',
    'portfolio.project3.title': 'لوحة تحكم التسويق الرقمي',
    'portfolio.project3.description': 'لوحة تحكم متقدمة لحملات التسويق الرقمي مع تحليلات في الوقت الفعلي',
    'portfolio.project3.features': 'تحليلات مباشرة,إدارة الحملات,تقارير مخصصة,تكامل مع المنصات',
    'portfolio.project4.title': 'نظام إدارة المطاعم',
    'portfolio.project4.description': 'نظام إدارة شامل للمطاعم مع إدارة الطلبات والمخزون والموظفين',
    'portfolio.project4.features': 'إدارة الطلبات,تتبع المخزون,إدارة الموظفين,تقارير المبيعات',
    'portfolio.project5.title': 'تطبيق تتبع اللياقة البدنية',
    'portfolio.project5.description': 'تطبيق تتبع اللياقة البدنية مع خطط تمرين مخصصة وتتبع التقدم',
    'portfolio.project5.features': 'خطط تمرين مخصصة,تتبع التقدم,إحصائيات صحية,مجتمع رياضي',
    'portfolio.project6.title': 'منصة عقارية',
    'portfolio.project6.description': 'منصة عقارية شاملة مع بحث متقدم وخرائط تفاعلية',
    'portfolio.project6.features': 'بحث متقدم,خرائط تفاعلية,جولات افتراضية,إدارة العقارات',
    'portfolio.completed': 'مكتمل',
    'portfolio.users': 'مستخدم',
    'portfolio.growth': 'نمو',
    'portfolio.haveProject': 'هل لديك مشروع في ذهنك؟',
    'portfolio.turnIdeas': 'نحن هنا لتحويل أفكارك إلى واقع رقمي مذهل. تواصل معنا للحصول على استشارة مجانية',
    'portfolio.mainFeatures': 'المميزات الرئيسية',
    
    // Testimonials Section
    'testimonials.title': 'آراء عملائنا',
    'testimonials.subtitle': 'اكتشف ما يقوله عملاؤنا عن خدماتنا ومشاريعنا المنجزة',
    'testimonials.satisfiedClients': 'عميل راضي',
    'testimonials.satisfactionRate': 'معدل الرضا',
    'testimonials.averageGrowth': 'متوسط النمو',
    'testimonials.completedProjects': 'مشاريع مكتملة',
    'testimonials.verified': 'موثق',
    'testimonials.beNext': 'كن التالي في قائمة عملائنا الراضين',
    'testimonials.testimonial1.name': 'أحمد محمد',
    'testimonials.testimonial1.role': 'مدير التسويق الرقمي',
    'testimonials.testimonial1.company': 'شركة التقنية المتقدمة',
    'testimonials.testimonial1.text': 'خدمة استثنائية! فريق NNH طور لنا منصة إدارة وسائل التواصل الاجتماعي التي ساعدتنا في زيادة تفاعل العملاء بنسبة 300%. الخبرة والاحترافية واضحة في كل تفصيل.',
    'testimonials.testimonial1.project': 'منصة إدارة وسائل التواصل',
    'testimonials.testimonial2.name': 'فاطمة علي',
    'testimonials.testimonial2.role': 'مالكة متجر إلكتروني',
    'testimonials.testimonial2.company': 'متجر الأزياء الحديثة',
    'testimonials.testimonial2.text': 'تطبيق الجوال الذي طوره فريق NNH لنا غير قواعد اللعبة! المبيعات زادت بنسبة 250% والمستخدمون يحبون التصميم والوظائف. أنصح به بشدة.',
    'testimonials.testimonial2.project': 'تطبيق متجر إلكتروني',
    'testimonials.testimonial3.name': 'محمد السعيد',
    'testimonials.testimonial3.role': 'مدير عام',
    'testimonials.testimonial3.company': 'مطعم الشرق الأوسط',
    'testimonials.testimonial3.text': 'نظام إدارة المطعم الذي طوره NNH سهل علينا العمل كثيراً. إدارة الطلبات والمخزون أصبحت أسهل وأكثر دقة. فريق محترف جداً.',
    'testimonials.testimonial3.project': 'نظام إدارة المطاعم',
    'testimonials.engagement': 'التفاعل',
    'testimonials.followers': 'المتابعون',
    'testimonials.revenue': 'الإيرادات',
    'testimonials.sales': 'المبيعات',
    'testimonials.orders': 'الطلبات',
    'testimonials.efficiency': 'الكفاءة',
    
    // Pricing Section
    'pricing.title': 'خطط الأسعار',
    'pricing.subtitle': 'اختر الخطة المناسبة لمشروعك واحصل على أفضل قيمة مقابل المال',
    'pricing.monthly': 'شهري',
    'pricing.yearly': 'سنوي',
    'pricing.save': 'وفر 20%',
    'pricing.basic': 'الخطة الأساسية',
    'pricing.professional': 'الخطة المهنية',
    'pricing.enterprise': 'الخطة المؤسسية',
    'pricing.mostPopular': 'الأكثر شعبية',
    'pricing.features': 'المميزات المتضمنة',
    'pricing.notIncluded': 'غير متضمن',
    'pricing.startNow': 'ابدأ الآن',
    'pricing.choosePlan': 'اختر هذه الخطة',
    'pricing.contactUs': 'تواصل معنا',
    'pricing.additionalServices': 'خدمات إضافية',
    'pricing.faq': 'الأسئلة الشائعة',
    'pricing.customPlan': 'تحتاج خطة مخصصة؟',
    'pricing.basicDescription': 'مثالية للشركات الصغيرة والمشاريع الناشئة',
    'pricing.professionalDescription': 'الأفضل للشركات المتوسطة والمشاريع المتنامية',
    'pricing.enterpriseDescription': 'حل شامل للشركات الكبيرة والمؤسسات',
    'pricing.feature1': 'تطوير تطبيق ويب',
    'pricing.feature2': 'تصميم متجاوب',
    'pricing.feature3': 'دعم فني لمدة شهر',
    'pricing.feature4': 'تطوير تطبيق جوال',
    'pricing.feature5': 'إدارة وسائل التواصل',
    'pricing.feature6': 'تحليلات مفصلة',
    'pricing.feature7': 'تطوير مخصص',
    'pricing.feature8': 'دعم فني 24/7',
    'pricing.feature9': 'تدريب الفريق',
    'pricing.feature10': 'صيانة مستمرة',
    
    // Blog Section
    'blog.title': 'مدونتنا التقنية',
    'blog.subtitle': 'اكتشف أحدث المقالات والنصائح في عالم التطوير والتسويق الرقمي',
    'blog.all': 'جميع المقالات',
    'blog.appDevelopment': 'تطوير التطبيقات',
    'blog.webDevelopment': 'تطوير الويب',
    'blog.digitalMarketing': 'التسويق الرقمي',
    'blog.design': 'التصميم',
    'blog.featured': 'المقالات المميزة',
    'blog.readMore': 'اقرأ المزيد',
    'blog.recentPosts': 'المقالات الحديثة',
    'blog.categories': 'التصنيفات',
    'blog.newsletter': 'اشترك في النشرة الإخبارية',
    'blog.newsletterSubtitle': 'احصل على أحدث المقالات والنصائح التقنية',
    'blog.subscribe': 'اشترك الآن',
    'blog.author': 'فريق NNH',
    'blog.post1.title': 'أفضل 10 تقنيات لتطوير تطبيقات الجوال في 2024',
    'blog.post1.excerpt': 'اكتشف أحدث التقنيات والأدوات المستخدمة في تطوير تطبيقات الجوال التي ستساعدك في إنشاء تطبيقات عالية الجودة',
    'blog.post1.content': 'في عالم التكنولوجيا المتطور، تظهر تقنيات جديدة كل يوم لتطوير تطبيقات الجوال. في هذا المقال، سنستعرض أفضل 10 تقنيات...',
    'blog.readTime1': '8 دقائق',
    'blog.post2.title': 'كيفية زيادة تفاعل العملاء على وسائل التواصل الاجتماعي',
    'blog.post2.excerpt': 'نصائح عملية ومجربة لزيادة التفاعل مع جمهورك على منصات وسائل التواصل الاجتماعي المختلفة',
    'blog.post2.content': 'التفاعل مع العملاء على وسائل التواصل الاجتماعي هو مفتاح النجاح في التسويق الرقمي. إليك أفضل الاستراتيجيات...',
    'blog.readTime2': '6 دقائق',
    
    // About Section
    'about.title': 'من نحن',
    'about.subtitle': 'شركة مرخصة في دبي لتطوير وإدارة تطبيقات وسائل التواصل الاجتماعي',
    'about.description1': 'NNH لتطوير وإدارة تطبيقات وسائل التواصل الاجتماعي هي شركة مرخصة متخصصة في تطوير تطبيقات وسائل التواصل الاجتماعي والتسويق الرقمي. نحمل رخصة مهنية من دائرة السياحة والاقتصاد في دبي لتطوير وإدارة تطبيقات وسائل التواصل الاجتماعي.',
    'about.description2': 'نعمل في مجال التقنية لأكثر من 5 سنوات، متخصصون في إنشاء حلول رقمية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم في العالم الرقمي.',
    'about.description3': 'شغفنا هو تحويل الأفكار إلى واقع رقمي يلبي احتياجات المستخدمين ويحقق الأهداف التجارية.',
    'about.contactInfo': 'معلومات الاتصال',
    'about.expertise': 'مجالات الخبرة',
    'about.license': 'الرخصة المهنية',
    'about.licenseNumber': 'رقم الرخصة',
    'about.activity': 'النشاط',
    'about.issuedBy': 'صادرة من',
    'about.validUntil': 'صالحة حتى',
    'about.satisfiedClients': 'عملاء راضون',
    'about.completedProjects': 'مشاريع مكتملة',
    'about.yearsExperience': 'سنوات من الخبرة',
    'about.countriesServed': 'دول نخدمها',
    
    // Contact Section
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'هل لديك مشروع في ذهنك؟ أو تحتاج استشارة مجانية؟ لا تتردد في التواصل معنا',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.freeConsultation': 'استشارة مجانية',
    'contact.sendMessage': 'إرسال رسالة',
    'contact.fullName': 'الاسم الكامل',
    'contact.phoneNumber': 'رقم الهاتف',
    'contact.messageSubject': 'موضوع الرسالة',
    'contact.projectDetails': 'تفاصيل المشروع',
    'contact.sending': 'جاري الإرسال...',
    'contact.send': 'إرسال الرسالة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.company': 'NNH لتطوير وإدارة تطبيقات وسائل التواصل الاجتماعي',
    'footer.licensed': 'مرخص من دائرة السياحة والاقتصاد في دبي',
    'footer.description': 'متخصصون في تطوير وإدارة تطبيقات وسائل التواصل الاجتماعي والتسويق الرقمي. مرخصون من دائرة السياحة والاقتصاد في دبي.',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'تم بنجاح',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.close': 'إغلاق',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.download': 'تحميل',
    'common.share': 'مشاركة',
    'common.like': 'إعجاب',
    'common.comment': 'تعليق',
    'common.follow': 'متابعة',
    'common.unfollow': 'إلغاء المتابعة',
    'common.nameRequired': 'الاسم يجب أن يكون على الأقل حرفين',
    'common.emailInvalid': 'يرجى إدخال بريد إلكتروني صحيح',
    'common.phoneRequired': 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام',
    'common.subjectRequired': 'الموضوع يجب أن يكون على الأقل 5 أحرف',
    'common.messageRequired': 'الرسالة يجب أن تكون على الأقل 20 حرف',
    'common.messageSent': 'تم إرسال الرسالة بنجاح!',
    'common.weWillContactYou': 'سنقوم بالتواصل معك في أقرب وقت ممكن.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.pricing': 'Pricing',
    
    // Hero Section
    'hero.title': 'NNH FOR SOCIAL MEDIA APPLICATIONS DEVELOPMENT & MANAGEMENT',
    'hero.subtitle': 'Licensed Social Media Applications Development & Management Company',
    'hero.description': 'Specialized in developing and managing social media applications with extensive experience in digital marketing and innovative web solutions. Licensed by Dubai Department of Economy and Tourism.',
    'hero.contact': 'Contact Us',
    'hero.viewWork': 'View Our Work',
    
    // Services Section
    'services.title': 'Our Specialized Services',
    'services.subtitle': 'We provide comprehensive solutions in digital marketing and social media development with focus on quality and innovation',
    'services.service1.title': 'Social Media Applications Development',
    'services.service1.description': 'Design and develop custom interactive social media platforms with the latest technologies',
    'services.service1.features': 'React & Next.js,Responsive Design,Interactive UI,Advanced Security',
    'services.service2.title': 'Website Management',
    'services.service2.description': 'Comprehensive website management with continuous updates and regular maintenance',
    'services.service2.features': 'Content Management,Security Updates,Backups,Technical Support',
    'services.service3.title': 'Digital Marketing',
    'services.service3.description': 'Advanced digital marketing strategies to increase reach and engagement',
    'services.service3.features': 'SEO,Paid Advertising,Data Analytics,Content Strategy',
    'services.service4.title': 'Social Media Management',
    'services.service4.description': 'Professional management of social media accounts across all platforms',
    'services.service4.features': 'Content Creation,Post Scheduling,Community Engagement,Performance Reports',
    'services.service5.title': 'Brand Identity Design',
    'services.service5.description': 'Complete visual identity design that reflects your brand\'s values and goals',
    'services.service5.features': 'Logo Design,Brand Guidelines,Marketing Materials,Digital Design',
    'services.service6.title': 'Data Analytics & Reports',
    'services.service6.description': 'Comprehensive analysis of website and social media performance with detailed reports',
    'services.service6.features': 'Google Analytics,Monthly Reports,Competitor Analysis,Optimization Recommendations',
    
    // Portfolio Section
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Discover our completed projects that reflect our expertise in application development and digital marketing',
    'portfolio.all': 'All Projects',
    'portfolio.web': 'Web Applications',
    'portfolio.mobile': 'Mobile Applications',
    'portfolio.viewProject': 'View Project',
    'portfolio.bookConsultation': 'Book Free Consultation',
    'portfolio.project1.title': 'Social Media Management Platform',
    'portfolio.project1.description': 'Comprehensive platform for managing social media accounts with advanced analytics and content management',
    'portfolio.project1.features': 'Multi-platform Management,Detailed Analytics,Content Scheduling,Monthly Reports',
    'portfolio.project2.title': 'E-commerce Mobile App',
    'portfolio.project2.description': 'Complete mobile app for e-commerce with secure payment and order tracking',
    'portfolio.project2.features': 'User-friendly Interface,Secure Payment,Order Tracking,Instant Notifications',
    'portfolio.project3.title': 'Digital Marketing Dashboard',
    'portfolio.project3.description': 'Advanced dashboard for digital marketing campaigns with real-time analytics',
    'portfolio.project3.features': 'Real-time Analytics,Campaign Management,Custom Reports,Platform Integration',
    'portfolio.project4.title': 'Restaurant Management System',
    'portfolio.project4.description': 'Comprehensive management system for restaurants with order, inventory, and staff management',
    'portfolio.project4.features': 'Order Management,Inventory Tracking,Staff Management,Sales Reports',
    'portfolio.project5.title': 'Fitness Tracking App',
    'portfolio.project5.description': 'Fitness tracking app with custom workout plans and progress tracking',
    'portfolio.project5.features': 'Custom Workout Plans,Progress Tracking,Health Statistics,Fitness Community',
    'portfolio.project6.title': 'Real Estate Platform',
    'portfolio.project6.description': 'Comprehensive real estate platform with advanced search and interactive maps',
    'portfolio.project6.features': 'Advanced Search,Interactive Maps,Virtual Tours,Property Management',
    'portfolio.completed': 'Completed',
    'portfolio.users': 'Users',
    'portfolio.growth': 'Growth',
    'portfolio.haveProject': 'Do you have a project in mind?',
    'portfolio.turnIdeas': 'We are here to transform your ideas into amazing digital reality. Contact us for a free consultation',
    'portfolio.mainFeatures': 'Main Features',
    
    // Testimonials Section
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'Discover what our clients say about our services and completed projects',
    'testimonials.satisfiedClients': 'Satisfied Clients',
    'testimonials.satisfactionRate': 'Satisfaction Rate',
    'testimonials.averageGrowth': 'Average Growth',
    'testimonials.completedProjects': 'Completed Projects',
    'testimonials.verified': 'Verified',
    'testimonials.beNext': 'Be the next in our list of satisfied clients',
    'testimonials.testimonial1.name': 'Ahmed Mohammed',
    'testimonials.testimonial1.role': 'Digital Marketing Manager',
    'testimonials.testimonial1.company': 'Advanced Technology Company',
    'testimonials.testimonial1.text': 'Exceptional service! The NNH team developed a social media management platform for us that helped increase customer engagement by 300%. The expertise and professionalism are evident in every detail.',
    'testimonials.testimonial1.project': 'Social Media Management Platform',
    'testimonials.testimonial2.name': 'Fatima Ali',
    'testimonials.testimonial2.role': 'E-commerce Store Owner',
    'testimonials.testimonial2.company': 'Modern Fashion Store',
    'testimonials.testimonial2.text': 'The mobile app developed by the NNH team for us changed the game! Sales increased by 250% and users love the design and functionality. I highly recommend it.',
    'testimonials.testimonial2.project': 'E-commerce Mobile App',
    'testimonials.testimonial3.name': 'Mohammed Al-Saeed',
    'testimonials.testimonial3.role': 'General Manager',
    'testimonials.testimonial3.company': 'Middle East Restaurant',
    'testimonials.testimonial3.text': 'The restaurant management system developed by NNH made our work much easier. Order and inventory management became easier and more accurate. Very professional team.',
    'testimonials.testimonial3.project': 'Restaurant Management System',
    'testimonials.engagement': 'Engagement',
    'testimonials.followers': 'Followers',
    'testimonials.revenue': 'Revenue',
    'testimonials.sales': 'Sales',
    'testimonials.orders': 'Orders',
    'testimonials.efficiency': 'Efficiency',
    
    // Pricing Section
    'pricing.title': 'Pricing Plans',
    'pricing.subtitle': 'Choose the plan that suits your project and get the best value for money',
    'pricing.monthly': 'Monthly',
    'pricing.yearly': 'Yearly',
    'pricing.save': 'Save 20%',
    'pricing.basic': 'Basic Plan',
    'pricing.professional': 'Professional Plan',
    'pricing.enterprise': 'Enterprise Plan',
    'pricing.mostPopular': 'Most Popular',
    'pricing.features': 'Included Features',
    'pricing.notIncluded': 'Not Included',
    'pricing.startNow': 'Start Now',
    'pricing.choosePlan': 'Choose This Plan',
    'pricing.contactUs': 'Contact Us',
    'pricing.additionalServices': 'Additional Services',
    'pricing.faq': 'Frequently Asked Questions',
    'pricing.customPlan': 'Need a Custom Plan?',
    'pricing.basicDescription': 'Perfect for small businesses and startups',
    'pricing.professionalDescription': 'Best for medium businesses and growing projects',
    'pricing.enterpriseDescription': 'Comprehensive solution for large companies and institutions',
    'pricing.feature1': 'Web Application Development',
    'pricing.feature2': 'Responsive Design',
    'pricing.feature3': '1 Month Technical Support',
    'pricing.feature4': 'Mobile App Development',
    'pricing.feature5': 'Social Media Management',
    'pricing.feature6': 'Detailed Analytics',
    'pricing.feature7': 'Custom Development',
    'pricing.feature8': '24/7 Technical Support',
    'pricing.feature9': 'Team Training',
    'pricing.feature10': 'Continuous Maintenance',
    
    // Blog Section
    'blog.title': 'Our Technical Blog',
    'blog.subtitle': 'Discover the latest articles and tips in the world of development and digital marketing',
    'blog.all': 'All Articles',
    'blog.appDevelopment': 'App Development',
    'blog.webDevelopment': 'Web Development',
    'blog.digitalMarketing': 'Digital Marketing',
    'blog.design': 'Design',
    'blog.featured': 'Featured Articles',
    'blog.readMore': 'Read More',
    'blog.recentPosts': 'Recent Posts',
    'blog.categories': 'Categories',
    'blog.newsletter': 'Subscribe to Newsletter',
    'blog.newsletterSubtitle': 'Get the latest articles and technical tips',
    'blog.subscribe': 'Subscribe Now',
    'blog.author': 'NNH Team',
    'blog.post1.title': 'Top 10 Mobile App Development Technologies in 2024',
    'blog.post1.excerpt': 'Discover the latest technologies and tools used in mobile app development that will help you create high-quality applications',
    'blog.post1.content': 'In the evolving world of technology, new technologies emerge every day for mobile app development. In this article, we will review the top 10 technologies...',
    'blog.readTime1': '8 minutes',
    'blog.post2.title': 'How to Increase Customer Engagement on Social Media',
    'blog.post2.excerpt': 'Practical and proven tips to increase engagement with your audience on various social media platforms',
    'blog.post2.content': 'Customer engagement on social media is the key to success in digital marketing. Here are the best strategies...',
    'blog.readTime2': '6 minutes',
    
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'Licensed company in Dubai for developing and managing social media applications',
    'about.description1': 'NNH FOR SOCIAL MEDIA APPLICATIONS DEVELOPMENT & MANAGEMENT is a licensed company specializing in social media application development and digital marketing. We hold a professional license from Dubai Department of Economy and Tourism for social media applications development and management.',
    'about.description2': 'We have been working in the technology field for over 5 years, specializing in creating innovative digital solutions that help companies and individuals achieve their goals in the digital world.',
    'about.description3': 'Our passion is transforming ideas into digital reality that meets user needs and achieves business objectives.',
    'about.contactInfo': 'Contact Information',
    'about.expertise': 'Areas of Expertise',
    'about.license': 'Professional License',
    'about.licenseNumber': 'License Number',
    'about.activity': 'Activity',
    'about.issuedBy': 'Issued By',
    'about.validUntil': 'Valid Until',
    'about.satisfiedClients': 'Satisfied Clients',
    'about.completedProjects': 'Completed Projects',
    'about.yearsExperience': 'Years of Experience',
    'about.countriesServed': 'Countries Served',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Do you have a project in mind? Or need a free consultation? Don\'t hesitate to contact us',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.freeConsultation': 'Free Consultation',
    'contact.sendMessage': 'Send Message',
    'contact.fullName': 'Full Name',
    'contact.phoneNumber': 'Phone Number',
    'contact.messageSubject': 'Message Subject',
    'contact.projectDetails': 'Project Details',
    'contact.sending': 'Sending...',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.company': 'NNH FOR SOCIAL MEDIA APPLICATIONS DEVELOPMENT & MANAGEMENT',
    'footer.licensed': 'Licensed by Dubai Department of Economy and Tourism',
    'footer.description': 'Specialized in social media applications development and management, and digital marketing. Licensed by Dubai Department of Economy and Tourism.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.like': 'Like',
    'common.comment': 'Comment',
    'common.follow': 'Follow',
    'common.unfollow': 'Unfollow',
    'common.nameRequired': 'Name must be at least 2 characters',
    'common.emailInvalid': 'Please enter a valid email address',
    'common.phoneRequired': 'Phone number must be at least 10 digits',
    'common.subjectRequired': 'Subject must be at least 5 characters',
    'common.messageRequired': 'Message must be at least 20 characters',
    'common.messageSent': 'Message sent successfully!',
    'common.weWillContactYou': 'We will contact you as soon as possible.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage or detect from browser
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Default to English
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Update document language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
