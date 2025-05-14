// Animations.js - Hiệu ứng GSAP cho trang web kỷ niệm 50 năm
document.addEventListener('DOMContentLoaded', function () {
    const animationContainer = document.getElementById('animation-container');
    // Early exit if the container is not found
    if (!animationContainer) {
        console.warn("Animation container not found.");
        return;
    }

    // Lấy ngày hiện tại để hiển thị
    const currentDate = new Date();
    const anniversary = new Date(2025, 3, 30); // 30 tháng 4 năm 2025
    const isAfterAnniversary = currentDate > anniversary;

    // Thiết lập animation container với nội dung ban đầu
    animationContainer.innerHTML = `
        <div class="relative w-full overflow-hidden flex flex-col items-center justify-center">
            <!-- Text elements -->
            <div id="vietnam-flag-animation" class="w-full h-32 md:h-48 mb-4 relative"></div>
            <h3 class="text-2xl font-bold mb-4 text-vietnam-yellow animation-title">
                ${isAfterAnniversary ? 'KỶ NIỆM 50 NĂM GIẢI PHÓNG MIỀN NAM' : 'HƯỚNG TỚI KỶ NIỆM 50 NĂM GIẢI PHÓNG MIỀN NAM'}
            </h3>
            <div id="animation-text" class="text-white text-xl md:text-2xl font-bold mb-4 opacity-0">THỐNG NHẤT ĐẤT NƯỚC</div>
            <div id="animation-date" class="text-white text-lg md:text-xl font-bold opacity-0">(30/04/1975 - 30/04/2025)</div>
            <div id="animation-quote" class="text-white text-lg italic mt-4 max-w-lg text-center mx-auto opacity-0 px-4">
                "Không có gì quý hơn độc lập tự do"
            </div>
        </div>
    `;

    // Create Vietnam flag animation using GSAP
    const flagContainer = document.getElementById('vietnam-flag-animation');

    // Create red background first
    const redBackground = document.createElement('div');
    redBackground.className = 'absolute inset-0 bg-vietnam-red transform scale-0';
    flagContainer.appendChild(redBackground);    // Create yellow star with improved SVG
    const yellowStar = document.createElement('div');
    yellowStar.className = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
    yellowStar.innerHTML = `<svg width="80" height="80" viewBox="0 0 300 300" fill="none">
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood flood-color="#FFFF00" flood-opacity="0.5" result="coloredBlur" />
                <feComposite in="coloredBlur" in2="blur" operator="in" result="blurEffect" />
                <feComposite in="SourceGraphic" in2="blurEffect" operator="over" />
            </filter>
        </defs>
        <path d="M150,25 L179,111 L269,111 L196,165 L226,251 L150,194 L74,251 L104,165 L31,111 L121,111 Z" 
              fill="#FFFF00" opacity="0" filter="url(#glow)" />
    </svg>`;
    flagContainer.appendChild(yellowStar);// Animation sequence
    const mainTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    // Animate hero background first
    gsap.to('.hero-background', {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut"
    });

    gsap.to('.bg-pattern', {
        opacity: 0.2,
        duration: 2.5,
        ease: "power1.inOut"
    });

    // Animate NLF flag (cờ Mặt trận dân tộc giải phóng)
    gsap.timeline()
        .to('.nlf-flag-stripes', {
            opacity: 1,
            scale: 1,
            duration: 3,
            ease: "power1.inOut"
        })
        .to('.nlf-flag-stripes', {
            opacity: 0.3,
            duration: 2.5,
            ease: "power1.inOut"
        });
    // Flag animation
    mainTimeline
        .to(redBackground, { scale: 1, duration: 1.2, ease: "power2.out" })
        .to(yellowStar.querySelector('path'), { opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.5")
        .to("#animation-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .to("#animation-date", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to("#animation-quote", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            onComplete: () => {
                // Animate the words of the quote with a staggered effect
                const quoteElement = document.getElementById('animation-quote');
                if (quoteElement) {
                    const text = quoteElement.innerHTML;
                    const words = text.replace(/"/g, '').trim().split(' ');

                    let wrappedWords = words.map(word =>
                        `<span class="quote-word inline-block">${word}</span>`
                    ).join(' ');

                    quoteElement.innerHTML = `"${wrappedWords}"`;

                    gsap.from('.quote-word', {
                        y: 10,
                        opacity: 0.5,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "back.out(1.7)"
                    });
                }
            }
        }, "-=0.3");// Create particles/confetti effect for a celebratory feel
    function createParticles() {
        const particleCount = 150;
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

    // Trigger the particles
    createParticles();
    // Optional: Add pulsating effect to the star
    gsap.timeline({ repeat: -1, yoyo: true })
        .to(yellowStar.querySelector('path'), {
            scale: 1.1,
            duration: 1.5,
            transformOrigin: 'center center',
            ease: "sine.inOut"
        });
    // Add subtle movement to the background elements
    gsap.timeline({ repeat: -1, yoyo: true })
        .to('.hero-background', {
            backgroundPosition: '100% 100%',
            duration: 20,
            ease: "none"
        });

    // Add light rays animation
    gsap.to('.light-rays', {
        opacity: 0.4,
        duration: 3,
        delay: 1.5,
        ease: "power2.inOut"
    });
    // Create floating effect for the titles
    gsap.timeline({ repeat: -1, yoyo: true })
        .to('#hero-main-title, #hero-sub-title', {
            y: '-8px',
            duration: 3,
            ease: "sine.inOut",
            stagger: 0.2
        });

    // Add hover effect for the button
    const exploreButton = document.querySelector('#hero .btn-primary');
    if (exploreButton) {
        exploreButton.addEventListener('mouseover', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                backgroundColor: '#ffdd20',
                ease: "power2.out"
            });
        });

        exploreButton.addEventListener('mouseout', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                backgroundColor: '',
                ease: "power2.out"
            });
        });

        // Add attention animation to the button after a delay
        gsap.timeline({ repeat: 2, repeatDelay: 1.5 })
            .to(exploreButton, {
                scale: 1.1,
                duration: 0.5,
                delay: 5,
                ease: "elastic.out(1, 0.5)"
            })
            .to(exploreButton, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
    }
});
