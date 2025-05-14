// Lightbox functionality
class Lightbox {
    constructor() {
        this.init();
    }

    init() {
        // Create lightbox container
        this.lightboxContainer = document.createElement('div');
        this.lightboxContainer.id = 'lightbox';
        this.lightboxContainer.classList.add(
            'fixed', 'inset-0', 'z-50', 'bg-black', 'bg-opacity-90',
            'hidden', 'items-center', 'justify-center', 'flex-col'
        );

        // Create image container
        this.imageContainer = document.createElement('div');
        this.imageContainer.classList.add('relative', 'max-w-4xl', 'mx-auto', 'p-4');

        // Create image element
        this.image = document.createElement('img');
        this.image.classList.add('max-h-[80vh]', 'max-w-full', 'object-contain');

        // Create caption
        this.caption = document.createElement('div');
        this.caption.classList.add(
            'text-white', 'text-center', 'p-4', 'text-xl'
        );

        // Create close button
        this.closeBtn = document.createElement('button');
        this.closeBtn.innerHTML = '&times;';
        this.closeBtn.classList.add(
            'absolute', 'top-4', 'right-4', 'text-white', 'text-4xl',
            'hover:text-vietnam-yellow', 'transition-colors', 'z-10'
        );
        this.closeBtn.setAttribute('aria-label', 'Close');

        // Create navigation buttons
        this.prevBtn = document.createElement('button');
        this.prevBtn.innerHTML = '&#10094;';
        this.prevBtn.classList.add(
            'absolute', 'left-4', 'top-1/2', '-translate-y-1/2', 'text-white', 'text-4xl',
            'hover:text-vietnam-yellow', 'transition-colors', 'z-10'
        );
        this.prevBtn.setAttribute('aria-label', 'Previous');

        this.nextBtn = document.createElement('button');
        this.nextBtn.innerHTML = '&#10095;';
        this.nextBtn.classList.add(
            'absolute', 'right-4', 'top-1/2', '-translate-y-1/2', 'text-white', 'text-4xl',
            'hover:text-vietnam-yellow', 'transition-colors', 'z-10'
        );
        this.nextBtn.setAttribute('aria-label', 'Next');

        // Assemble the lightbox
        this.imageContainer.appendChild(this.image);
        this.imageContainer.appendChild(this.closeBtn);
        this.imageContainer.appendChild(this.prevBtn);
        this.imageContainer.appendChild(this.nextBtn);
        this.lightboxContainer.appendChild(this.imageContainer);
        this.lightboxContainer.appendChild(this.caption);

        // Add to DOM
        document.body.appendChild(this.lightboxContainer);

        // Bind events
        this.bindEvents();
    }

    bindEvents() {
        // Setup gallery items to open lightbox
        document.querySelectorAll('.gallery-item img').forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });

        // Close button
        this.closeBtn.addEventListener('click', () => {
            this.closeLightbox();
        });

        // Navigation
        this.prevBtn.addEventListener('click', () => {
            this.navigate(-1);
        });

        this.nextBtn.addEventListener('click', () => {
            this.navigate(1);
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.navigate(-1);
            } else if (e.key === 'ArrowRight') {
                this.navigate(1);
            }
        });

        // Close on outside click
        this.lightboxContainer.addEventListener('click', (e) => {
            if (e.target === this.lightboxContainer) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(index) {
        // Get all gallery images
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
        this.currentIndex = index;

        // Set image and caption
        this.updateImage();

        // Show lightbox with animation
        this.lightboxContainer.classList.remove('hidden');
        this.lightboxContainer.classList.add('flex');

        // Animate with GSAP
        gsap.fromTo(this.lightboxContainer,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
        );

        gsap.fromTo(this.imageContainer,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Disable page scrolling
        document.body.style.overflow = 'hidden';
    }

    updateImage() {
        const item = this.galleryItems[this.currentIndex];
        const caption = item.closest('.gallery-item').querySelector('.p-4 h3').textContent;

        // Update image source
        this.image.src = item.src;
        this.image.alt = item.alt;

        // Update caption
        this.caption.textContent = caption;

        // Update navigation visibility
        this.prevBtn.style.visibility = this.currentIndex > 0 ? 'visible' : 'hidden';
        this.nextBtn.style.visibility = this.currentIndex < this.galleryItems.length - 1 ? 'visible' : 'hidden';
    }

    navigate(direction) {
        this.currentIndex += direction;

        // Ensure index is within bounds
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
            return;
        } else if (this.currentIndex >= this.galleryItems.length) {
            this.currentIndex = this.galleryItems.length - 1;
            return;
        }

        // Animate image change
        gsap.to(this.image, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                this.updateImage();
                gsap.to(this.image, { opacity: 1, duration: 0.2 });
            }
        });
    }

    closeLightbox() {
        // Animate closing
        gsap.to(this.lightboxContainer, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.lightboxContainer.classList.add('hidden');
                this.lightboxContainer.classList.remove('flex');
                this.lightboxContainer.style.opacity = 1;
            }
        });

        // Re-enable page scrolling
        document.body.style.overflow = '';
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});
