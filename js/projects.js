// نظام انيميشن موحد للفوتر والعناصر
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.6s ease';
            }, delay);
            
            scrollObserver.unobserve(el);
        }
    });
}, { threshold: 0.1 });

// إعداد العناصر عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    // العناصر التي تظهر عند السكرول
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        scrollObserver.observe(el);
    });
    
    // التأخيرات المخصصة
    document.querySelectorAll('.delay-100').forEach(el => {
        el.dataset.delay = '100';
    });
    document.querySelectorAll('.delay-200').forEach(el => {
        el.dataset.delay = '200';
    });
    document.querySelectorAll('.delay-300').forEach(el => {
        el.dataset.delay = '300';
    });
});
       
       // إنشاء الجسيمات المتحركة
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // خصائص عشوائية
                const size = Math.random() * 20 + 5;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 3 + 3;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                
                container.appendChild(particle);
            }
        }

        // فلتر المشاريع
        function initProjectFilter() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // إزالة النشط من جميع الأزرار
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // إضافة النشط للزر المختار
                    this.classList.add('active');
                    
                    const filter = this.dataset.filter;
                    
                    projectCards.forEach(card => {
                        const category = card.parentElement.dataset.category;
                        
                        if (filter === 'all' || category === filter) {
                            card.parentElement.style.display = 'block';
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 100);
                        } else {
                            card.classList.remove('visible');
                            setTimeout(() => {
                                card.parentElement.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }

        // عداد الإحصائيات
        function initCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
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

        // تأثير الظهور عند السكرول
        function initScrollReveal() {
            const revealElements = document.querySelectorAll('.text-reveal, .stat-item');
            
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        
                        setTimeout(() => {
                            entry.target.classList.add('revealed', 'visible');
                        }, delay);
                        
                        if (entry.target.classList.contains('stat-item')) {
                            initCounters();
                        }
                        
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            revealElements.forEach(el => {
                revealObserver.observe(el);
            });
        }

        // زر العودة للأعلى
        function initBackToTop() {
            const backToTop = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // التهيئة عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            initProjectFilter();
            initScrollReveal();
            initBackToTop();
            
            // جعل جميع الكروت مرئية بعد التحميل
            setTimeout(() => {
                document.querySelectorAll('.project-card').forEach(card => {
                    card.classList.add('visible');
                });
            }, 500);
            
            console.log('🚀 صفحة المشاريع جاهزة بتأثيرات متقدمة!');
        });
    
        // نظام العدادات المتقدمة
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    function startCounters() {
        if (started) return;
        started = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // مدة العد بالمللي ثانية
            const step = target / (duration / 16); // خطوة كل إطار
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    // إضافة تأثير بعد الانتهاء
                    counter.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        counter.style.transform = 'scale(1)';
                    }, 300);
                }
            };

            // بدء العد بعد تأخير حسب data-delay
            const delay = parseInt(counter.parentElement.getAttribute('data-delay')) || 0;
            setTimeout(updateCounter, delay);
        });
    }

    // مراقبة ظهور القسم
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }
}

// نسخة بديلة مع تأثيرات أكثر تقدمًا
function initAdvancedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animationStarted = false;

    function animateCounter(counter, target, duration = 2000) {
        let start = null;
        const startValue = 0;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // تأثير easeOutCubic
            const easeOut = 1 - Math.pow(1 - percentage, 3);
            const value = Math.floor(startValue + (target - startValue) * easeOut);
            
            counter.textContent = value.toLocaleString();
            
            if (percentage < 1) {
                requestAnimationFrame(step);
            } else {
                counter.textContent = target.toLocaleString();
                // تأثير النبض عند الانتهاء
                counter.parentElement.classList.add('counter-completed');
            }
        }
        
        requestAnimationFrame(step);
    }

    function startAllCounters() {
        if (animationStarted) return;
        animationStarted = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const delay = parseInt(counter.parentElement.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                animateCounter(counter, target);
            }, delay);
        });
    }

    // مراقبة الظهور مع options محسنة
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAllCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// نسخة بسيطة وسريعة
function initSimpleCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    function startCounting() {
        if (started) return;
        started = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 50; // كلما قل الرقم زادت السرعة
            const increment = target / speed;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    // بدء العد عند التمرير
    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                startCounting();
            }
        }
    });
}

// نظام هجين مع خيارات متعددة
class CounterManager {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animationStarted = false;
        this.options = {
            duration: 2000,
            ease: 'easeOutCubic',
            useCommas: true
        };
    }

    easeFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeOutCubic: t => (--t) * t * t + 1
    };

    animateCounter(counter, target) {
        const startTime = performance.now();
        const startValue = 0;
        const duration = this.options.duration;
        const ease = this.easeFunctions[this.options.ease];

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = ease(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

            counter.textContent = this.options.useCommas ? 
                currentValue.toLocaleString() : currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = this.options.useCommas ? 
                    target.toLocaleString() : target;
                this.onCounterComplete(counter);
            }
        };

        requestAnimationFrame(update);
    }

    onCounterComplete(counter) {
        // تأثيرات عند اكتمال العد
        counter.style.color = '#ffd700';
        counter.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
        
        setTimeout(() => {
            counter.style.color = '';
            counter.style.textShadow = '';
        }, 1000);
    }

    start() {
        if (this.animationStarted) return;
        this.animationStarted = true;

        this.counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const delay = parseInt(counter.parentElement.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                this.animateCounter(counter, target);
            }, delay);
        });
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.4,
            rootMargin: '0px 0px -50px 0px'
        });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
}

// إضافة CSS للتحسينات
const counterStyles = `
    .stat-number {
        transition: all 0.3s ease;
        display: inline-block;
    }
    
    .counter-completed {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .stats-section {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
`;

// إضافة الـ styles للصفحة
const style = document.createElement('style');
style.textContent = counterStyles;
document.head.appendChild(style);

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // اختر أي طريقة تفضل:
    
    // الطريقة البسيطة:
    // initSimpleCounters();
    
    // الطريقة المتقدمة:
    // initAdvancedCounters();
    
    // الطريقة الاحترافية (مفضلة):
    const counterManager = new CounterManager();
    counterManager.init();
    
    // أو الطريقة الأساسية:
    // initCounters();
});

// إذا كنت تريد تشغيل العداد يدويًا يمكنك استخدام:
window.startCountersManually = function() {
    const counterManager = new CounterManager();
    counterManager.start();
};

window.addEventListener("load", () => {
  document.querySelector(".projects-hero").classList.add("loaded");
});



