// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

  if (typeof gsap === 'undefined') {
    console.error('GSAP không được load. Vui lòng kiểm tra lại các script.');
    return;
  }

  if (gsap) {
    // Đăng ký ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);    // Chạy hero animation ngay lập tức
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .to("#hero-main-title", { opacity: 1, y: 0, duration: 1 })
      .to("#hero-sub-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to("#hero-dates", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .to("#animation-container", { opacity: 1, scale: 1, duration: 0.7 }, "-=0.4")
      .to("#hero .btn-primary", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

    // Animations
    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
      gsap.to(elem, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.utils.toArray('.gsap-reveal-left').forEach(elem => {
      gsap.to(elem, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.utils.toArray('.gsap-reveal-right').forEach(elem => {
      gsap.to(elem, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
  // Mobile Menu Toggle with enhanced animation
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinksMobile = document.querySelectorAll('.nav-link-mobile'); // Use class for mobile nav links

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      // Toggle menu visibility
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        // Use setTimeout to allow the browser to process the display change before adding animation class
        setTimeout(() => {
          mobileMenu.classList.add('show');
          menuButton.classList.add('active');
        }, 10);
      } else {
        mobileMenu.classList.remove('show');
        menuButton.classList.remove('active');
        // Wait for animation to complete before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
      }

      // Toggle ARIA attribute for accessibility
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
      menuButton.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.setAttribute('aria-hidden', isExpanded);
    });

    // Close menu when a nav link is clicked
    navLinksMobile.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('show');
        menuButton.classList.remove('active');

        // Wait for animation to complete before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);

        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate offset considering the fixed header height (approx 64px or 4rem for default h-16)
        // You might need to adjust this value based on your actual header height
        const headerOffset = document.querySelector('header')?.offsetHeight || 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });  // Xử lý sự kiện cuộn cho header
  const header = document.querySelector('header');
  const nav = document.querySelector('header nav');

  function updateHeaderOnScroll() {
    // Khi cuộn xuống quá 50px thì thay đổi header
    if (window.scrollY > 50) {
      header.classList.add('nav-scroll');
    } else {
      header.classList.remove('nav-scroll');
    }
  }

  // Gọi hàm ngay khi trang tải để xử lý trường hợp trang được tải giữa chừng
  updateHeaderOnScroll();

  // Thêm sự kiện scroll
  window.addEventListener('scroll', updateHeaderOnScroll);

  // GSAP Animations
  // Set default animation properties for reveal elements
  gsap.utils.toArray('.gsap-reveal').forEach(elem => {
    gsap.from(elem, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      immediateRender: false,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%', // Start animation when 85% of the element is visible
        toggleActions: 'play none none none', // Play animation once when it enters the viewport
      }
    });
  });

  gsap.utils.toArray('.gsap-reveal-left').forEach(elem => {
    gsap.from(elem, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      }
    });
  });

  gsap.utils.toArray('.gsap-reveal-right').forEach(elem => {
    gsap.from(elem, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elem,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });


  // Hero Section Specific Animations (if more complex than simple reveal)
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl.from("#hero-main-title", { opacity: 0, y: 50, duration: 1 }, "+=0.2")
    .from("#hero-sub-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.6")
    .from("#hero-dates", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
    .from("#countdown-container", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.4")
    .from("#hero .btn-primary", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

  // Timeline items - staggered animation for better effect
  const timelineItems = gsap.utils.toArray('.timeline-item');
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: (index % 2 === 0) ? -50 : 50, // Alternate sides
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });

  // Gallery items - staggered animation
  const galleryItems = gsap.utils.toArray('.gallery-item');
  galleryItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      delay: index * 0.1 // Stagger the start of each animation
    });
  });

  // Parallax effect for hero background image
  // Ensure the image is directly inside the #hero section or adjust selector
  const heroBgImage = document.querySelector('#hero > div:first-child img');
  if (heroBgImage) {
    gsap.to(heroBgImage, {
      yPercent: 30, // Move image down by 30% of its height as user scrolls
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true // Smoothly animates with scroll
      }
    });
  }

  // Lightbox Initialization (placeholder - assuming lightbox.js handles its own init)
  // If lightbox.js needs manual initialization, add it here.
  // Example: if (typeof initLightbox === 'function') { initLightbox(); }

  console.log("Main.js loaded and initialized.");
});