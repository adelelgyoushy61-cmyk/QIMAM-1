// نظام انيميشن متقدم مع تأثيرات GSAP-like
const advancedScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animateType = el.dataset.animate || 'fadeUp';
            const delay = parseInt(el.dataset.delay) || 0;
            const duration = parseInt(el.dataset.duration) || 800;

            setTimeout(() => {
                el.classList.add('animated');

                // تطبيق تأثيرات متقدمة
                applyAdvancedAnimation(el, animateType, duration);

            }, delay);

            advancedScrollObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
});

// دالة لتطبيق الأنيميشن المتقدم
function applyAdvancedAnimation(element, type, duration) {
    const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    switch (type) {
        case 'fadeUp':
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'fadeLeft':
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) rotate(0)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'fadeRight':
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) rotate(0)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'zoomIn':
            element.style.opacity = '1';
            element.style.transform = 'scale(1) rotate(0)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'flipX':
            element.style.opacity = '1';
            element.style.transform = 'perspective(1000px) rotateX(0)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'flipY':
            element.style.opacity = '1';
            element.style.transform = 'perspective(1000px) rotateY(0)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'slideUp':
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = `all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
            break;

        case 'bounceIn':
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            element.style.animation = `bounceIn ${duration}ms forwards`;
            break;

        case 'stagger':
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        case 'typewriter':
            typewriterEffect(element, duration);
            break;

        case 'parallax':
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = `all ${duration}ms ${easing}`;
            break;

        default:
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
    }
}


// إعداد العناصر الأولي
document.addEventListener('DOMContentLoaded', () => {
    // إعداد جميع العناصر المتحركة
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const type = el.dataset.animate || 'fadeUp';
        const duration = parseInt(el.dataset.duration) || 800;

        // إعداد الحالة الأولية حسب نوع الأنيميشن
        setupInitialState(el, type, duration);

        advancedScrollObserver.observe(el);
    });

    // إضافة أنيميشنز مخصصة لCSS
    addCustomAnimations();
});

// إعداد الحالة الأولية للعناصر
function setupInitialState(element, type, duration) {
    const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    element.style.opacity = '0';
    element.style.transition = `all ${duration}ms ${easing}`;

    switch (type) {
        case 'fadeUp':
            element.style.transform = 'translateY(60px) scale(0.95)';
            break;
        case 'fadeLeft':
            element.style.transform = 'translateX(-80px) rotate(-5deg)';
            break;
        case 'fadeRight':
            element.style.transform = 'translateX(80px) rotate(5deg)';
            break;
        case 'zoomIn':
            element.style.transform = 'scale(0.7) rotate(-10deg)';
            break;
        case 'flipX':
            element.style.transform = 'perspective(1000px) rotateX(90deg)';
            break;
        case 'flipY':
            element.style.transform = 'perspective(1000px) rotateY(90deg)';
            break;
        case 'slideUp':
            element.style.transform = 'translateY(100px)';
            break;
        case 'bounceIn':
            element.style.transform = 'scale(0.3)';
            break;
        case 'stagger':
            element.style.transform = 'translateY(40px) scale(0.9)';
            break;
        case 'parallax':
            element.style.transform = 'translateY(80px)';
            break;
        default:
            element.style.transform = 'translateY(50px)';
    }
}



// نظام Stagger للأطفال العناصر
function staggerAnimation(container, childSelector, animationType, delay = 100) {
    const children = container.querySelectorAll(childSelector);
    children.forEach((child, index) => {
        child.style.setProperty('--stagger-delay', `${index * delay}ms`);
        child.dataset.animate = animationType;
        child.dataset.delay = index * delay;
        child.classList.add('animate-on-scroll');
        setupInitialState(child, animationType, 600);
        advancedScrollObserver.observe(child);
    });
}

// التهيئة للمشاريع الخاصة
document.addEventListener('DOMContentLoaded', () => {
    // تطبيق stagger animation على العناصر الجماعية
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    staggerContainers.forEach(container => {
        const config = container.dataset.stagger.split(',');
        staggerAnimation(container, config[0], config[1], parseInt(config[2]) || 100);
    });
});

// إعداد العناصر
document.addEventListener('DOMContentLoaded', () => {
    // انيميشن السكرول العام
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const type = el.dataset.animate || 'fadeInUp';
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s ease';
        el.style.transform = type === 'fadeInLeft' ? 'translateX(-30px)' :
            type === 'fadeInRight' ? 'translateX(30px)' : 'translateY(30px)';
        scrollObserver.observe(el);
    });
});

// زر العودة للأعلى
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 300));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// كود العداد التفاعلي
function startCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 500;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// تشغيل العداد عند الظهور على الشاشة
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

// مراقبة قسم العدادات
document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.querySelector('.card');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
});

// نظام انيميشن الخدمات عند النزول
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;

            // العناوين
            const title = section.querySelector('.services-title');
            const subtitle = section.querySelector('.services-subtitle');

            // تأثير العناوين
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(-40px)';
                title.style.transition = 'all 0.8s ease';
                setTimeout(() => {
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, 200);
            }

            if (subtitle) {
                subtitle.style.opacity = '0';
                subtitle.style.transform = 'translateY(-30px)';
                subtitle.style.transition = 'all 0.8s ease';
                setTimeout(() => {
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                }, 400);
            }

            // الكروت - ترتيب ظهور متدرج
            const cards = section.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                // تحديد اتجاه الظهور بناء على الموضع
                let animationType = 'fadeUp';
                if (index % 3 === 0) animationType = 'fadeLeft';
                else if (index % 3 === 2) animationType = 'fadeRight';

                // إعداد الحالة الأولية
                card.style.opacity = '0';
                card.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                if (animationType === 'fadeLeft') {
                    card.style.transform = 'translateX(-60px) scale(0.9)';
                } else if (animationType === 'fadeRight') {
                    card.style.transform = 'translateX(60px) scale(0.9)';
                } else {
                    card.style.transform = 'translateY(50px) scale(0.9)';
                }

                // الظهور بالتأخير
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translate(0) scale(1)';

                    // تأثير إضافي على الصور
                    const img = card.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            img.style.transform = 'scale(1)';
                        }, 600);
                    }

                }, 500 + (index * 120)); // تأخير متدرج
            });

            servicesObserver.unobserve(section);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// تطبيق المراقبة على قسم الخدمات
document.addEventListener('DOMContentLoaded', function () {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }
});

// إضافة تأثيرات Hover للكروت
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';

            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }

            const btn = this.querySelector('.btn');
            if (btn) {
                btn.style.transform = 'translateX(-5px)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';

            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }

            const btn = this.querySelector('.btn');
            if (btn) {
                btn.style.transform = 'translateX(0)';
            }
        });
    });
});

// إضافة أنماط CSS ديناميكية للتحكم في الظلال
const servicesStyle = document.createElement('style');
servicesStyle.textContent = `
    .service-card {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        backface-visibility: hidden;
    }
    
    .service-card img {
        transition: transform 0.6s ease !important;
    }
    
    .service-card .btn {
        transition: transform 0.3s ease !important;
    }
    
    .service-card:hover {
        z-index: 10;
    }
`;
document.head.appendChild(servicesStyle);

// دالة للكشف عن ظهور العناصر في الشاشة
function animateOnScroll() {
    const elements = document.querySelectorAll(
        '.section-title, .lead-text, .feature-list li, .trailer-img, ' +
        '.stat-card, .stat-icon, .stat-number, .stat-label, .stat-progress'
    );

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });

    // تحديث شريط التقدم
    updateProgressBar();
}

// دالة لتحديث شريط التقدم
function updateProgressBar() {
    const section = document.querySelector('.logistics-section');
    const progressBar = document.getElementById('sectionProgress');

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // حساب النسبة المئوية للقسم المرئي
    let progress = 0;

    if (scrollPosition > sectionTop - windowHeight) {
        const scrolled = scrollPosition - (sectionTop - windowHeight);
        progress = (scrolled / (sectionHeight + windowHeight)) * 100;
        progress = Math.min(100, Math.max(0, progress));
    }

    progressBar.style.height = progress + '%';
}

// إضافة تأثيرات للقوائم بشكل متسلسل
document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('.feature-list li');
    listItems.forEach((item, index) => {
        item.style.transitionDelay = (index * 0.1) + 's';
    });

    // إضافة توقيتات متسلسلة لبطاقات الإحصائيات
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.2) + 's';
    });
});

// تشغيل الدوال عند التمرير وعند تحميل الصفحة
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
window.addEventListener('load', updateProgressBar);



