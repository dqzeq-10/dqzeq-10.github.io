// animations-new.js - Hiệu ứng GSAP mới lấy cảm hứng từ trang chủ GSAP
document.addEventListener('DOMContentLoaded', function () {
    if (typeof gsap === 'undefined') {
        console.error('GSAP không được load. Vui lòng kiểm tra lại các script.');
        return;
    }

    // Đăng ký ScrollTrigger plugin nếu có
    if (gsap.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Lấy ngày hiện tại để hiển thị
    const currentDate = new Date();
    const anniversary = new Date(2025, 3, 30); // 30 tháng 4 năm 2025
    const isAfterAnniversary = currentDate > anniversary;

    // === Hero Section Animations ===
    function initHeroAnimations() {
        // Custom Split Text functionality
        function splitText(element) {
            if (!element) return;

            const text = element.textContent;
            const chars = text.split('');

            const charSpans = chars.map(char => {
                const span = document.createElement('span');
                span.className = 'char opacity-0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(20px)';
                span.textContent = char === ' ' ? '\u00A0' : char;
                return span;
            });

            element.innerHTML = '';
            charSpans.forEach(span => element.appendChild(span));

            return element.querySelectorAll('.char');
        }

        // Split text for animations
        const heroTitleElement = document.querySelector('#hero-main-title .chars-container');
        const heroSubtitle1Element = document.querySelector('.hero-subtitle:nth-of-type(1) .chars-container');
        const heroSubtitle2Element = document.querySelector('.hero-subtitle:nth-of-type(2) .chars-container');

        let heroTitleSpans, heroSubtitle1Spans, heroSubtitle2Spans;

        if (heroTitleElement) heroTitleSpans = splitText(heroTitleElement);
        if (heroSubtitle1Element) heroSubtitle1Spans = splitText(heroSubtitle1Element);
        if (heroSubtitle2Element) heroSubtitle2Spans = splitText(heroSubtitle2Element);

        // Setup flag container
        const flagContainer = document.querySelector('.flag-container');
        if (flagContainer) {
            flagContainer.innerHTML = `
        <div class="relative w-full h-full bg-vietnam-red flex items-center justify-center">
          <div class="star-container w-1/5 h-2/5 relative">
            <svg viewBox="0 0 300 300" class="w-full h-full">
              <defs>
                <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feFlood flood-color="#ffcc00" flood-opacity="0.7" result="glow-color" />
                  <feComposite in="glow-color" in2="blur" operator="in" result="glow-blur" />
                  <feComposite in="SourceGraphic" in2="glow-blur" operator="over" />
                </filter>
              </defs>
              <path class="flag-star" d="M150,25 L179,111 L269,111 L196,165 L226,251 L150,194 L74,251 L104,165 L31,111 L121,111 Z" 
                    fill="#ffcc00" opacity="0" filter="url(#star-glow)" />
            </svg>
          </div>
        </div>
      `;
        }

        // Hero Timeline
        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Background animation
        heroTimeline
            .from('.hero-bg', {
                opacity: 0,
                duration: 1.5,
            })
            .from('.hero-grid', {
                opacity: 0,
                scale: 1.1,
                duration: 1.2,
            }, "-=1")
            .from('.hero-stars', {
                opacity: 0,
                scale: 1.2,
                duration: 1,
            }, "-=0.8")
            .from('.hero-historical-dots', {
                opacity: 0,
                duration: 1,
            }, "-=0.8");

        // Title animations with staggered characters
        if (heroTitleSpans) {
            heroTimeline.to(heroTitleSpans, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.03,
            }, "-=0.7");
        }

        if (heroSubtitle1Spans) {
            heroTimeline.to(heroSubtitle1Spans, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.02,
            }, "-=0.4");
        }

        if (heroSubtitle2Spans) {
            heroTimeline.to(heroSubtitle2Spans, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.02,
            }, "-=0.3");
        }

        // Date animation
        heroTimeline
            .to('.anniversary-date', {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, "-=0.2")
            .from('.date-box', {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
            }, "-=0.6");

        // Animation container reveal with 3D effect
        heroTimeline
            .to('#animation-container', {
                opacity: 1,
                scale: 1,
                duration: 0.8,
            }, "-=0.3");

        // Flag star animation
        if (flagContainer) {
            heroTimeline.to('.flag-star', {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "elastic.out(1, 0.7)"
            }, "-=0.5");

            // Add subtle wave effect to the flag
            gsap.to('.flag-container', {
                skewX: 0.5,
                skewY: 0.3,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Glow effect on the star
            gsap.to('.flag-star', {
                filter: 'drop-shadow(0 0 8px rgba(255, 204, 0, 0.8))',
                duration: 2,
                repeat: -1,
                yoyo: true
            });
        }

        // Button and scroll indicator
        heroTimeline
            .to('.explore-btn', {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, "-=0.7")
            .to('.scroll-indicator', {
                opacity: 1,
                y: 0,
                duration: 0.6,
            }, "-=0.4");

        // Flying elements animations
        animateFlyingElements();
    }

    // Animate flying elements
    function animateFlyingElements() {
        // Star 1 animation
        gsap.to('.star-1', {
            x: '50px',
            y: '30px',
            rotation: 180,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Star 2 animation
        gsap.to('.star-2', {
            x: '-40px',
            y: '-20px',
            rotation: -160,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Circle animations
        gsap.to('.circle-1', {
            scale: 1.2,
            opacity: 0.7,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to('.circle-2', {
            scale: 0.8,
            opacity: 0.5,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Light beam animation
        gsap.to('.light-beam', {
            x: '100px',
            y: '50px',
            rotation: '65deg',
            opacity: 0.2,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Flag ribbon animation
        gsap.to('.flag-ribbon', {
            rotation: '-5deg',
            y: '-20px',
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Animate scroll indicator with continuous pulse
    function animateScrollIndicator() {
        gsap.to('.chevron-container', {
            scale: 1.1,
            opacity: 1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to('.fa-chevron-down', {
            y: 3,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Create particles/confetti effect for a celebratory feel
    function createParticles() {
        const particleCount = 150;
        const animationContainer = document.getElementById('animation-container');
        if (!animationContainer) return;

        // Sử dụng màu sắc của cả hai lá cờ: Việt Nam và Mặt trận dân tộc giải phóng
        const colors = [
            // Cờ Việt Nam
            '#d80000', // Đỏ
            '#ffff00', // Vàng
            // Cờ Mặt trận
            '#c60000', // Đỏ
            '#005eb4', // Xanh
            '#ffcc00', // Vàng
            // Thêm các màu ánh sáng
            '#ffffff'
        ];

        for (let i = 0; i < particleCount; i++) {
            // Quyết định xem hình dạng là tròn hay hình ngôi sao
            const isCircle = Math.random() > 0.2; // 80% là điểm tròn, 20% là sao

            const particle = document.createElement('div');

            if (isCircle) {
                particle.className = 'absolute rounded-full';
                particle.style.width = `${Math.random() * 8 + 3}px`;
                particle.style.height = particle.style.width;
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            } else {
                particle.className = 'absolute star-particle';
                particle.innerHTML = `<svg width="12" height="12" viewBox="0 0 300 300">
            <path d="M150,25 L179,111 L269,111 L196,165 L226,251 L150,194 L74,251 L104,165 L31,111 L121,111 Z" 
                  fill="${colors[Math.floor(Math.random() * 3)]}" />
        </svg>`;
            }

            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.opacity = '0';
            animationContainer.appendChild(particle);

            // Animate each particle
            gsap.timeline()
                .to(particle, {
                    opacity: 1,
                    duration: 0.3,
                    delay: 2 + Math.random() * 0.8
                })
                .to(particle, {
                    y: -100 - Math.random() * 200,
                    x: (Math.random() - 0.5) * 250,
                    rotation: Math.random() * 360,
                    opacity: 0,
                    duration: 2.5 + Math.random() * 3,
                    ease: "power1.out"
                });
        }
    }

    // Initialize all animations
    initHeroAnimations();
    animateScrollIndicator();

    // Trigger particle effects after a short delay
    setTimeout(createParticles, 2000);

    // Add hover animation for the explore button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('mouseenter', function () {
            gsap.to(this.querySelector('span:first-child'), {
                color: '#000',
                duration: 0.4
            });

            gsap.to(this.querySelector('.btn-bg'), {
                y: '0%',
                duration: 0.4
            });
        });

        exploreBtn.addEventListener('mouseleave', function () {
            gsap.to(this.querySelector('span:first-child'), {
                color: '#ae0000',
                duration: 0.4
            });

            gsap.to(this.querySelector('.btn-bg'), {
                y: '100%',
                duration: 0.4
            });
        });
    }

    // Scroll-triggered animations for the rest of the page
    if (gsap.ScrollTrigger) {
        gsap.utils.toArray('.gsap-reveal').forEach(elem => {
            gsap.from(elem, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        gsap.utils.toArray('.gsap-reveal-left').forEach(elem => {
            gsap.from(elem, {
                x: -30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });

        gsap.utils.toArray('.gsap-reveal-right').forEach(elem => {
            gsap.from(elem, {
                x: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
});
